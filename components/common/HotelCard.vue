<script setup>
defineProps({
  hotel: {
    type: Object,
    required: true
  }
})

const isFavorite = ref(false)

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  // Tu pourras connecter à Supabase ou localStorage ici
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
      <!-- Icône cœur sans fond -->
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

    <div class="p-4 space-y-1">
      <div class="text-sm text-gray-500">{{ hotel.address }}</div>
      <h3 class="text-lg font-semibold truncate">{{ hotel.name }}</h3>
      <div class="text-sm text-gray-700">
        À partir de <span class="font-bold">00€</span> / nuit
      </div>
    </div>
  </div>
</template>
