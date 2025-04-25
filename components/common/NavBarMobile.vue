<template>
  <nav class="bg-white border-t flex justify-around items-center h-16 shadow-inner">
    <NuxtLink to="/offers" class="flex flex-col items-center text-bleu text-sm">
      <Icon name="mdi:compass-outline" class="w-6 h-6" />
      Explorer
    </NuxtLink>
    <NuxtLink to="/favorites" class="flex flex-col items-center text-bleu text-sm">
      <Icon name="mdi:heart-outline" class="w-6 h-6" />
      Favoris
    </NuxtLink>
    <NuxtLink to="/negotiations" class="flex flex-col items-center text-bleu text-sm">
      <Icon name="mdi:handshake-outline" class="w-6 h-6" />
      Négo
    </NuxtLink>
    <NuxtLink to="/bookings" class="flex flex-col items-center text-bleu text-sm">
      <Icon name="mdi:calendar-check-outline" class="w-6 h-6" />
      Réservations
    </NuxtLink>
    <NuxtLink to="/account" class="flex flex-col items-center text-bleu text-sm">
      <Icon name="mdi:account" class="w-6 h-6" />
      Compte
    </NuxtLink>
  </nav>
</template>
