<script setup>
import { computed, provide, inject } from 'vue'
import CartItem from './cart-items.vue'
import CartListItem from './cart-list-item.vue'
import PopupBasket from './popup-basket.vue'
import Info from './info.vue'
import { ref } from 'vue'
import axios from 'axios'

const isCreateOrder = ref(false)
const orderId = ref(null)
const storedToken = localStorage.getItem('token')

const props = defineProps({
  totalPrice: Number
})

const { cart, closePopup } = inject('cart')

const tax = (totalPrice) => Math.round(totalPrice * 0.05)

const createOrder = async () => {
  try {
    isCreateOrder.value = true

    const { data } = await axios.post('https://7a1bc2bfcd9321a6.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice.value,
      user_token: storedToken
    })

    cart.value = []
    orderId.value = data.id

    return data
  } catch (error) {
    console.log(error)
  } finally {
    isCreateOrder.value = false
  }
}

const buttonDisabled = computed(() => isCreateOrder.value || cart.value.length === 0)
</script>

<template>
  <div>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
    <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
      <Popup-basket />

      <div v-if="totalPrice === 0 || orderId" class="flex items-center h-full">
        <Info
          v-if="totalPrice === 0 && !orderId"
          title="Корзина пустая "
          description="Пожалуйста, добавьте хотя бы одну пару кроссовок"
          imageUrl="/package-icon.png"
        />
        <Info
          v-if="orderId"
          title="Заказ оформлен! "
          :description="`Ваш заказ № ${orderId} успешно оформлен, мы свяжемся с вами в ближайшее время`"
          imageUrl="/order-success-icon.png"
        />
      </div>

      <div v-else>
        <CartListItem />

        <div class="flex flex-col gap-3 mb-6 mt-7">
          <div class="flex gap-2">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ totalPrice }} руб.</b>
          </div>

          <div class="flex gap-2">
            <span>Налог 5%:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ tax(totalPrice) }} руб.</b>
          </div>

          <button
            @click="createOrder"
            :disabled="buttonDisabled"
            class="mt-4 bg-teal-500 w-full rounded-xl py-3 text-white hover:bg-teal-600 transition active:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
