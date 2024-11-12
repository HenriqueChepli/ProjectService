<script setup>
import { ref, onMounted } from 'vue';
import api from '../plugins/axios'

const genres = ref([]);

onMounted(async () => {
  const response = await api.get('genre/movie/list?language=pt-BR');
  genres.value = response.data.genres;
});

const movies = ref([]);

const listMovies = async (genreId) => {
  const response = await api.get('discover/movie', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  });
  movies.value = response.data.results
};
</script>
<template>
  <div class="container">
    <h1 class="page-title">Gêneros de Filmes</h1>
    <ul class="genre-list">
      <li v-for="genre in genres" :key="genre.id" @click="listMovies(genre.id)" class="genre-item">
        {{ genre.name }}
      </li>
    </ul>
    <div class="movie-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
        <div class="movie-details">
          <p class="movie-title">{{ movie.title }}</p>
          <p class="movie-release-date">{{ movie.release_date }}</p>
          <p class="movie-genres">{{ movie.genre_ids.join(', ') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.container {
  font-family: 'Arial', sans-serif;
  background-color: #121212;
  color: #fff;
  padding: 20px;
}

.page-title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: white
}

.genre-list {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.genre-item {
  background-color: #1f1f1f;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.genre-item:hover {
  background-color: #3261e4;
  transform: scale(1.1);
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.movie-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
  background-color: #1f1f1f;
  transition: transform 0.3s ease;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  height: 20rem;
  object-fit: cover;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.movie-details {
  padding: 0.5rem;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: #fff;
  height: 3.2rem;
  line-height: 1.3rem;
}

.movie-release-date {
  font-size: 0.9rem;
  color: #aaa;
}

.movie-genres {
  font-size: 0.9rem;
  color: #bbb;
}

@media (max-width: 768px) {
  .movie-card {
    width: 12rem;
    height: 25rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .genre-item {
    font-size: 0.9rem;
  }
}
</style>
