<script setup>
const props = defineProps({
  hotel: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['remove'])

const isFavorite = ref(true)

const toggleFavorite = () => {
  isFavorite.value = false
  // Émettre un événement pour informer le parent de supprimer cette carte
  emit('remove', props.hotel.id)
}
</script>

<template>
  <div class="bg-blanc rounded-xl shadow hover:shadow-md transition overflow-hidden relative">
    <!-- Image + coeur -->
    <div class="relative">
      <img
        :src="hotel.photo"
        :alt="hotel.name"
        class="w-full h-48 object-cover"
      />
      <button
        @click.stop="toggleFavorite"
        class="absolute top-2 right-2 p-1 rounded-full text-bleu hover:scale-110 transition"
      >
        <Icon
          name="mdi:heart"
          class="w-6 h-6"
        />
      </button>
    </div>

    <!-- Contenu -->
    <div class="p-4 space-y-1">
      <div class="text-sm text-noir">{{ hotel.address }}</div>
      <h3 class="text-lg font-semibold truncate text-noir">{{ hotel.name }}</h3>

      <!-- Ligne prix + bouton -->
      <div class="flex items-center justify-between text-sm text-noir mt-1">
        <span>
          À partir de <span class="font-bold text-orange">100 €</span> / nuit
        </span>
        <NuxtLink
          :to="`/hotels/${hotel.id}`"
          class="text-sm bg-bleu text-white px-3 py-1 rounded-full hover:bg-opacity-90 transition"
        >
          Négocier
        </NuxtLink>
      </div>
    </div>
  </div>
</template> 