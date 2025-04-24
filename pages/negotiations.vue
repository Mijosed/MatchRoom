<script setup>
definePageMeta({ layout: 'default' })
const selectedTab = ref('En cours')
import NegotiationTabs from '~/components/negotiations/NegotiationTabs.vue'
import NegotiationList from '~/components/negotiations/NegotiationList.vue'

</script>

<template>
  <section class="p-4 space-y-6">
    <h1 class="text-xl font-semibold">Mes négociations</h1>

    <NegotiationTabs v-model="selectedTab" />
    <p class="text-gray-600">Ne tardez pas, confirmer ces offres avant qu'elles n'expirent.</p>
    <NegotiationList :status="selectedTab" />
  </section>
</template>
