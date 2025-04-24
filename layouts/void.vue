<script setup >
    import NavBarDesktop from '@/components/common/NavBarDesktop.vue'
    import NavBarMobile from '@/components/common/NavBarMobile.vue'
    import { useWindowSize } from '@vueuse/core'

    const { width } = useWindowSize()
    const isMobile = computed(() => width.value < 768)
</script>
<template>
    
      <NavBarDesktop v-if="!isMobile" />
    <slot />
    <NavBarMobile v-if="isMobile" />
</template>
