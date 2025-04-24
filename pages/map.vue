<template>
  <div class="flex h-screen">
    <!-- Panneau de recherche -->
    <div class="w-1/3 p-4 overflow-y-auto">
      <div class="mb-4">
        <input 
          v-model="query"
          type="text"
          class="border border-gray-300 rounded w-full p-2"
          placeholder="Ex : Hôtel avec spa à Nice"
          @keyup.enter="handleSearch"
        />
        
        <button 
          class="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          @click="handleSearch"
          :disabled="loading"
        >
          {{ loading ? 'Recherche en cours...' : 'Rechercher' }}
        </button>
      </div>

      <div class="mt-4">
        <ul class="space-y-4">
          <li 
            v-for="hotel in results" 
            :key="hotel.id"
            class="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
            @click="centerMap(hotel.location)"
          >
            <h3 class="font-semibold text-lg">{{ hotel.name }}</h3>
            <p class="text-gray-600">{{ hotel.location.address }}</p>
            <p class="text-sm text-gray-500 mt-1">
              {{ hotel.equipements.join(' • ') }}
            </p>
          </li>
        </ul>
      </div>
    </div>

    <!-- Carte -->
    <div class="w-2/3">
      <ClientOnly>
        <l-map
          ref="map"
          v-model="zoom"
          v-model:zoom="zoom"
          :center="center"
          :use-global-leaflet="false"
          class="h-full w-full"
        >
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          />
          
          <l-marker
            v-for="hotel in results"
            :key="hotel.id"
            :lat-lng="[hotel.location.lat, hotel.location.lng]"
            @click="selectHotel(hotel)"
          >
            <l-popup>
              <div class="p-2">
                <h3 class="font-semibold">{{ hotel.name }}</h3>
                <p class="text-sm">{{ hotel.location.address }}</p>
              </div>
            </l-popup>
          </l-marker>
        </l-map>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSearch } from '@/composables/useSearch'

const { query, results, loading, search } = useSearch()

const map = ref(null)
const zoom = ref(13)
const center = ref([43.7032932, 7.2658348]) // Centre par défaut sur Nice

const handleSearch = () => {
  if (!query.value?.trim()) return
  search()
}

const centerMap = (location) => {
  center.value = [location.lat, location.lng]
  zoom.value = 15
}

const selectHotel = (hotel) => {
  centerMap(hotel.location)
}
</script>

<style>
/* Assurez-vous d'avoir les styles Leaflet */
@import 'leaflet/dist/leaflet.css';
</style>
