<script setup>
import CartItem from './cart-items.vue'
import CartListItem from './cart-list-item.vue'
import PopupBasket from './popup-basket.vue'
</script>

<template>
  <div>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
    <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
      <Popup-basket />
      <CartListItem />

      <div class="flex flex-col gap-3 mb-6 mt-7">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>12900</b>
        </div>

        <div class="flex gap-2">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>900</b>
        </div>

        <button
          disabled=""
          class="mt-4 bg-teal-500 w-full rounded-xl py-3 text-white hover:bg-teal-600 transition active:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>
