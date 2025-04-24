<script setup>
defineProps({
  hotel: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden">
    <img
      :src="hotel.photo"
      :alt="hotel.name"
      class="w-full h-48 object-cover"
    />

    <div class="p-4 space-y-1">
      <div class="text-sm text-gray-500">{{ hotel.address }}</div>
      <h3 class="text-lg font-semibold truncate">{{ hotel.name }}</h3>
      <div class="text-sm text-gray-700">À partir de <span class="font-bold">00€</span> / nuit</div>
    </div>
  </div>
</template>
