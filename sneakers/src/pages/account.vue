<script setup>
import { ref, onMounted, inject, provide } from 'vue'
import axios from 'axios'
import OrdersList from '@/components/orders-list.vue'

const imageUrl = ref('/profile.svg')
const name = ref('')
const email = ref('')

const isAuthorized = ref(false)

const storedToken = localStorage.getItem('token')

onMounted(async () => {
  if (storedToken) {
    try {
      const { data } = await axios.get('https://7a1bc2bfcd9321a6.mokky.dev/users')
      const user = data.find((user) => user.token === storedToken)

      if (user) {
        name.value = user.name
        email.value = user.email
        isAuthorized.value = true
      }
    } catch (error) {
      console.log(error)
    }
  }
})

provide('storedToken', storedToken)
</script>

<template>
  <div v-auto-animate>
    <h1 class="text-center text-2xl">Личный кабинет</h1>
    <div v-if="isAuthorized" class="text-center mt-10">
      <img :src="imageUrl" alt="Profile" class="rounded-full w-24 h-24 mx-auto" />
      <h2 class="mt-4 text-xl font-bold">{{ name }}</h2>
      <p class="text-gray-600">{{ email }}</p>
      <hr class="my-4" />
      <OrdersList />
    </div>
    <div v-else>
      <p>Пожалуйста, авторизуйтесь.</p>
    </div>
  </div>
</template>
