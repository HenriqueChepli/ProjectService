<script setup>
import { ref, onMounted } from 'vue'
import api from '../plugins/axios'
import { useRouter } from 'vue-router' // Para navegar entre as páginas

// Estados reativos para os carrosséis
const popularMovies = ref([])
const trendingMovies = ref([])
const popularSeries = ref([])
const topRatedTVShows = ref([])

// URL base para as imagens do TMDB
const imageBaseUrl = 'https://image.tmdb.org/t/p/w342'

const router = useRouter()

function visualizar(type, id) {
  router.push(`/${type}/${id}`); // Navega para a página com o tipo e ID
}


onMounted(async () => {
  try {
    // Buscar filmes populares
    const popularMoviesResponse = await api.get('movie/popular?language=pt-BR')
    popularMovies.value = popularMoviesResponse.data.results

    // Buscar filmes em alta (trending)
    const trendingMoviesResponse = await api.get('trending/movie/week?language=pt-BR')
    trendingMovies.value = trendingMoviesResponse.data.results

    // Buscar séries populares
    const popularSeriesResponse = await api.get('tv/popular?language=pt-BR')
    popularSeries.value = popularSeriesResponse.data.results

    // Buscar melhores programas de TV
    const topRatedTVShowsResponse = await api.get('tv/top_rated?language=pt-BR')
    topRatedTVShows.value = topRatedTVShowsResponse.data.results
  } catch (error) {
    console.error('Erro ao buscar dados da API TMDB:', error)
  }
});
</script>
<template>
  <main>
    <div id="banner">
      <video src="../assets/img/movie/YouCut_20241220_130412694.mp4" autoplay loop muted></video>
    </div>
    <div class="mainHome">
      <div class="indexHome">
        <div class="titleHome">
          <h1>Bensa StreetWear</h1>
        </div>
        <div class="descriptionHome">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, excepturi molestiae...
          </p>
        </div>
        <div class="buttonsHome">
          <button><img src="../assets/img/botao-play.png" alt="Play" />Assistir</button>
          <button><img src="../assets/img/more-information.png" alt="Mais Info" />Mais Info</button>
        </div>
      </div>
      <div class="divCarrocels">
        <!-- Carrossel: Filmes Populares -->
        <div class="carrocelHome">
          <div class="carrocelTitle">
            <h3>Popular no AlMossar Studios</h3>
          </div>
          <div class="carrocelProduct">
          <div class="product" v-for="movie in popularMovies" :key="movie.id">
            <button @click="visualizar('movie', movie.id)">
              <img :src="imageBaseUrl + movie.poster_path" :alt="movie.title" />
              <div class="descriptionProduct">
                <h4>{{ movie.title }}</h4>
                <p>Lançamento: {{ new Date(movie.release_date).toLocaleDateString('pt-BR') }}</p>
                <p>Avaliação: {{ movie.vote_average.toFixed(1) }} / 10</p>
              </div>
            </button>
          </div>
        </div>
        </div>
        <!-- Carrossel: Filmes em Alta -->
        <div class="carrocelHome">
          <div class="carrocelTitle">
            <h3>Filmes em Alta</h3>
          </div>
          <div class="carrocelProduct">
            <div class="product" v-for="movie in trendingMovies" :key="movie.id">
              <button @click="visualizar('movie', movie.id)">
              <img :src="imageBaseUrl + movie.poster_path" :alt="movie.title" />
              <!-- Descrição do Produto -->
              <div class="descriptionProduct">
                <h4>{{ movie.title }}</h4>
                <!-- Nome do filme -->
                <p>Lançamento: {{ new Date(movie.release_date).toLocaleDateString('pt-BR') }}</p>
                <!-- Data de lançamento -->
                <p>Avaliação: {{ movie.vote_average.toFixed(1) }} / 10</p>
                <!-- Avaliação -->
              </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Carrossel: Séries Populares -->
        <div class="carrocelHome">
          <div class="carrocelTitle">
            <h3>Séries Populares</h3>
          </div>
          <div class="carrocelProduct">
            <div class="product" v-for="serie in popularSeries" :key="serie.id">
              <button @click="visualizar('tv', serie.id)">
              <img :src="imageBaseUrl + serie.poster_path" :alt="serie.name" />
              <!-- Descrição do Produto -->
              <div class="descriptionProduct">
                <h4>{{ serie.name }}</h4>
                <!-- Nome do filme -->
                <p>Lançamento: {{ new Date(serie.first_air_date).toLocaleDateString('pt-BR') }}</p>
                <!-- Data de lançamento -->
                <p>Avaliação: {{ serie.vote_average.toFixed(1) }} / 10</p>
                <!-- Avaliação -->
              </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Carrossel: Melhores Programas de TV -->
        <div class="carrocelHome">
          <div class="carrocelTitle">
            <h3>Principais Programas de TV</h3>
          </div>
          <div class="carrocelProduct">
            <div class="product" v-for="serie in topRatedTVShows" :key="serie.id">
              <button @click="visualizar('tv', serie.id)">
              <img :src="imageBaseUrl + serie.poster_path" :alt="serie.name" />
              <!-- Descrição do Produto -->
              <div class="descriptionProduct">
                <h4>{{ serie.name }}</h4>
                <!-- Nome do filme -->
                <p>Lançamento: {{ new Date(serie.first_air_date).toLocaleDateString('pt-BR') }}</p>
                <!-- Data de lançamento -->
                <p>Avaliação: {{ serie.vote_average.toFixed(1) }} / 10</p>
                <!-- Avaliação -->
              </div>
              </button>
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

#banner video {
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
  padding: 30px 75px 0 75px;
  z-index: 1;
}

.mainHome .indexHome {
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

.buttonsHome {
  display: flex;
  gap: 1rem;
}

.buttonsHome button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: transparent;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: transform 0.3s;
}

.buttonsHome button:hover {
  transform: translateY(-3px);
}

.mainHome .divCarrocels {
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
  gap: 45px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  width: 1800px;
  overflow-y: hidden;
  scrollbar-color: transparent transparent;
}

.mainHome .carrocelHome .carrocelProduct .product {
  flex: 0 0 auto;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  transition: all 0.5s;
}

.mainHome .carrocelHome .carrocelProduct .product button{
  background: none;
  cursor: pointer;
}

.mainHome .carrocelHome .carrocelProduct .product .descriptionProduct {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 5px;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  bottom: 0; 
  left: 0;
  opacity: 0;
  color: #fff;
  transition: all 0.5s ease; 
  padding: 50px 25px;
  transform: translateY(50px);
}

.mainHome .carrocelHome .carrocelProduct .product:hover .descriptionProduct {
  opacity: 1; 
  transform: translateY(0);
}

.mainHome .carrocelHome .carrocelProduct .product .descriptionProduct h4{
  font-size: 20px;
}

.mainHome .carrocelHome .carrocelProduct .product .descriptionProduct p {
  font-size: 14px;
}

.mainHome .carrocelHome .carrocelProduct .product img {
  width: 300px;
  border-radius: 12px;
  transition: all 0.5s ease; 
}

.mainHome .carrocelHome .carrocelProduct .product:hover img{
  opacity: .5;
}
</style>