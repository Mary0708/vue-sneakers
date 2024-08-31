<template>
  <div class="flex gap-4">
    <select class="py-2 px-3 border rounded-md outline-none">
      <option>По названию</option>
      <option>По цене (дорогие)</option>
      <option>По цене (дешевые)</option>
    </select>

    <div class="relative">
      <img src="/search.svg" class="absolute left-3 top-3" />
      <input
        type="text"
        class="border rounded-md pl-10 px-4 py-2 pr-4 outline-none focus:border-gray-400"
        placeholder="Поиск..."
      />
    </div>
  </div>
</template>
