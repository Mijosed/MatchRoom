<script setup>
const trends = [
  {
    id: 1,
    title: "Séjour romantique en cabane",
    description: "Cabane tout confort au cœur d'une forêt. Idéal pour un weekend automnal.",
    image: "https://picsum.photos/id/1018/400/300"
  },
  {
    id: 2,
    title: "Chalet en montagne",
    description: "Vue panoramique, cheminée, jacuzzi. Une vraie pause hivernale.",
    image: "https://picsum.photos/id/1011/400/300"
  },
  {
    id: 3,
    title: "Spa & Thermes naturels",
    description: "Relaxation garantie dans un centre thermal en plein air.",
    image: "https://picsum.photos/id/1025/400/300"
  },
  {
    id: 4,
    title: "Hôtel en bord de mer",
    description: "Profitez du soleil et du sable chaud dans cet hôtel vue mer.",
    image: "https://picsum.photos/id/1036/400/300"
  }
]
</script>

<template>
  <section class="px-4">
    <h2 class="text-xl font-semibold mb-4">Tendances actuelles</h2>

    <div class="overflow-x-auto no-scrollbar">
      <div class="flex gap-4 pb-2">
        <div
          v-for="(trend, index) in trends"
          :key="index"
          class="min-w-[320px] sm:min-w-[400px] flex bg-white rounded-xl shadow overflow-hidden hover:shadow-md transition"
        >
          <img
            :src="trend.image"
            :alt="trend.title"
            class="w-32 sm:w-40 h-full object-cover"
          />
          <div class="p-4 flex flex-col justify-between flex-1">
            <div>
              <h3 class="font-semibold text-base mb-2">{{ trend.title }}</h3>
              <p class="text-sm text-gray-600 line-clamp-3">{{ trend.description }}</p>
            </div>
            <NuxtLink
              :to="`/hotels/${trend.id}`"
              class="mt-3 inline-block text-sm bg-indigo-600 text-white px-4 py-1 rounded-full shadow hover:bg-indigo-700 transition"
            >
              Négocier
            </NuxtLink>
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
