<script setup>
import Catalog from '@/components/catalog.vue'
import axios from 'axios'
import { inject, reactive, watch, ref, onMounted, provide } from 'vue'
import debounce from 'lodash.debounce'

const { cart, addToCart, removeToCart } = inject('cart')
const items = ref([])

const filters = reactive({
  searchQuery: '',
  sortBy: 'title'
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}
const onChangeInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 300)

const onClickToCart = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeToCart(item)
  }
}

const addToFavorite = async (item) => {
  if (item.isProcess) {
    return
  }

  try {
    item.isProcess = true

    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
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

    items.value = items.value.map((item) => {
      const favorite = favorites.find((fav) => fav.item_id === item.id)

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

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://7a1bc2bfcd9321a6.mokky.dev/items`, {
      params
    })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (err) {
    console.log(err)
  }
}

watch(filters, fetchItems)

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

provide('items', items)
</script>

<template>
  <div>
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
      <Catalog :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickToCart" />
    </div>
  </div>
</template>
