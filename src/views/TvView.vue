<script setup>
import { ref, onMounted } from 'vue';
import api from '../plugins/axios';

const genres = ref([]);

onMounted(async () => {
    const response = await api.get('genre/tv/list?language=pt-BR');
    genres.value = response.data.genres;
});
</script>

<template>
    <div class="container">
      <h1 class="page-title">Gêneros de Programas de TV</h1>
      <ul class="genre-list">
        <li v-for="genre in genres" :key="genre.id" class="genre-item">
          {{ genre.name }}
        </li>
      </ul>
    </div>
  </template>
  <style scoped>
  .container {
    font-family: 'Arial', sans-serif;
    background-color: #121212;
    color: #fff;
    padding: 20px;
    min-height: 100vh;
  }
  
  .page-title {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
    color: #fff;
  }
  
  .genre-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .genre-item {
    background-color: #1f1f1f;
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 1.1rem;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .genre-item:hover {
    background-color: #e50914;
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    .genre-item {
      font-size: 1rem;
      padding: 10px 20px;
    }
  
    .page-title {
      font-size: 1.5rem;
    }
  }
  </style>
  