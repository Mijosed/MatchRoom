<script setup>
import HotelCard from '~/components/common/HotelCard.vue'
import UnlockOffer from '~/components/common/UnlockOffer.vue'
import SeasonRecommendations from '~/components/common/SeasonRecommendations.vue'
import Footer from '~/components/common/Footer.vue'
import CurrentTrends from '~/components/common/CurrentTrends.vue'
import NearbyEvents from '~/components/common/NearbyEvents.vue'

const { hotels, loadInitialHotels } = useHotels()

// Charger les hôtels au montage du composant
onMounted(() => {
  loadInitialHotels()
})
</script>

<template>
  <UnlockOffer />

  <section class="p-4 space-y-6">
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
