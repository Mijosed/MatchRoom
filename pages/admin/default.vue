<script setup>
// Cette configuration sera héritée par toutes les pages sous /admin
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
</script>

<template>
  <slot />
</template> 