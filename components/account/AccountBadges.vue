<template>
  <div>
    <h2 class="text-lg font-semibold mb-2">Badges</h2>
    <div class="flex justify-around flex-wrap gap-4">
      <div
        v-for="(badge, i) in badges"
        :key="i"
        class="flex flex-col items-center space-y-1 text-center"
      >
        <Icon :name="badge.icon" class="w-8 h-8 text-black" />
        <span class="text-xs">{{ badge.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const badges = [
    { icon: 'mdi:star-check', label: '5 réservations' },
    { icon: 'mdi:calendar-clock', label: 'Plus de 1 semaine' },
    { icon: 'mdi:flag', label: 'France' },
    { icon: 'mdi:airplane', label: 'International' },
    { icon: 'mdi:shield-check', label: 'Vérifié' },
    { icon: 'mdi:account-star', label: 'Super hôte' },
    { icon: 'mdi:home-heart', label: 'Hôte d\'exception' },
    { icon: 'mdi:star-outline', label: 'Nouveau' },
]
</script>
