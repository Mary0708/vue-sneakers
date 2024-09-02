<script setup>
import { inject } from 'vue'
import CartItems from './cart-items.vue'

const { cart, removeToCart } = inject('cart')
</script>

<template>
  <div class="flex flex-col gap-4 flex-1 justify-between" v-auto-animate>
    <CartItems
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :image-url="item.imageUrl"
      @on-click-remove="() => removeToCart(item)"
    />
  </div>
</template>
