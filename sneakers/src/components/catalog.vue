<script setup>
import Card from './card.vue'

defineProps({
  catalog: Array
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
  <div class="grid grid-cols-2 gap-5">
    <Card
      v-for="item in catalog"
      :key="item.id"
      :id="item.id"
      :isFavorite="item.isFavorite"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :isAdded="item.isAdded"
      :onClickFavorite="() => emit('addToFavorite', item)"
      :onClickAdd="() => emit('addToCart', item)"
    />
  </div>
</template>
