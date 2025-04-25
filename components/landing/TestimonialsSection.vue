<template>
  <section class="bg-[#F1F1F1] px-4 py-16">
    <h2 class="text-2xl font-bold text-center text-[#457891] mb-10">Ils nous font confiance</h2>

    <!-- Score global + badge -->
    <div class="flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
      <div class="text-center">
        <p class="text-3xl font-bold text-orange">4.8/5</p>
        <p class="text-sm text-gray-600">Note moyenne sur 230 avis</p>
      </div>
      <div class="flex items-center gap-2">
        <Icon name="mdi:flag" class="text-[#457891] w-6 h-6" />
        <span class="text-sm text-[#457891] font-medium">Made in France 🇫🇷</span>
      </div>
    </div>

    <!-- Témoignages -->
    <div class="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
      <div
        v-for="(testimonial, i) in testimonials"
        :key="i"
        class="bg-white rounded-xl shadow p-6 flex flex-col justify-between"
      >
        <p class="text-sm text-gray-700 italic">"{{ testimonial.comment }}"</p>
        <div class="mt-4">
          <p class="text-sm font-semibold text-[#457891]">{{ testimonial.name }}</p>
          <p class="text-xs text-gray-500">{{ testimonial.role }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    name: 'Sarah L.',
    role: 'Voyageuse régulière',
    comment: "J’ai pu négocier un 4 étoiles à -20%. L’expérience est vraiment fluide !"
  },
  {
    name: 'Jean-Marc B.',
    role: 'Directeur d’hôtel à Lyon',
    comment: "Enfin une plateforme qui respecte notre politique tarifaire et notre image."
  },
  {
    name: 'Théo G.',
    role: 'Digital nomad',
    comment: "Simple, efficace et plus humain que Booking. J’adore l’idée !"
  }
]
</script>

<style scoped>
.text-orange {
  color: #EE890C;
}
</style>
