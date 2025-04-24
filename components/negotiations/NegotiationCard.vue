<template>
  <div
    class="border rounded-xl overflow-hidden shadow-sm relative transition-all"
    :class="{
      'bg-gray-100 opacity-60': offer.status === 'Perdues'
    }"
  >
    <!-- Barre gauche dynamique -->
    <div
      class="absolute left-0 top-6 w-1 h-4 rounded-r"
      :class="{
        'bg-orange-400': offer.status === 'En cours',
        'bg-blue-500': offer.status === 'Validée',
        'bg-gray-400': offer.status === 'Perdues'
      }"
    ></div>

    <div class="flex">
      <img
        :src="offer.image"
        alt=""
        class="w-24 h-24 object-cover"
        :class="{ 'grayscale opacity-70': offer.status === 'Perdues' }"
      />
      <div class="p-3 flex-1 space-y-1">
        <h3 class="text-sm font-semibold">{{ offer.title }}</h3>
        <div class="text-xs text-gray-500 flex items-center gap-2">
          <Icon name="mdi:map-marker" class="w-4 h-4" /> {{ offer.city }}
        </div>
        <div class="text-xs text-gray-500 flex items-center gap-2">
          <Icon name="mdi:calendar" class="w-4 h-4" /> {{ offer.date }}
        </div>
        <div class="text-xs text-gray-500 flex items-center gap-2">
          <Icon name="mdi:account-group" class="w-4 h-4" /> {{ offer.people }} personnes
        </div>
      </div>
      <div class="pr-3 pt-2">
        <span class="bg-gray-200 px-2 py-1 rounded text-xs font-semibold">{{ offer.price }}</span>
      </div>
    </div>

    <!-- Bandeau selon statut -->
    <div
      class="text-white text-center text-xs py-1 font-medium"
      :class="{
        'bg-orange-500': offer.status === 'En cours',
        'bg-blue-500': offer.status === 'Validée',
        'bg-gray-500': offer.status === 'Perdues'
      }"
    >
      {{ offer.urgency }}
    </div>
  </div>
</template>


<script setup>
defineProps({
  offer: Object
})
</script>
