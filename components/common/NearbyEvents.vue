<script setup>
const events = [
  {
    title: "Marché local - Aix-en-Provence",
    description: "Dégustez des produits artisanaux dans une ambiance typiquement provençale.",
    image: "https://picsum.photos/id/1043/400/300"
  },
  {
    title: "Festival de Jazz - Lyon",
    description: "Concerts en plein air, food trucks et artistes internationaux.",
    image: "https://picsum.photos/id/1049/400/300"
  },
  {
    title: "Rando nocturne - Chamonix",
    description: "Partez à l'aventure sous les étoiles avec un guide de montagne.",
    image: "https://picsum.photos/id/1052/400/300"
  },
  {
    title: "Village de Noël - Strasbourg",
    description: "Ambiance féérique avec vin chaud, guirlandes et produits locaux.",
    image: "https://picsum.photos/id/1062/400/300"
  }
]
</script>

<template>
  <section class="px-4">
    <h2 class="text-bleu font-semibold mb-4">Événements à proximité</h2>

    <div class="overflow-x-auto no-scrollbar">
      <div class="flex gap-4 pb-2">
        <div
          v-for="(event, index) in events"
          :key="index"
          class="min-w-[300px] sm:min-w-[350px] relative h-48 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
        >
          <img
            :src="event.image"
            :alt="event.title"
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black bg-opacity-50" />

          <div class="relative z-10 h-full w-full flex flex-col justify-end p-4 text-white">
            <h3 class="text-base font-semibold mb-1">{{ event.title }}</h3>
            <p class="text-xs text-gray-200 line-clamp-2">{{ event.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
