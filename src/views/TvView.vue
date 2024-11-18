<script setup>
import { ref, onMounted } from 'vue';
import api from '../plugins/axios';

const genres = ref([]);
const tvs = ref([]);

onMounted(async () => {
   try {
       const response = await api.get('genre/tv/list', {
           params: { language: 'pt-BR' }
       });
       genres.value = response.data.genres;
   } catch (error) {
       console.error('Erro ao carregar os gêneros:', error);
   }
});

const listTv = async (genreId) => {
   try {
       const response = await api.get('discover/tv', {
           params: {
               with_genres: genreId,
               language: 'pt-BR'
           }
       });
       tvs.value = response.data.results;
   } catch (error) {
       console.error('Erro ao carregar programas de TV:', error);
   }
};
</script>


<template>
   <div>
       <h1>Gêneros de Programas de TV</h1>
       <ul>
           <li v-for="genre in genres" :key="genre.id" @click="listTv(genre.id)" class="genre-item">
               {{ genre.name }}
           </li>
       </ul>
       <div class="movie-list">
           <div v-for="tv in tvs" :key="tv.id" class="movie-card">
               <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="tv.name" />
               <div class="movie-details">
                   <p class="movie-title">{{ tv.name }}</p>
                   <p class="movie-release-date">{{ tv.first_air_date }}</p>
               </div>
           </div>
       </div>
   </div>
</template>


<style scoped>
.movie-list {
   display: flex;
   flex-wrap: wrap;
   gap: 1rem;
}


.movie-card {
   width: 15rem;
   height: 30rem;
   border-radius: 0.5rem;
   overflow: hidden;
   box-shadow: 0 0 0.5rem #000;
}


.movie-card img {
   width: 100%;
   height: 20rem;
   object-fit: cover;
}


.movie-details {
   padding: 0.5rem;
}


.movie-title {
   font-size: 1.2rem;
   font-weight: bold;
   line-height: 1.5rem;
   margin-bottom: 0.5rem;
}


.movie-release-date {
   font-size: 0.9rem;
   color: #555;
}
</style>



