<script setup>
import { useWindowSize } from '@vueuse/core'
import DesktopLayout from '~/components/layout/DesktopLayout.vue'
import MobileLayout from '~/components/layout/MobileLayout.vue'

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)
</script>

<template>
  <component :is="isMobile ? MobileLayout : DesktopLayout">
    <NuxtPage />
  </component>
</template>
