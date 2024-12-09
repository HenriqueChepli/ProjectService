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
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');


* {
  font-family: "Arial", sans-serif;
  padding: 0;
  border: 0;
  margin: 0;
  box-sizing: border-box;
}


a {
  text-decoration: none;
}


html {
  scroll-behavior: smooth;
  overflow-x: hidden;
  background: #0d0d0d;
}


body,
html {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
}


::-webkit-scrollbar {
  width: 0;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  width: 0;
  background-color: transparent;
}
</style>





