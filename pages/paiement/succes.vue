<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center p-8">
    <Icon name="mdi:check-circle-outline" class="text-green-500 w-16 h-16 mb-4" />
    <h1 class="text-2xl font-bold text-green-700 mb-2">Paiement réussi</h1>
    <p class="text-gray-700 mb-4">Merci pour votre réservation. Un e-mail de confirmation vous a été envoyé.</p>
    <NuxtLink to="/" class="text-blue-600 hover:underline">Retour à l'accueil</NuxtLink>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'

const route = useRoute()

onMounted(() => {
  const sessionId = route.query.session_id
  if (sessionId) {
    // Vous pouvez utiliser sessionId pour vérifier ou enregistrer la transaction
    console.log('Session Stripe ID:', sessionId)
  }
})
</script>
