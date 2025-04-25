<template>
  <div>
    <h2 class="text-lg font-semibold mb-2">Badges</h2>
    <div class="flex justify-around flex-wrap gap-4">
      <div
        v-for="(badge, i) in badges"
        :key="i"
        class="flex flex-col items-center space-y-1 text-center"
      >
        <img :src="badge.svg" class="w-12 h-12" :alt="badge.label" />
        <span class="text-xs">{{ badge.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const badges = [
    { svg: '/badges/badge_adventure.svg', label: 'Aventure' },
    { svg: '/badges/badge_continent.svg', label: 'Continent' },
    { svg: '/badges/badge_amateur.svg', label: 'Amateur' },
    { svg: '/badges/badge_avis.svg', label: 'Avis' },
    { svg: '/badges/badge_courrier.svg', label: 'Courrier' },
    { svg: '/badges/badge_negociateur.svg', label: 'Negociateur' },
    { svg: '/badges/badge_photo.svg', label: 'Photo' },
    { svg: '/badges/badge_solo.svg', label: 'Solo' },
    { svg: '/badges/badge_pays.svg', label: 'Pays' },
]
</script>
