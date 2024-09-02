import { createWebHistory, createRouter } from 'vue-router'

import Main from './pages/main.vue'
import Favorites from './pages/favorites.vue'
import Account from './pages/account.vue'
import FormRegistration from './components/form-registration.vue'

const routes = [
  { path: '/main', name: 'main', component: Main },
  { path: '/favorites', name: 'favorites', component: Favorites },
  { path: '/account', name: 'account', component: Account },
  { path: '/', name: 'form-registration', component: FormRegistration }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
