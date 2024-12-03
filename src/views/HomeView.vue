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
      <video src=""></video>
    </div>
    <div class="mainHome">
      <div class="titleHome">
        <h1>Bensa StreetWear Vai Se Fuder Alessandra</h1>
      </div>
      <div class="descriptionHome">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, excepturi molestiae. Vel velit minima officiis culpa, voluptas similique dolorum omnis porro vitae totam repellat consectetur provident quam reiciendis adipisci molestias.</p>
      </div>
      <div class="buttonsHome">
        <button><img src="#" alt=">">Play</button>
        <button><img src="#" alt="#">Mais Info</button>
      </div>
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
    </div>
  </main>
</template>
<style scoped>
  main{
    width: 100%;
  }

  #banner {
  position: absolute;
  width: 100%;
  height: 80dvh;
  object-fit: cover;
}

  .mainHome{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    gap: 30px;
    padding: 150px 75px 0;
  }

  .mainHome .titleHome{
    text-align: center;
    font-size: 40px;
    max-width: 40dvw;
    color: #fff;
  }

  .mainHome .descriptionHome{
    text-align: justify;
    font-size: 16px;
    letter-spacing: 1px;
    max-width: 40dvw;
    color: #ffffff94;
  }

  .mainHome .buttonsHome{
    display: flex;
    gap: 30px;
  }

  .mainHome .buttonsHome button{
    display: flex;
    gap: 7px;
    background-color: #313131;
    color: #fff;
    padding: 10px 20px;
    font-size: 20px;
    border-radius: 5px;
    transition: all .45s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .mainHome .buttonsHome button:nth-child(1){
    background: #fff;
    color: #000;
  }

  .mainHome .buttonsHome button:hover{
    transform: translateY(-3.5px);
  }

  .mainHome .carrocelHome{
    margin: 25px 0 0 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    gap: 25px;
  }

  .mainHome .carrocelHome .carrocelTitle{
    font-size: 17px;
    font-weight: bold;
    color: #fff;
  }

  .mainHome .carrocelHome .carrocelProduct {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 30px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; 
  width: 1800px;
  height: auto;
  overflow-y: hidden;
  scrollbar-width: thin; /* Barra de rolagem fina */
  scrollbar-color: transparent transparent;
}

.mainHome .carrocelHome .carrocelProduct .product {
  flex: 0 0 auto;
  width: 300px;
  height: 200px;
  border-radius: 12px;
  border: 1px solid #fff;
}

.mainHome .carrocelHome .carrocelProduct .product img {
  width: 100%;
  height: 100%;
  border-radius: 12px;
}

</style>