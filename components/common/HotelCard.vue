<script setup>
const props = defineProps({
  hotel: {
    type: Object,
    required: true
  }
})


const isFavorite = ref(false)

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}
</script>

<template>
  <div class="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden relative">
    <!-- Image + coeur -->
    <div class="relative">
      <img
        :src="hotel.photo"
        :alt="hotel.name"
        class="w-full h-48 object-cover"
      />
      <button
        @click.stop="toggleFavorite"
        class="absolute top-2 right-2 p-1 text-white hover:scale-110 transition transform"
      >
        <Icon
          :name="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'"
          class="w-6 h-6"
        />
      </button>
    </div>

    <!-- Contenu -->
    <div class="p-4 space-y-2">
      <div class="text-sm text-gray-500">{{ hotel.address }}</div>
      <h3 class="text-lg font-semibold truncate">{{ hotel.name }}</h3>

      <!-- Ajout des tags avec vérification -->
      <div v-if="hotel.tags && hotel.tags.length > 0" class="flex flex-wrap gap-1">
        <span 
          v-for="tag in hotel.tags" 
          :key="tag"
          class="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600"
        >
          {{ tag }}
        </span>
      </div>

      <div class="flex items-center justify-between text-sm text-gray-700 mt-1">
        <span>
          À partir de <span class="font-bold">00€</span> / nuit
        </span>
        <NuxtLink
          :to="`/hotels/${hotel.id}`"
          class="text-sm bg-indigo-600 text-white px-3 py-1 rounded-full hover:bg-indigo-700 transition"
        >
          Négocier
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
