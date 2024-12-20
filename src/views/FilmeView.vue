<template>
  <div v-if="item">
    <img :src="imageBaseUrl + item.poster_path" :alt="item.title || item.name" />
    <h1>{{ item.title || item.name }}</h1>
    <p><strong>Data de Lançamento:</strong> {{ new Date(item.release_date || item.first_air_date).toLocaleDateString('pt-BR') }}</p>
    <p><strong>Avaliação:</strong> {{ item.vote_average.toFixed(1) }} / 10</p>
    <p><strong>Descrição:</strong> {{ item.overview }}</p>
  </div>
  <div v-else>
    <p>Carregando informações...</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '../plugins/axios';

// Extrair parâmetros da rota
const route = useRoute();
const { id } = route.params;
const type = route.meta.type || route.params.type; // Tipo pode ser 'movie' ou 'tv'

// Dados do item (filme ou série)
const item = ref(null);

// URL base para as imagens do TMDB
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

onMounted(async () => {
  try {
    const response = await api.get(`${type}/${id}?language=pt-BR`);
    item.value = response.data;
  } catch (error) {
    console.error(`Erro ao carregar detalhes do ${type}:`, error);
  }
});
</script>

<style scoped>
/* Adicione estilos para formatar a página de detalhes */
</style>
