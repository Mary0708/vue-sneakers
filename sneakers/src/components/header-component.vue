<script setup>
defineProps({
  totalPrice: Number
})

const emit = defineEmits(['openPopup'])
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <RouterLink to="/main">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Sneakers</h2>
          <P class="text-slate-400">Крутые кроссовки</P>
        </div>
      </div>
    </RouterLink>
    <ul class="flex items-center gap-10">
      <li
        @click="() => emit('openPopup')"
        class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} руб.</b>
      </li>

      <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
        <img src="/heart.svg" alt="Cart" />
        <RouterLink to="/favorites">Закладки</RouterLink>
      </li>

      <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
        <img src="/profile.svg" alt="Cart" />
        <RouterLink to="/account">Профиль</RouterLink>
      </li>
    </ul>
  </header>
</template>
