<script setup>
const props = defineProps({
  hotel: {
    type: Object,
    required: true
  }
})


</script>

<template>
  <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div class="flex flex-col md:flex-row">
      <div class="w-full md:w-1/3 h-64 md:h-auto relative">
        <img 
          :src="hotel.photo || '/images/hotel-placeholder.jpg'" 
          :alt="hotel.name"
          class="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
        />
        <button class="absolute top-4 right-4 text-white hover:scale-110 transition-transform">
          <Icon name="mdi:heart-outline" class="w-6 h-6"/>
        </button>
      </div>

      <div class="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div class="mb-4">
            <h3 class="text-xl font-semibold mb-2">{{ hotel.name }}</h3>
            <p class="text-gray-600 text-sm">{{ hotel.address }}</p>
          </div>

          <p class="text-gray-700 mb-4">{{ hotel.description }}</p>

          <div v-if="hotel.tags && hotel.tags.length > 0" class="flex flex-wrap gap-2 mb-4">
            <span 
              v-for="tag in hotel.tags" 
              :key="tag"
              class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <div class="flex items-end justify-between mt-4">
          <div>
            <p class="text-sm text-gray-500">À partir de</p>
            <p class="text-sm text-gray-500">par nuit</p>
          </div>
          <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            négocier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
