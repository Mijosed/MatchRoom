<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center p-8">
    <Icon name="mdi:alert-circle-outline" class="text-red-500 w-16 h-16 mb-4" />
    <h1 class="text-2xl font-bold text-red-700 mb-2">Paiement annulé</h1>
    <p class="text-gray-700 mb-4">Votre paiement n'a pas été finalisé. Vous pouvez réessayer à tout moment.</p>
    <NuxtLink to="/" class="text-blue-600 hover:underline">Retour à l'accueil</NuxtLink>
  </div>
</template>
