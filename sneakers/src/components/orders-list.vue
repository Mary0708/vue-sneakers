<script setup>
import Catalog from './catalog.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const orders = ref([])
const storedToken = localStorage.getItem('token')
const backApi = 'https://7a1bc2bfcd9321a6.mokky.dev/orders'

onMounted(async () => {
  try {
    const { data } = await axios.get(backApi)

    // Filter orders based on the stored token
    orders.value = data.filter((order) => order.user_token === storedToken)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="relative">
    <h1 class="left-0 absolute text-xl font-bold">Мои заказы</h1>
    <div v-for="order in orders" :key="order.id" class="mb-8">
      <h2 class="">Заказ #{{ order.id }}</h2>
      <Catalog :items="order.items.slice(0, 4)" is-favorites />
    </div>
  </div>
</template>
