<template>
  <section class="px-4 py-16 bg-blanc">
    <h2 class="text-2xl font-bold text-center text-bleu mb-10">Le concept Match Room</h2>

    <div class="overflow-x-auto no-scrollbar">
      <div class="flex gap-6 min-w-[640px]">
        <div
          v-for="(step, i) in steps"
          :key="i"
          class="min-w-[250px] bg-white p-6 rounded-xl shadow flex flex-col items-center text-center space-y-4"
        >
          <Icon :name="step.icon" class="text-bleu w-10 h-10" />
          <h3 class="font-semibold text-lg text-noir">{{ step.title }}</h3>
          <p class="text-sm text-gray-600">{{ step.text }}</p>
        </div>
      </div>
    </div>

    <!-- Slogan -->
    <p class="text-center text-bleu font-medium mt-12 text-lg max-w-xl mx-auto">
      “Une nouvelle façon de réserver : <strong class="text-orange">plus simple, plus humaine, plus juste</strong>.”
    </p>
  </section>
</template>

<script setup>
const steps = [
  {
    icon: 'mdi:search',
    title: 'Recherchez un hôtel',
    text: 'Trouvez rapidement l’hébergement qui vous correspond.'
  },
  {
    icon: 'mdi:chat-outline',
    title: 'Faites une proposition',
    text: 'Glissez le curseur et proposez un prix qui vous semble juste.'
  },
  {
    icon: 'mdi:check-decagram',
    title: 'Recevez une réponse',
    text: 'C’est instantané : vous êtes accepté ou invité à ajuster.'
  },
  {
    icon: 'mdi:bed',
    title: 'Réservez si ça match',
    text: 'Si c’est ok, vous finalisez la réservation. Simple et rapide.'
  }
]
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.text-orange {
  color: #EE890C;
}
</style>
