import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/filmes',
    name: 'Movies',
    component: () => import('../views/MoviesView.vue'),
  },
  {
    path: '/tv',
    name: 'TV',
    component: () => import('../views/TvView.vue'),
  },
  {
    path: '/:type/:id',
    name: 'details',
    component: () => import('../views/FilmeView.vue'),
    props: true, // Passa os parâmetros diretamente como props
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
