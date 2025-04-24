<script setup>
import CurrentReservation from '~/components/reservations/CurrentReservation.vue'
import PastReservationsSlider from '~/components/reservations/PastReservationsSlider.vue'
definePageMeta({ layout: 'default' })

const currentReservation = ref({
  hotel: "Hôtel du Lac",
  city: "Annecy",
  from: "27/04/2025",
  to: "30/04/2025",
  guests: 2,
  image: "https://picsum.photos/id/1036/400/200"
})

const pastReservations = ref([
  {
    id: 1,
    title: "Le Faubourg Paris",
    date: "Fév. 2025",
    image: "https://picsum.photos/id/1011/400/200"
  },
  {
    id: 2,
    title: "Chalet Mont-Blanc",
    date: "Déc. 2024",
    image: "https://picsum.photos/id/1015/400/200"
  }
])
</script>

<template>
  <section class="p-4 space-y-6">
    <h1 class="text-xl font-semibold">Mes réservations en cours</h1>

    <div v-if="currentReservation">
      <CurrentReservation :reservation="currentReservation" />
    </div>
    <div v-else>
      <p class="text-gray-600">Aucune réservation en cours.</p>
    </div>

    <div v-if="pastReservations.length > 0">
      <PastReservationsSlider :items="pastReservations" />
    </div>
  </section>
</template>
