<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  hotel: {
    type: Object,
    required: true
  }
})


const goToNegotiation = () => {
  router.push(`/room/${props.hotel.id}`);
};
</script>

<template>
  <div class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
    <div class="relative">
      <img 
        :src="hotel.photo || '/images/hotel-placeholder.jpg'" 
        :alt="hotel.name"
        class="w-full h-48 object-cover rounded-t-lg"
      />
      <button class="absolute top-4 right-4 text-white hover:scale-110 transition-transform">
        <Icon name="mdi:heart-outline" class="w-6 h-6"/>
      </button>
    </div>

    <div class="p-4 bg-[#457891] rounded-b-lg text-white">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-lg font-semibold text-white">{{ hotel.name }}</h3>
          <p class="text-sm text-white opacity-90">{{ hotel.address }}</p>
        </div>
        <div class="text-right">
          <p class="font-semibold text-white">{{ hotel.price || '250€' }}/nuit</p>
          <p class="text-sm text-white opacity-90">{{ hotel.total || '1000€ total' }}</p>
        </div>
      </div>

      <div class="flex justify-between items-center">
        <div v-if="hotel.tags && hotel.tags.length > 0" class="flex flex-wrap gap-2">
          <span 
            v-for="tag in hotel.tags" 
            :key="tag"
            class="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs text-white"
          >
            {{ tag }}
          </span>
        </div>
        <button 
          @click="goToNegotiation"
          class="px-4 py-2 bg-white text-[#457891] rounded-lg font-medium hover:bg-opacity-90 transition-colors"
        >
          Afficher les chambres
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hotel-card {
  transition: transform 0.2s ease-in-out;
}

.hotel-card:hover {
  transform: translateY(-2px);
}
</style>
