<script setup>
import { ref, onMounted } from 'vue';
import api from '../plugins/axios'


const movies = ref([
 {
   id:1
 },
 {
   id:2
 },
 {
   id:3
 },
 {
   id:4
 },
 {
   id:5
 },
 {
   id:6
 },
 {
   id:7
 },
 {
   id:8
 },
 {
   id:9
 },
 {
   id:10
 },
 {
   id:11
 },
]);
const genres = ref([]);


onMounted(async () => {
 const response = await api.get('genre/movie/list?language=pt-BR');
 genres.value = response.data.genres;
});
</script>
<template>
 <main>
   <div id="banner">
     <video src="#" autoplay loop muted ></video>
   </div>
   <div class="mainHome">
     <div class="indexHome">
     <div class="titleHome">
       <h1>Bensa StreetWear</h1>
     </div>
     <div class="descriptionHome">
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, excepturi molestiae. Vel velit minima officiis culpa, voluptas similique dolorum omnis porro vitae totam repellat consectetur provident quam reiciendis adipisci molestias.</p>
     </div>
     <div class="buttonsHome">
       <button><img src="#" alt=">">Play</button>
       <button><img src="#" alt="#">Mais Info</button>
     </div>
   </div>
   <div class="divCarrocels">
     <div class="carrocelHome">
       <div class="carrocelTitle">
         <h3>Popular no AlMossar Studios</h3>
       </div>
       <div class="carrocelProduct">
         <div class="product"  v-for="movie in movies" :key="movie.id" >
           <img :src="`https://image.tmdb.org/t/p/${w342}/${movie.poster_path}`" :alt="movie.name">
         </div>
       </div>
     </div>
     <div class="carrocelHome">
       <div class="carrocelTitle">
         <h3>Filmes em Alta</h3>
       </div>
       <div class="carrocelProduct">
         <div class="product"  v-for="movie in movies" :key="movie.id" >
           <img :src="`https://image.tmdb.org/t/p/${w342}/${movie.poster_path}`" :alt="movie.name">
         </div>
       </div>
     </div>
     <div class="carrocelHome">
       <div class="carrocelTitle">
         <h3>Séries Populares</h3>
       </div>
       <div class="carrocelProduct">
         <div class="product"  v-for="movie in movies" :key="movie.id" >
           <img :src="`https://image.tmdb.org/t/p/${w342}/${movie.poster_path}`" :alt="movie.name">
         </div>
       </div>
     </div>
     <div class="carrocelHome">
       <div class="carrocelTitle">
         <h3>Principais Programas de TV</h3>
       </div>
       <div class="carrocelProduct">
         <div class="product"  v-for="movie in movies" :key="movie.id" >
           <img :src="`https://image.tmdb.org/t/p/${w342}/${movie.poster_path}`" :alt="movie.name">
         </div>
       </div>
     </div>
   </div>
   </div>
 </main>
</template>


<style scoped>
 main {
 width: 100%;
 height: 100vh; /* Garantir que o main ocupe 100% da altura da tela */
 position: relative;
}


#banner {
 position: absolute;
 top: 0;
 left: 0;
 z-index: -1;
 box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}


#banner video{
 width: 100%;
 object-fit: cover;
}


.mainHome {
 position: relative;
 display: flex;
 justify-content: center;
 align-items: start;
 flex-direction: column;
 gap: 30px;
 padding: 0 75px 0;
 z-index: 1;
}


.mainHome .indexHome{
 height: 100dvh;
 display: flex;
 justify-content: center;
 align-items: start;
 flex-direction: column;
 gap: 40px;
}


.mainHome .titleHome {
 text-align: center;
 font-size: 2dvw;
 max-width: 40dvw;
 color: #fff;
}


.mainHome .descriptionHome {
 text-align: justify;
 font-size: 1dvw;
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


.mainHome .divCarrocels{
 margin: 75px 0;
 display: flex;
 justify-content: center;
 align-items: start;
 flex-direction: column;
 gap: 30px;
}


.mainHome .carrocelHome {
 width: 100%;
 display: flex;
 justify-content: center;
 align-items: start;
 flex-direction: column;
 gap: 25px;
}


.mainHome .carrocelHome .carrocelTitle {
 font-size: 17px;
 font-weight: bold;
 color: #fff;
}


.mainHome .carrocelHome .carrocelProduct {
 display: flex;
 justify-content: start;
 align-items: center;
 gap: 15px;
 overflow-x: auto;
 -webkit-overflow-scrolling: touch;
 width: 1800px;
 overflow-y: hidden;
 scrollbar-color: transparent transparent;
}


.mainHome .carrocelHome .carrocelProduct .product {
 flex: 0 0 auto;
 width: 220px;
 height: 270px;
 border-radius: 12px;
 border: 1px solid #fff;
}


.mainHome .carrocelHome .carrocelProduct .product img {
 width: 100%;
 height: 100%;
 border-radius: 12px;
}




</style>
