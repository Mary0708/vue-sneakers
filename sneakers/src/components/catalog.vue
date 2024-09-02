<script setup>
import Card from './card.vue'

defineProps({
  items: Array,
  isFavorites: Boolean
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
  <div v-auto-animate class="grid grid-cols-2 gap-5">
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
