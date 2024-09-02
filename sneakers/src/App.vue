<script setup>
import { onMounted, ref, watch, reactive, provide, computed, inject } from 'vue'
import axios from 'axios'

import HeaderComponent from './components/header-component.vue'
import Popup from './components/popup.vue'
import { v4 as uuidv4 } from 'uuid'

const cart = ref([])

const popupOpen = ref(false)

const userId = ref(null)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

const closePopup = () => {
  popupOpen.value = false
}

const openPopup = () => {
  popupOpen.value = true
}

const filters = reactive({
  searchQuery: '',
  sortBy: 'title'
})

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}
const removeToCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },

  { deep: true }
)

provide('cart', {
  cart,
  closePopup,
  openPopup,
  addToCart,
  removeToCart
})
</script>

<template>
  <div>
    <Popup v-if="popupOpen" :total-price="totalPrice" />
    <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
      <HeaderComponent :total-price="totalPrice" @open-popup="openPopup" />

      <div class="p-10">
        <RouterView />
      </div>
    </div>
  </div>
</template>
