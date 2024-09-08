<script setup>
import Card from './card.vue'

defineProps({
  items: Array,
  isFavorites: Boolean
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
  <div class="grid gap-5" :class="{ 'grid-cols-2 sm:grid-cols-4': items.length > 1 }">
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :isFavorite="item.isFavorite"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :isAdded="item.isAdded"
      :onClickFavorite="isFavorites ? null : () => emit('addToFavorite', item)"
      :onClickAdd="isFavorites ? null : () => emit('addToCart', item)"
    />
  </div>
</template>
