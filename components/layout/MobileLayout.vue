<script setup>
import NavBarMobile from '~/components/common/NavBarMobile.vue'
import SearchBar from '~/components/common/SearchBar.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isRoomDetailsPage = computed(() => route.path.includes('/room/'))
</script>

<template>
  <div class="min-h-screen pb-20 bg-white">
    <main :class="{ 'px-4 pt-4': !isRoomDetailsPage }">
      <slot />
    </main>

    <!-- Navigation mobile fixée en bas -->
    <NavBarMobile class="fixed bottom-0 left-0 right-0 z-50" />
  </div>
</template>
