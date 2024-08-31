<script setup>
import Card from './card.vue'

defineProps({
  catalog: Array
})

const onClick = () => {
  console.log('click')
}
</script>

<template>
  <div class="grid grid-cols-2 gap-5">
    <Card
      v-for="item in catalog"
      :key="item.id"
      :is-favorite="false"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :is-added="true"
      :onclick="onClick"
    />
  </div>
</template>
