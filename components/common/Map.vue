<script setup>
import 'leaflet/dist/leaflet.css'
import { onMounted, watch } from 'vue'

const props = defineProps({
  city: {
    type: String,
    required: true
  },
  hotels: {
    type: Array,
    default: () => []
  }
})

const CITY_COORDINATES = {
  'nice': { lat: 43.7102, lng: 7.2620, zoom: 13 },
  'paris': { lat: 48.8566, lng: 2.3522, zoom: 12 },
  'lyon': { lat: 45.7578, lng: 4.8320, zoom: 13 },
  'toulouse': { lat: 43.6047, lng: 1.4442, zoom: 13 }
}

let map = null
let markers = []

const initMap = () => {
  if (process.client) {
    const L = window.L
    const cityName = props.city.toLowerCase()
    const coords = CITY_COORDINATES[cityName] || { lat: 46.603354, lng: 1.888334, zoom: 6 }

    if (map) {
      map.remove()
    }

    map = L.map('map').setView([coords.lat, coords.lng], coords.zoom)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)

    markers.forEach(marker => marker.remove())
    markers = []

    props.hotels.forEach((hotel) => {
      if (!hotel.location?.lat || !hotel.location?.lng) return

      const lat = typeof hotel.location.lat === 'string' ? parseFloat(hotel.location.lat) : hotel.location.lat
      const lng = typeof hotel.location.lng === 'string' ? parseFloat(hotel.location.lng) : hotel.location.lng

      if (Number.isFinite(lat) && Number.isFinite(lng)) {
        try {
          const marker = L.marker([lat, lng])
            .bindPopup(`
              <div class="p-2">
                <h3 class="font-semibold">${hotel.name}</h3>
                <p class="text-sm text-gray-600">${hotel.adresse}</p>
                <p class="text-sm font-bold text-blue-600 mt-1">${hotel.prix}€ / nuit</p>
              </div>
            `)
            .addTo(map)
          
          markers.push(marker)
        } catch (error) {
          console.error(`Erreur lors de la création du marqueur pour ${hotel.name}:`, error)
        }
      }
    })
  }
}

onMounted(() => {
  initMap()
})

watch([() => props.city, () => props.hotels], () => {
  initMap()
})
</script>

<template>
  <div id="map" class="w-full h-[300px] rounded-lg shadow-md mb-6 relative z-0"></div>
</template>

<style>
/* S'assurer que tous les éléments de Leaflet héritent du z-index */
.leaflet-pane,
.leaflet-tile,
.leaflet-marker-icon,
.leaflet-marker-shadow,
.leaflet-tile-container,
.leaflet-pane > svg,
.leaflet-pane > canvas,
.leaflet-zoom-box,
.leaflet-image-layer,
.leaflet-layer {
  z-index: 1 !important;
}

.leaflet-container {
  z-index: 0 !important;
}

.leaflet-control {
  z-index: 2 !important;
}

.leaflet-popup {
  z-index: 3 !important;
}
</style> 