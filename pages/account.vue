<script setup>
definePageMeta({ layout: 'default' })
import AccountHeader from '~/components/account/AccountHeader.vue'
import AccountProfile from '~/components/account/AccountProfile.vue'
import AccountBadges from '~/components/account/AccountBadges.vue'
</script>

<template>
  <section class="p-4 space-y-6">
    <AccountHeader />
    <AccountProfile />
    <AccountBadges />
  </section>
</template>
