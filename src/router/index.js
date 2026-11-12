
import { createRouter, createWebHistory } from 'vue-router'

import EditerListe from '../views/editerListe.vue'
import Detail from '../views/detail.vue'
import Modifier from '../views/modifier.vue'

const routes = [
  { path: '/', component: EditerListe },
  { path: '/ajouter', component: Modifier },
  { path: '/details/:id', component: Detail },
  { path: '/modifier/:id', component: Modifier }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
