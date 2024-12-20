<template>
   <header>
     <nav>
       <router-link to="/" class="nav-title"><img src="../assets/img/AL MOSSAR STUDIOS.png" alt=""></router-link>
       <router-link to="/filmes" class="nav-link">Filmes</router-link>
       <router-link to="/tv" class="nav-link">Programas de TV</router-link>
 
       <div class="search-bar">
         <input type="text" placeholder="Pesquisar"/>
       </div>
     </nav>
     </header>
 </template>
 
 
 <style scoped>
 header {
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   z-index: 1000;
   background-color: transparent;
   color: white;
   backdrop-filter: blur(5px);
   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
 }
 
 nav {
   display: flex;
   align-items: center;
   justify-content: start;
 }
 
 .nav-title {
   font-size: 23px;
   margin-right: 50px;
   color: #fff;
   text-decoration: none;
 }

 .nav-title img{
  width: 150px;
 }
 
 .nav-link {
   color: #696969;
   text-decoration: none;
   font-size: 15px;
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
 
 .search-bar {
   position: absolute;
   right: 50px;
 }
 
 .search-bar input {
   padding: 0.5rem;
   font-size: 15px;
   border-radius: 0.5rem;
   border: 1px solid #ccc;
   background-color: transparent;
   color: #fff;
   outline: none;
   width: 250px;
 }
 </style>
 
