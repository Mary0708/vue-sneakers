<script setup>
import Catalog from '@/components/catalog.vue'
import axios from 'axios'
import { inject, onMounted, ref } from 'vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://7a1bc2bfcd9321a6.mokky.dev/favorites?_relations=items'
    )
    favorites.value = data.map((obj) => obj.item)
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <div>
    <h1 class="text-center text-xl font-bold">Мои Закладки</h1>
    <Catalog :items="favorites" is-favorites />
  </div>
</template>
