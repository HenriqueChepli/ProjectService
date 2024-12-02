<script setup>
  import { ref, onMounted } from 'vue';
  import api from './plugins/axios';
  import HeaderComponente from './components/HeaderComponente.vue';


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
  <div>
    <HeaderComponente />
    <router-view />
  </div>
</template>


<style>
*{
  border: 0;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

</style>

