<script setup>
defineProps({ reservation: Object })
</script>

<template>
  <div class="rounded-xl overflow-hidden shadow border">
    <img :src="reservation.image" class="w-full h-48 object-cover" />
    <div class="p-4 space-y-1">
      <h2 class="text-lg font-semibold">{{ reservation.hotel }}</h2>
      <p class="text-sm text-gray-500">{{ reservation.city }}</p>
      <p class="text-sm">📅 {{ reservation.from }} → {{ reservation.to }}</p>
      <p class="text-sm">👥 {{ reservation.guests }} personnes</p>
    </div>
  </div>
</template>
