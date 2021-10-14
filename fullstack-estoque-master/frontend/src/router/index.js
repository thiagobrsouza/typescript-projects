import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/providers',
    name: 'Providers',
    component: () => import('../views/providers/Providers.vue')
  },
  {
    path: '/provider-add/',
    name: 'ProviderAdd',
    component: () => import('../views/providers/ProviderAdd.vue')
  },
  {
    path: '/providers/:id',
    name: 'ProviderUpdate',
    component: () => import('../views/providers/ProviderDetail.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/products/Products.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
