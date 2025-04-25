<script setup>
import HotelCard from '~/components/common/HotelCard.vue'
import UnlockOffer from '~/components/common/UnlockOffer.vue'
import SeasonRecommendations from '~/components/common/SeasonRecommendations.vue'
import Footer from '~/components/common/Footer.vue'
import CurrentTrends from '~/components/common/CurrentTrends.vue'
import NearbyEvents from '~/components/common/NearbyEvents.vue'
import SearchBar from '~/components/common/SearchBar.vue'
const { hotels, loadInitialHotels } = useHotels()

// Charger les hôtels lors de l'initialisation de la page
onMounted(() => {
  loadInitialHotels()
})
</script>

<template>
<!-- Barre de recherche -->
    <div class="max-w-6xl mx-auto w-full px-4 mt-4 mb-4">
      <SearchBar />
    </div>
      <UnlockOffer />

  <section class="p-4 space-y-6">
    <h2 class="text-2xl font-bold text-bleu">Les hotels à proximité</h2>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <HotelCard
        v-for="hotel in hotels"
        :key="hotel.id"
        :hotel="hotel"
      />
    </div>
  </section>

  <SeasonRecommendations />
  <CurrentTrends />
  <NearbyEvents />
  <Footer />
</template>
