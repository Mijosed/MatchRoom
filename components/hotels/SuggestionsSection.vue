<script setup>
const suggestions = [
  {
    image: 'https://picsum.photos/id/1011/300/200',
    title: 'Chambre basic',
    details: 'Vue extérieur - douche - insonorisation - climatisation'
  },
  {
    image: 'https://picsum.photos/id/1012/300/200',
    title: 'Chambre supérieur',
    details: 'Vue jardin - baignoire - insonorisation - climatisation'
  },
  {
    image: 'https://picsum.photos/id/1013/300/200',
    title: 'Chambre luxe',
    details: 'Vue jardin - baignoire - insonorisation - climatisation'
  }
]
</script>

<template>
  <section class="px-4 py-8">
    <h2 class="text-xl font-semibold text-bleu mb-6">Suggestions personnalisées</h2>

    <div class="space-y-4">
      <div
        v-for="(room, i) in suggestions"
        :key="i"
        class="flex items-center bg-gray-100 rounded-xl overflow-hidden shadow-sm"
      >
        <!-- Image -->
        <img
          :src="room.image"
          alt=""
          class="w-24 h-24 object-cover sm:w-32 sm:h-24"
        />
        <!-- Texte -->
        <div class="p-4">
          <h3 class="font-semibold text-[#333333] text-sm sm:text-base mb-1">{{ room.title }}</h3>
          <p class="text-xs sm:text-sm text-gray-700 leading-snug">{{ room.details }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
