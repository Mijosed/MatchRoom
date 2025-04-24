<script setup>
import NavBarMobile from '~/components/common/NavBarMobile.vue'
import SearchBar from '~/components/common/SearchBar.vue'

</script>

<template>
  <div class="min-h-screen pb-20 bg-white">
    <div class="max-w-6xl mx-auto w-full px-4 mt-4">
      <SearchBar />
    </div>
    <main class="px-4 pt-4">
      <slot />
    </main>

    <!-- Navigation mobile fixée en bas -->
    <NavBarMobile class="fixed bottom-0 left-0 right-0 z-50" />
  </div>
</template>
