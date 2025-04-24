<template>
  <footer class="bg-gray-100 text-gray-700 py-8 mt-12 border-t">
    <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
      <!-- Logo & description -->
      <div>
        <img src="/logo.png" alt="Logo" class="w-16 h-16">
        <p>Découvrez les meilleures offres d'hôtels selon la saison, vos envies et votre localisation.</p>
      </div>

      <!-- Liens utiles -->
      <div>
        <h4 class="font-semibold mb-2">Navigation</h4>
        <ul class="space-y-1">
          <li><NuxtLink to="/" class="hover:underline">Accueil</NuxtLink></li>
          <li><NuxtLink to="/favorites" class="hover:underline">Favoris</NuxtLink></li>
          <li><NuxtLink to="/negotiations" class="hover:underline">Négociations</NuxtLink></li>
          <li><NuxtLink to="/bookings" class="hover:underline">Réservations</NuxtLink></li>
          <li><NuxtLink to="/account" class="hover:underline">Mon compte</NuxtLink></li>
        </ul>
      </div>

      <!-- Réseaux sociaux -->
      <div>
        <h4 class="font-semibold mb-2">Suivez-nous</h4>
        <div class="flex gap-4 text-gray-500">
          <Icon name="mdi:facebook" class="w-5 h-5 hover:text-bleu cursor-pointer" />
          <Icon name="mdi:twitter" class="w-5 h-5 hover:text-bleu cursor-pointer" />
          <Icon name="mdi:instagram" class="w-5 h-5 hover:text-bleu cursor-pointer" />
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="text-center text-xs text-gray-500 mt-8">
      © {{ new Date().getFullYear() }} MatchRoom. Tous droits réservés.
    </div>
  </footer>
</template>
