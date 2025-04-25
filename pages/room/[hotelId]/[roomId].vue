<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRoom } from '@/composables/useRoom';

const route = useRoute();
const { room, loading, fetchRoomDetails } = useRoom();
const currentPhotoIndex = ref(0);

const nextPhoto = () => {
  if (room.value && room.value.photos) {
    currentPhotoIndex.value = (currentPhotoIndex.value + 1) % room.value.photos.length;
  }
};

const prevPhoto = () => {
  if (room.value && room.value.photos) {
    currentPhotoIndex.value = currentPhotoIndex.value === 0 
      ? room.value.photos.length - 1 
      : currentPhotoIndex.value - 1;
  }
};

const goToPhoto = (index) => {
  currentPhotoIndex.value = index;
};

const hotelId = computed(() => route.params.hotelId);
const roomId = computed(() => route.params.roomId);

onMounted(async () => {
  if (hotelId.value && roomId.value) {
    await fetchRoomDetails(hotelId.value, roomId.value);
  }
});
</script>

<template>
  <div class="">
    <div v-if="loading" class="text-center">
      <p class="text-gray-500">Chargement des détails...</p>
    </div>

    <div v-else-if="!room" class="text-center">
      <p class="text-red-500">Chambre non trouvée</p>
    </div>

    <div v-else class="bg-white shadow-lg overflow-hidden">
      <div class="relative">
        <!-- Carousel principal -->
        <div class="relative h-96">
          <img 
            v-for="(photo, index) in room.photos" 
            :key="index"
            :src="photo"
            :alt="`Photo ${index + 1} de la chambre`"
            class="absolute w-full h-full object-cover transition-opacity duration-300"
            :class="{ 'opacity-0': currentPhotoIndex !== index }"
          />
          
          <!-- Boutons de navigation -->
          <button 
            v-if="currentPhotoIndex > 0"
            @click="prevPhoto"
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
          >
            <Icon name="mdi:chevron-left" class="w-6 h-6"/>
          </button>
          
          <button 
            v-if="room.photos && currentPhotoIndex < room.photos.length - 1"
            @click="nextPhoto"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
          >
            <Icon name="mdi:chevron-right" class="w-6 h-6"/>
          </button>
        </div>

        <!-- Miniatures -->
        <div v-if="room.photos && room.photos.length > 1" class="absolute bottom-4 left-0 right-0">
          <div class="flex justify-center gap-2 px-4">
            <button 
              v-for="(photo, index) in room.photos" 
              :key="index"
              @click="goToPhoto(index)"
              class="w-2 h-2 rounded-full transition-all"
              :class="currentPhotoIndex === index ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75'"
            />
          </div>
        </div>
      </div>

      <div class="p-8">
        <h1 class="text-3xl font-bold mb-4">{{ room.name }}</h1>
        
        <div class="bg-[#457891] text-white p-6 rounded-lg mb-6">
          <p class="text-lg leading-relaxed">{{ room.description }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 class="text-xl font-semibold mb-4">Caractéristiques</h2>
            <div class="flex flex-wrap gap-3">
              <span 
                v-for="feature in (room.features || [])" 
                :key="feature"
                class="px-4 py-2 bg-gray-100 rounded-full text-gray-700"
              >
                {{ feature }}
              </span>
            </div>
          </div>

          <div>
            <h2 class="text-xl font-semibold mb-4">Tarifs</h2>
            <div class="bg-gray-50 p-6 rounded-lg">
              <p class="text-2xl font-bold text-[#457891]">
                {{ room.price }}€ <span class="text-base font-normal text-gray-600">/ nuit</span>
              </p>
              <p class="mt-2 text-gray-600">{{ room.priceDetails }}</p>
            </div>
          </div>
        </div>

        <button 
          class="w-full bg-[#457891] text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
        >
          Réserver cette chambre
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel-enter-active,
.carousel-leave-active {
  transition: opacity 0.3s ease;
}

.carousel-enter-from,
.carousel-leave-to {
  opacity: 0;
}

</style> 