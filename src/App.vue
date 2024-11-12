<script setup>
  import { ref, onMounted } from 'vue';
  import api from './plugins/axios';

  const moviesGenres = ref([]);
  const TVGenres = ref([]);

  onMounted(async () => {
    let response = await api.get('genre/movie/list?language=pt-BR');
    moviesGenres.value = response.data.genres;
    response = await api.get('genre/tv/list?language=pt-BR');
    TVGenres.value = response.data.genres;
  });
</script>
<template>
  <div class="container">
    <nav>
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/filmes" class="nav-link">Filmes</router-link>
      <router-link to="/tv" class="nav-link">Programas de TV</router-link>
    </nav>
    <router-view />
  </div>
</template>


<style scoped>

.container {
  font-family: 'Arial', sans-serif;
  background-color: #121212; 
  color: #fff; 
  padding: 0 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}


nav {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  padding: 10px 0;
  background-color: #1f1f1f; 
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 20px;
  transition: color 0.3s ease, transform 0.2s ease;
}

.nav-link:hover {
  color: #5457f5; 
  transform: scale(1.1);
}

.nav-link:focus {
  outline: none;
  color: #e50914; 
}


@media (max-width: 768px) {
  .nav-link {
    font-size: 1rem;
    margin: 0 10px;
  }
}
</style>

