<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'

const catalog = ref([])
const sortBy = ref('')
const searchQuery = ref('')

const onChangeSelect = (event) => {
  sortBy.value = event.target.value
}
</script>

<template>
  <div class="flex gap-4">
    <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
      <option value="name">По названию</option>
      <option value="price">По цене (дорогие)</option>
      <option value="-price">По цене (дешевые)</option>
    </select>

    <div class="relative">
      <img src="/search.svg" class="absolute left-3 top-3" />
      <input
        type="text"
        class="border rounded-md pl-10 px-4 py-2 pr-4 outline-none focus:border-gray-400"
        placeholder="Поиск..."
      />
    </div>
  </div>
</template>
