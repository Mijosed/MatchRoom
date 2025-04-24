<script setup>
import { ref } from 'vue'

const scrollContainer = ref(null)

const scroll = (direction) => {
  const el = scrollContainer.value
  const scrollAmount = 200
  if (el) {
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }
}

const recommendations = [
  { season: 'Été', icon: 'mdi:beach', label: 'Plage' },
  { season: 'Été', icon: 'mdi:pool', label: 'Piscine' },
  { season: 'Été', icon: 'mdi:city-variant-outline', label: 'Rooftop' },

  { season: 'Printemps', icon: 'mdi:flower', label: 'Jardin' },
  { season: 'Printemps', icon: 'mdi:nature', label: 'Nature' },
  { season: 'Printemps', icon: 'mdi:hiking', label: 'Randonnée' },

  { season: 'Automne', icon: 'mdi:pine-tree', label: 'Forêt' },
  { season: 'Automne', icon: 'mdi:cabin-a-frame', label: 'Cabane' },

  { season: 'Hiver', icon: 'mdi:snowflake', label: 'Ski' },
  { season: 'Hiver', icon: 'mdi:home-fire', label: 'Chalet' },
  { season: 'Hiver', icon: 'mdi:spa-outline', label: 'Thermes' }
]
</script>

<template>
  <section class="px-4 relative">
    <h2 class="text-xl font-semibold mb-4">Recommandations par saison</h2>

    <!-- Flèches -->
    <button
      @click="scroll('left')"
      class="hidden md:flex absolute left-0 top-[50%] -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
    >
      <Icon name="mdi:chevron-left" class="w-6 h-6" />
    </button>

    <div ref="scrollContainer" class="overflow-x-auto no-scrollbar">
      <div class="flex gap-4 px-8">
        <div
          v-for="(item, index) in recommendations"
          :key="index"
          class="min-w-[100px] bg-white rounded-xl shadow text-center px-4 py-3 flex flex-col items-center justify-center hover:shadow-md transition"
        >
          <Icon :name="item.icon" class="text-black w-8 h-8 mb-2" />
          <div class="text-sm text-gray-700">{{ item.label }}</div>
          <div class="text-xs text-gray-400 italic">{{ item.season }}</div>
        </div>
      </div>
    </div>

    <button
      @click="scroll('right')"
      class="hidden md:flex absolute right-0 top-[50%] -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
    >
      <Icon name="mdi:chevron-right" class="w-6 h-6" />
    </button>
  </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
