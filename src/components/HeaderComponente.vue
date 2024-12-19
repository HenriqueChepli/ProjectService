<template>
  <nav>
    <router-link to="/" class="nav-title">AlMossar</router-link>
    <router-link to="/filmes" class="nav-link">Filmes</router-link>
    <router-link to="/tv" class="nav-link">Programas de TV</router-link>

    <!-- Barra de pesquisa no header -->
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        @input="onSearch"
        placeholder="Pesquise por filme ou programa"
      />
    </div>
  </nav>

  <!-- Exibindo resultados da pesquisa -->
  <div v-if="searchQuery && filteredMovies.length > 0" class="movie-section">
    <header class="explore-header">
      <h1>Resultados para: "{{ searchQuery }}"</h1>
    </header>
    <div class="movie-grid">
      <div v-for="movie in filteredMovies" :key="movie.id" class="movie-card">
        <img
          :src="movie.poster_path ? `https://image.tmdb.org/t/p/w780${movie.poster_path}` : 'https://via.placeholder.com/342x513?text=Sem+Imagem'"
          :alt="movie.title"
          loading="lazy"
        />
        <div class="movie-overlay">
          <h3>{{ movie.title }}</h3>
          <p>Data de Lançamento: {{ formatDate(movie.release_date) }}</p>
          <p>Avaliação: {{ movie.vote_average.toFixed(1) }}/10</p>
        </div>
      </div>
    </div>
    <button class="loadMore" v-if="hasMoreResults" @click="loadMoreMovies"><img src="../assets/img/reload.png" alt=""></button>
  </div>

  <!-- Caso não haja resultados de pesquisa -->
  <div v-else-if="searchQuery && filteredMovies.length === 0" class="no-results">
    <p>Nenhum resultado encontrado para: "{{ searchQuery }}"</p>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import api from '../plugins/axios';
import { debounce } from 'lodash';

// Dados reativos
const searchQuery = ref('');
const movies = ref([]);
const filteredMovies = ref([]);
const currentPage = ref(1);
const isLoading = ref(false);
const hasMoreResults = ref(true);

// Função para carregar filmes
const loadMovies = async (query = '', page = 1) => {
  if (isLoading.value) return;

  isLoading.value = true;
  try {
    const response = await api.get('movie/popular', {
      params: {
        language: 'pt-BR',
        page: page,
        query: query,
      },
    });
    const results = response.data.results;
    if (results.length > 0) {
      movies.value = page === 1 ? results : [...movies.value, ...results];
      filteredMovies.value = movies.value;
      hasMoreResults.value = results.length > 0;
    }
  } catch (error) {
    console.error('Erro ao carregar filmes:', error);
  } finally {
    isLoading.value = false;
  }
};

// Função para pesquisa com debounce
const onSearch = debounce(() => {
  currentPage.value = 1; // Resetar para a primeira página a cada nova pesquisa
  loadMovies(searchQuery.value, currentPage.value);
}, 500);

// Função para carregar mais filmes ao clicar no botão
const loadMoreMovies = () => {
  if (isLoading.value) return;

  currentPage.value += 1;
  loadMovies(searchQuery.value, currentPage.value);
};

// Função para formatar a data
const formatDate = (date) => (date ? new Date(date).toLocaleDateString('pt-BR') : 'N/A');

// Carregar filmes iniciais ao montar o componente
onMounted(() => {
  loadMovies();
});
</script>


<style scoped>
/* Estilos para o header */
nav {
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 25px 50px;
  background-color: transparent;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.nav-title {
  font-size: 23px;
  margin-right: 50px;
  color: #fff;
  text-decoration: none;
}

.nav-link {
  color: #696969;
  text-decoration: none;
  font-size: 12px;
  font-weight: bold;
  margin: 0 20px;
  transition: all 0.25s ease;
}

.nav-link:hover {
  transform: translateY(-2.5px);
}

.nav-link:focus {
  color: #ffffff;
}

/* Barra de pesquisa no header */
.search-bar {
  position: absolute;
  right: 50px;
  top: 25px;
}

.search-bar input {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background-color: #1c1c1c;
  color: #fff;
  outline: none;
  width: 250px;
}

/* Exibição dos resultados da pesquisa */
.movie-section {
  padding: 2rem 50px;
  background-color: #121212;
  color: white;
}

.explore-header {
  text-align: center;
  font-size: 2.0rem;
  color: white;
  margin-bottom: 2rem;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(4, 342px);
  justify-content: center;
  gap: 1rem;
}

.movie-card {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.movie-card img {
  width: 342px;
  height: 500px;
  object-fit: cover;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-overlay {
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

.movie-card:hover .movie-overlay {
  opacity: 1;
}

.no-results {
  text-align: center;
  color: white;
  font-size: 1.5rem;
}
.loadMore{
  align-items: center;
  display: flex;
  justify-content: center;
  margin: auto;
  cursor: pointer;
  background-color: #121212;
  padding: 50px;
}
</style>
