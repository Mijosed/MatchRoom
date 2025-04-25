<script setup>
import NavBarDesktop from '~/components/common/NavBarDesktop.vue'
import OfferCard from '~/components/common/OfferCard.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <NavBarDesktop />

    <main class="max-w-6xl mx-auto w-full px-4 mt-6 space-y-6">
      <slot />
    </main>
  </div>
</template>
