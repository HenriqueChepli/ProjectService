<template>
    <div class="movie-page" v-if="item">
      <div class="background">
        <div class="overlay"></div>
        <img class="background-image" :src="imageBaseUrl + item.backdrop_path" alt="Background do filme" v-if="item.backdrop_path"/>
      </div>
      <div class="content">
        <div class="movie-details">
          <img class="poster" :src="imageBaseUrl + item.poster_path" alt="Poster do filme" v-if="item.poster_path"/>
          <div class="info">
            <h1 class="title">{{ item.title || item.name }}</h1>
            <div class="actions">
              <button class="btn play"><span>▶</span> Assistir</button>
              <a v-if="trailerUrl" :href="trailerUrl" target="_blank" rel="noopener noreferrer" class="btn trailer">Trailer</a>
              <button class="btn add">+</button>
            </div>
            <p class="metadata">
              <span>{{ releaseDate }}</span>
              <span>{{ duration }}</span>
              <span>{{ genres }}</span>
            </p>
            <p class="description">{{ item.overview }}</p>
            <div class="cast">
              <h2>Elenco</h2>
              <div class="actors">
              <div class="actor" v-for="actor in cast" :key="actor.id" @click="goToActor(actorId)">
              <img :src="actor.profile_path ? imageBaseUrl + actor.profile_path : 'placeholder.jpg'" :alt="actor.name" />
              <p>{{ actor.name }}</p>
            </div>
            </div>
  </div>
  
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Carregando informações...</p>
    </div>
  </template>
  
  
  <script setup>
  import { onMounted, ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import api from '../plugins/axios';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  function goToActor(actorId) {
    console.log('ID do ator passado:', actorId);  // Adicione isso
    router.push({ name: 'ActorPage', params: { id: actorId } });
  }
  
  
  const route = useRoute();
  const { id } = route.params;
  const type = route.meta.type || route.params.type; // 'movie' ou 'tv'
  
  const item = ref(null);
  const trailerUrl = ref(null);
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  
  const releaseDate = computed(() => {
    if (item.value) {
      return new Date(item.value.release_date || item.value.first_air_date).toLocaleDateString('pt-BR');
    }
    return 'Data indisponível';
  });
  
  const duration = computed(() => {
    if (item.value) {
      const runtime = item.value.runtime || item.value.episode_run_time?.[0];
      return runtime ? `${Math.floor(runtime / 60)}h ${runtime % 60}min` : 'Duração indisponível';
    }
    return 'Duração indisponível';
  });
  
  const genres = computed(() => {
    if (item.value && item.value.genres) {
      return item.value.genres.map(genre => genre.name).join(', ');
    }
    return 'Gêneros indisponíveis';
  });
  
  const cast = ref([]); // Para armazenar o elenco
  
  onMounted(async () => {
    try {
      const response = await api.get(`${type}/${id}?language=pt-BR`);
      item.value = response.data;
      
      const videosResponse = await api.get(`${type}/${id}/videos?language=pt-BR`);
      const trailers = videosResponse.data.results.filter(video => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailers.length > 0) {
        trailerUrl.value = `https://www.youtube.com/watch?v=${trailers[0].key}`;
      }
  
      // Busca o elenco
      const castResponse = await api.get(`${type}/${id}/credits?language=pt-BR`);
      cast.value = castResponse.data.cast.slice(0, 10); // Pegue os 10 primeiros atores
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    }
  });
  
  </script>
  
  <style scoped>
  .movie-page {
    position: relative;
    color: white;
    font-family: Arial, sans-serif;
    height: 100dvh;
    overflow: hidden;
  }
  
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .background .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
  
  .background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(8px);
  }
  
  .content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: start;
    height: 100%;
    padding: 5%;
  }
  
  .movie-details {
    display: flex;
    gap: 20px;
  }
  
  .poster {
    width: 400px;
    border-radius: 8px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.7);
  }
  
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }
  
  .title {
    font-size: 36px;
    font-weight: bold;
  }
  
  .actions {
    display: flex;
    gap: 10px;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
  
  .btn.play {
    background-color: #1db954;
    color: white;
  }
  
  .btn.trailer {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
  }
  
  .btn.add {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
  }
  
  .metadata {
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    gap: 10px;
    font-size: 14px;
    color: #bbb;
    margin-bottom: 16px;
  }
  
  .description {
    font-size: 16px;
    line-height: 1.6;
    max-width: 600px;
  }
  
  .cast {
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
  }
  
  .actors {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
  }
  
  .actors .actor{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
  }
  
  .actors .actor img {
    width: 75px;
    border-radius: 7px;
    object-fit: cover;
  }
  
  .actors p {
    font-size: 16px;
    color: #fff;
  }
  
  </style>
  