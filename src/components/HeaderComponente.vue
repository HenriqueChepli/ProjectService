<script setup>
</script>
<template>
    <nav>
      <router-link to="/" class="nav-link">AlMossar</router-link>
      <router-link to="/filmes" class="nav-link">Filmes</router-link>
      <router-link to="/tv" class="nav-link">Programas de TV</router-link>
    </nav>
</template>


<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 25px 50px;
  background-color: transparent; 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.nav-link:nth-child(1){
    font-size: 23px;
    margin: 0 50px 0 0;
}

.nav-link {
  color: #696969;
  text-decoration: none;
  font-size: 12px;
  font-weight: bold;
  margin: 0 20px;
  transition: all 0.25s ease;
}

.nav-link:hover {
    transform: translateY(-2.5px);
}

.nav-link:focus {
  color: #ffffff; 
}


@media (max-width: 768px) {
  .nav-link {
    font-size: 1rem;
    margin: 0 10px;
  }
}
</style>

