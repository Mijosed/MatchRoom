<script setup>
import HotelCard from '~/components/common/HotelCard.vue'
const { hotels } = useHotels()
</script>

<template>
  <section class="p-4 space-y-6">
    <OfferCard />

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <HotelCard
        v-for="hotel in hotels"
        :key="hotel.id"
        :hotel="hotel"
      />
    </div>
  </section>
</template>
