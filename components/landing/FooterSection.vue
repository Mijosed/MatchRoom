<template>
  <footer class="bg-[#F1F1F1] text-[#333333] px-6 py-10">
    <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
      <!-- Menu -->
      <div>
        <h3 class="font-semibold text-[#457891] mb-2">Menu</h3>
        <ul class="space-y-1">
          <li><NuxtLink to="/contact" class="hover:underline">Contact</NuxtLink></li>
          <li><NuxtLink to="/mentions-legales" class="hover:underline">Mentions légales</NuxtLink></li>
          <li><NuxtLink to="/cgv" class="hover:underline">Conditions générales</NuxtLink></li>
        </ul>
      </div>

      <!-- Réseaux -->
      <div>
        <h3 class="font-semibold text-[#457891] mb-2">Réseaux</h3>
        <div class="flex gap-4">
          <a href="#" target="_blank" aria-label="LinkedIn">
            <Icon name="mdi:linkedin" class="w-6 h-6 text-[#457891] hover:text-[#EE890C]" />
          </a>
          <a href="#" target="_blank" aria-label="Instagram">
            <Icon name="mdi:instagram" class="w-6 h-6 text-[#457891] hover:text-[#EE890C]" />
          </a>
          <a href="#" target="_blank" aria-label="TikTok">
            <Icon name="mdi:tiktok" class="w-6 h-6 text-[#457891] hover:text-[#EE890C]" />
          </a>
        </div>
      </div>

      <!-- Mention -->
      <div class="md:text-right">
        <p class="text-sm text-gray-700 leading-relaxed">
          Match Room – <br />
          <span class="italic">la plateforme de réservation intelligente.</span>
        </p>
      </div>
    </div>

    <!-- Copyright -->
    <div class="mt-10 text-center text-xs text-gray-500">
      &copy; {{ new Date().getFullYear() }} Match Room. Tous droits réservés.
    </div>
  </footer>
</template>
