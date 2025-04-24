<template>
  <section class="px-4 py-16 bg-[#F1F1F1]">
    <h2 class="text-2xl font-bold text-[#457891] mb-8 text-center">Hôtels en vedette</h2>

    <div class="overflow-x-auto no-scrollbar">
      <div class="flex gap-6 min-w-[640px] pb-2">
        <div
          v-for="hotel in hotels"
          :key="hotel.id"
          class="min-w-[280px] bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden"
        >
          <!-- Image -->
          <div class="relative">
            <img :src="hotel.image" class="w-full h-40 object-cover" />
            <!-- Ville + bouton Maps -->
            <div class="absolute top-2 left-2 bg-white bg-opacity-80 rounded-full px-3 py-1 text-sm text-[#457891] font-semibold shadow">
              {{ hotel.city }}
            </div>
            <button
              @click="showMap(hotel)"
              class="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100"
            >
              <Icon name="mdi:map-marker-outline" class="text-[#457891] w-5 h-5" />
            </button>
          </div>

          <!-- Infos -->
          <div class="p-4 space-y-2">
            <div class="text-lg font-bold text-[#333]">{{ hotel.name }}</div>
            <div class="text-sm text-gray-600 line-through">{{ hotel.originalPrice }}€</div>
            <div class="text-sm text-[#EE890C] font-semibold">{{ hotel.offerPrice }}€ / nuit</div>

            <!-- Équipements -->
            <div class="flex gap-3 mt-2 text-[#457891]">
              <Icon v-for="(icon, i) in hotel.amenities" :key="i" :name="icon" class="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Popover ou corner map -->
    <div v-if="selectedHotel" class="fixed bottom-6 right-6 z-50 bg-white p-4 shadow-xl rounded-lg max-w-sm">
      <div class="flex justify-between items-center mb-2">
        <p class="font-semibold text-[#457891]">Localisation - {{ selectedHotel.city }}</p>
        <button @click="selectedHotel = null" class="text-gray-500 hover:text-black">
          <Icon name="mdi:close" class="w-5 h-5" />
        </button>
      </div>
      <iframe
        :src="selectedHotel.mapUrl"
        width="100%"
        height="200"
        style="border:0;"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        class="rounded-md"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const selectedHotel = ref(null)

const showMap = (hotel) => {
  selectedHotel.value = hotel
}

const hotels = [
  {
    id: 1,
    name: "Hôtel du Lac",
    city: "Annecy",
    image: "https://picsum.photos/id/1011/400/300",
    originalPrice: 180,
    offerPrice: 139,
    amenities: ["mdi:wifi", "mdi:pool", "mdi:food-fork-drink"],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2769.8877..."
  },
  {
    id: 2,
    name: "Château Provence",
    city: "Avignon",
    image: "https://picsum.photos/id/1025/400/300",
    originalPrice: 220,
    offerPrice: 170,
    amenities: ["mdi:parking", "mdi:spa-outline", "mdi:wifi"],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2769.8877..."
  },
  {
    id: 3,
    name: "Hôtel de la Mer",
    city: "Nice",
    image: "https://picsum.photos/id/1036/400/300",
    originalPrice: 250,
    offerPrice: 199,
    amenities: ["mdi:beach", "mdi:wifi", "mdi:pool"],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2769.8877..."
  },
  {
    id: 4,
    name: "Palais des Congrès",
    city: "Paris",
    image: "https://picsum.photos/id/1015/400/300",
    originalPrice: 300,
    offerPrice: 249,
    amenities: ["mdi:wifi", "mdi:food-fork-drink", "mdi:ski"],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2769.8877..."
  },
  {
    id: 5,
    name: "Hôtel des Alpes",
    city: "Chamonix",
    image: "https://picsum.photos/id/1016/400/300",
    originalPrice: 280,
    offerPrice: 230,
    amenities: ["mdi:ski", "mdi:wifi", "mdi:pool"],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2769.8877..."
  },
  {
    id: 6,
    name: "Hôtel de la Plage",
    city: "Biarritz",
    image: "https://picsum.photos/id/1018/400/300",
    originalPrice: 260,
    offerPrice: 210,
    amenities: ["mdi:beach", "mdi:wifi", "mdi:pool"],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2769.8877..."
  },
  {
    id: 7,
    name: "Hôtel de la Ville",
    city: "Lyon",
    image: "https://picsum.photos/id/1020/400/300",
    originalPrice: 240,
    offerPrice: 190,
    amenities: ["mdi:wifi", "mdi:food-fork-drink", "mdi:ski"],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2769.8877..."
  },
  {
    id: 8,
    name: "Hôtel du Parc",
    city: "Strasbourg",
    image: "https://picsum.photos/id/1022/400/300",
    originalPrice: 230,
    offerPrice: 180,
    amenities: ["mdi:wifi", "mdi:pool", "mdi:ski"],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2769.8877..."
  }
]
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
