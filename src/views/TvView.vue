<template>
  <div>
    <div class="banner">
      <video src="" autoplay muted loop></video>
      <div class="mainHome">
        <div class="titleHome">
          <h1>PODLER PODCAST</h1>
        </div>
        <div class="descriptionHome">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, excepturi molestiae.
            Vel velit minima officiis culpa, voluptas similique dolorum omnis porro vitae totam
            repellat consectetur provident quam reiciendis adipisci molestias.
          </p>
        </div>
        <div class="buttonsHome">
          <button><img src="../assets/img/botao-play.png" alt="Play" />Play</button>
          <button><img src="../assets/img/more-information.png" alt="Mais Info" />Mais Info</button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="layout">
        <section class="filter-section">
          <label for="genreSelect">Filtrar por Gênero:</label>
          <div class="select-wrapper">
            <select id="genreSelect" v-model="selectedGenre" @change="onGenreChange">
              <option value="" disabled>Selecione um gênero</option>
              <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                {{ genre.name }}
              </option>
            </select>
          </div>
        </section>
        <header class="explore-header">
          <h1>
            {{ selectedGenreName ? ` ${selectedGenreName}` : 'Programas de Tv:' }}
          </h1>
        </header>
        <div class="genre-info">
          <h2></h2>
        </div>
      </div>

      <div v-if="isLoading && tvs.length === 0" class="loading">
        <p>Carregando...</p>
      </div>
      <section v-else class="tv-section">
        <div class="tv-grid">
          <div v-for="tv in tvs" :key="tv.id" class="tv-card">
            <img
              :src="
                tv.poster_path
                  ? `https://image.tmdb.org/t/p/w780${tv.poster_path}`
                  : 'https://via.placeholder.com/342x513?text=Sem+Imagem'
              "
              :alt="tv.name"
              loading="lazy"
            />
            <div class="tv-overlay">
              <h3>{{ tv.name }}</h3>
              <p>Data de Lançamento: {{ formatDate(tv.first_air_date) }}</p>
              <p>Avaliação: {{ tv.vote_average.toFixed(1) }}/10</p>
            </div>
          </div>
        </div>
        <div v-if="isLoadingMore" class="loading-more">
          <p>Carregando mais programas...</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../plugins/axios'

const genres = ref([])
const tvs = ref([])
const selectedGenre = ref(null)
const selectedGenreName = ref('')
const page = ref(1)
const isLoading = ref(false)
const isLoadingMore = ref(false)
let isFetching = false

onMounted(async () => {
  try {
    const response = await api.get('genre/tv/list', {
      params: { language: 'pt-BR' },
    })
    genres.value = response.data.genres
  } catch (error) {
    console.error('Erro ao carregar os gêneros:', error)
  }
})

const loadTvShows = async (genreId, reset = false) => {
  if (isFetching) return
  isFetching = true

  if (reset) {
    tvs.value = []
    page.value = 1
    isLoading.value = true
  } else {
    isLoadingMore.value = true
  }

  try {
    const response = await api.get('discover/tv', {
      params: {
        with_genres: genreId,
        language: 'pt-BR',
        page: page.value,
      },
    })
    tvs.value = reset ? response.data.results : [...tvs.value, ...response.data.results]
    page.value++
  } catch (error) {
    console.error('Erro ao carregar programas de TV:', error)
  } finally {
    isLoading.value = false
    isLoadingMore.value = false
    isFetching = false
  }
}

const onGenreChange = () => {
  const selected = genres.value.find((g) => g.id === selectedGenre.value)
  selectedGenreName.value = selected ? selected.name : ''
  loadTvShows(selectedGenre.value, true)
}

const formatDate = (date) => (date ? new Date(date).toLocaleDateString('pt-BR') : 'N/A')

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadTvShows(selectedGenre.value)
  }
})
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Arial', sans-serif;
}

.banner {
  position: relative;
  width: 100%;
  height: 80vh;
  overflow: hidden;
}

.banner video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mainHome {
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  z-index: 10;
  color: white;
}

.titleHome h1 {
  font-size: 5rem;
}

.descriptionHome p {
  font-size: 1rem;
  color: #ffffffb3;
  max-width: 600px;
  line-height: 2;
}

.buttonsHome {
  display: flex;
  gap: 1rem;
}

.buttonsHome button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #0d0d0d;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: transform 0.3s;
}

.buttonsHome button:hover {
  transform: translateY(-3px);
}

.container {
  padding: 3rem;
  background-color: #121212;
  color: #fff;
}

.layout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
}

.filter-section {
  position: absolute;
  top: 90%;
  left: 5%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.select-wrapper select {
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  background-color: #1c1c1c;
  color: #fff;
  cursor: pointer;
  width: 250px;
  transition: all 0.3s;
  appearance: none;
}
.select-wrapper {
  position: relative;
}

.select-wrapper:after {
  content: '▼';
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  pointer-events: none;
}

select:focus {
  overflow: visible;
}

select optgroup,
select option {
  direction: ltr;
}


.explore-header {
  text-align: center;
  font-size: 3rem;
  color: #fff;
  margin-top: -30px;
}

.tv-grid {
  display: grid;
  grid-template-columns: repeat(4, 342px);
  justify-content: center;
  gap: 1rem;
  margin-top: 100px;
}

.tv-card {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.tv-card img {
  width: 342px;
  height: 500px;
  object-fit: cover;
}

.tv-card:hover {
  transform: scale(1.05);
}

.tv-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.tv-card:hover .tv-overlay {
  opacity: 1;
}

.loading,
.loading-more {
  text-align: center;
  color: #fff;
  margin-top: 1.5rem;
}
</style>
