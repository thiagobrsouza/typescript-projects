import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import Marcas from '../views/Marcas'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/marcas',
    name: 'Marcas',
    component: Marcas
  },
  {
    path: '/marcas/:id',
    name: 'Marcas-Editar',
    component: Marcas
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
