<template>
  <div class="container">
    <div id="banner">
      <video src=""></video>
    </div>
    <div class="mainHome">
      <div class="titleHome">
        <h1>Bensa StreetWear Vai Se Fuder Alessandra</h1>
      </div>
      <div class="descriptionHome">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, excepturi molestiae. Vel
          velit minima officiis culpa, voluptas similique dolorum omnis porro vitae totam repellat
          consectetur provident quam reiciendis adipisci molestias.
        </p>
      </div>
      <div class="buttonsHome">
        <button><img src="#" alt=">" />Play</button>
        <button><img src="#" alt="#" />Mais Info</button>
      </div>
      <!-- Header -->
      <header>
        <h1>Explorar Programas de TV</h1>
        <p>Escolha um gênero para filtrar os programas.</p>
      </header>

      <!-- Filtro com Select -->
      <section class="filter-section">
        <label for="genreSelect">Filtrar por Gênero:</label>
        <select id="genreSelect" v-model="selectedGenre" @change="onGenreChange">
          <option value="" disabled>Selecione um gênero</option>
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">
            {{ genre.name }}
          </option>
        </select>
      </section>

      <!-- Loading -->
      <div v-if="isLoading && tvs.length === 0" class="loading">
        <p>Carregando...</p>
      </div>

      <!-- Lista de Programas -->
      <section v-else class="tv-section">
        <h2>
          {{ selectedGenreName ? `Programas de TV: ${selectedGenreName}` : 'Programas de TV' }}
        </h2>
        <div class="tv-grid">
          <div v-for="tv in tvs" :key="tv.id" class="tv-card">
            <!-- Imagem com Hover -->
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
let isFetching = false // Flag para evitar múltiplas chamadas simultâneas

// Carrega os gêneros ao iniciar
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

// Carrega programas de TV
const loadTvShows = async (genreId, reset = false) => {
  if (isFetching) return // Impede carregamentos simultâneos
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

// Reseta a lista ao mudar de gênero
const onGenreChange = () => {
  const selected = genres.value.find((g) => g.id === selectedGenre.value)
  selectedGenreName.value = selected ? selected.name : ''
  loadTvShows(selectedGenre.value, true)
}

// Formata data
const formatDate = (date) => {
  return date ? new Date(date).toLocaleDateString('pt-BR') : 'N/A'
}

// Scroll Infinito
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadTvShows(selectedGenre.value)
  }
})
</script>

<style scoped>
/* Container principal */
.container {
  font-family: 'Arial', sans-serif;
  width: 100%;
}
#banner {
  position: absolute;
  width: 100%;
  height: 80dvh;
  object-fit: cover;
}

.mainHome {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 30px;
  padding: 150px 75px 0;
}

.mainHome .titleHome {
  text-align: center;
  font-size: 40px;
  max-width: 40dvw;
  color: #fff;
}

.mainHome .descriptionHome {
  text-align: justify;
  font-size: 16px;
  letter-spacing: 1px;
  max-width: 40dvw;
  color: #ffffff94;
}

.mainHome .buttonsHome {
  display: flex;
  gap: 30px;
}

.mainHome .buttonsHome button {
  display: flex;
  gap: 7px;
  background-color: #313131;
  color: #fff;
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 5px;
  transition: all 0.45s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.mainHome .buttonsHome button:nth-child(1) {
  background: #fff;
  color: #000;
}

.mainHome .buttonsHome button:hover {
  transform: translateY(-3.5px);
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

header h1 {
  font-size: 2.5rem;
  color: #ffff;
}

header p {
  font-size: 1.1rem;
  color: #ffff;
}

/* Filtro */
.filter-section {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

select {
  width: 100%;
  max-width: 300px;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ffff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

/* TV Grid */
.tv-section h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.tv-grid {
  display: grid;
  grid-template-columns: repeat(4, 342px);
  gap: 1.5rem;
  justify-content: center;
}

.tv-card {
  position: relative;
  width: 342px;
  height: 513px;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.tv-card img {
  width: 100%;
  height: 100%;
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
  color: #ffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tv-card:hover .tv-overlay {
  opacity: 1;
}

.tv-overlay h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.tv-overlay p {
  font-size: 1rem;
  line-height: 1.4;
  margin: 0.2rem 0;
}

/* Loading */
.loading,
.loading-more {
  text-align: center;
  font-size: 1.2rem;
  color: #ffff;
  margin-top: 1.5rem;
}
</style>
