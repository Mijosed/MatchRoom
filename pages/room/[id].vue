<script setup>
const route = useRoute();
const router = useRouter();
const { rooms, loading, fetchRoomsByHotel } = useRoom();

// Récupérer l'ID de l'URL et s'assurer qu'il est valide
const hotelId = computed(() => {
  const id = route.params.id;
  if (!id) {
    console.error("ID d'hôtel manquant");
    return null;
  }
  return id;
});

// Charger les chambres uniquement si l'ID est valide
onMounted(async () => {
  if (hotelId.value) {
    await fetchRoomsByHotel(hotelId.value);
  }
});

const goToRoomDetails = (roomId) => {
  router.push(`/room/${hotelId.value}/${roomId}`);
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Chambres disponibles</h1>
    
    <div v-if="!hotelId" class="text-center">
      <p class="text-red-500">ID d'hôtel invalide</p>
    </div>

    <div v-else-if="loading" class="text-center">
      <p class="text-gray-500">Chargement des chambres...</p>
    </div>

    <div v-else-if="rooms.length === 0" class="text-center">
      <p class="text-gray-500">Aucune chambre disponible pour le moment.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="room in rooms" :key="room.id" class="bg-white rounded-lg shadow-md p-6">
        <div class="relative mb-4">
          <img 
            :src="room.photo || '/images/room-placeholder.jpg'" 
            :alt="room.name"
            class="w-full h-48 object-cover rounded-lg"
          />
        </div>

        <div class="mb-4">
          <h3 class="text-xl font-semibold mb-2">{{ room.name || 'Chambre Standard' }}</h3>
          <p class="text-gray-600">{{ room.price }}€ <span class="text-sm">/nuit</span></p>
        </div>

        <div class="flex justify-between items-center">
          <button 
            @click="goToRoomDetails(room.id)"
            class="bg-[#457891] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Voir les détails
          </button>
        </div>
      </div>
    </div>
  </div>
</template> 