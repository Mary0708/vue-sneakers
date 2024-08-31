<script setup>
import { onMounted, ref, watch, reactive, provide } from 'vue'
import axios from 'axios'

import HeaderComponent from './components/header-component.vue'
import Card from './components/card.vue'
import Catalog from './components/catalog.vue'
import Popup from './components/popup.vue'
import Sort from './components/sort.vue'

const catalog = ref([])
const cart = ref([])

const popupOpen = ref(false)

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

const onClickToCart = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeToCart(item)
  }

  console.log(cart.value)
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}
const onChangeInput = (event) => {
  filters.searchQuery = event.target.value
}

const addToFavorite = async (item) => {
  if (item.isProcess) {
    return
  }

  try {
    item.isProcess = true
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id
      }
      item.isFavorite = true
      const { data } = await axios.post(`https://7a1bc2bfcd9321a6.mokky.dev/favorites`, obj)

      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://7a1bc2bfcd9321a6.mokky.dev/favorites/${item.favoriteId}`)

      item.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  } finally {
    item.isProcess = false
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://7a1bc2bfcd9321a6.mokky.dev/favorites`)

    catalog.value = catalog.value.map((item) => {
      const favorite = favorites.find((fav) => fav.parentId === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const fetchCatalog = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://7a1bc2bfcd9321a6.mokky.dev/catalog`, {
      params
    })
    catalog.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchCatalog()
  await fetchFavorites()
})

watch(filters, fetchCatalog)

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
    <Popup v-if="popupOpen" />
    <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
      <HeaderComponent @open-popup="openPopup" />

      <div class="p-10">
        <div class="flex justify-between items-center">
          <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

          <div class="flex gap-4">
            <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
              <option value="name">По названию</option>
              <option value="-price">По цене (дорогие)</option>
              <option value="price">По цене (дешевые)</option>
            </select>

            <div class="relative">
              <img src="/search.svg" class="absolute left-3 top-3" />
              <input
                @input="onChangeInput"
                type="text"
                class="border rounded-md pl-10 px-4 py-2 pr-4 outline-none focus:border-gray-400"
                placeholder="Поиск..."
              />
            </div>
          </div>
        </div>
        <div class="mt-10">
          <Catalog
            :catalog="catalog"
            @add-to-favorite="addToFavorite"
            @add-to-cart="onClickToCart"
          />
        </div>
      </div>
    </div>
  </div>
</template>
