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
  <NuxtLink
    :to="`/hotels/${hotel.id}`"
    class="block bg-blanc rounded-xl shadow hover:shadow-md transition overflow-hidden relative"
  >
    <!-- Image + Coeur -->
    <div class="relative">
      <img
        :src="hotel.photo"
        :alt="hotel.name"
        class="w-full h-48 object-cover"
      />
      <button
        @click.stop.prevent="toggleFavorite"
        class="absolute top-2 right-2 p-1 rounded-full text-bleu bg-white bg-opacity-80 hover:bg-opacity-100 transition"
      >
        <Icon
          :name="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'"
          class="w-6 h-6"
        />
      </button>
    </div>

    <!-- Infos hôtel -->
    <div class="p-4 space-y-1">
      <div class="text-sm text-noir">{{ hotel.address }}</div>
      <h3 class="text-lg font-semibold truncate text-noir">{{ hotel.name }}</h3>
    </div>
  </NuxtLink>
</template>
