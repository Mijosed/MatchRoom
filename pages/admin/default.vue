<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
</script>

<template>
  <slot />
</template> 