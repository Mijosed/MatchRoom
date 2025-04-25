<script setup>
const trends = [
  {
    id: 1,
    title: "Hôtel Machin",
    price: 250,
    image: "https://picsum.photos/id/1018/400/300"
  },
  {
    id: 2,
    title: "Hôtel Machin",
    price: 250,
    image: "https://picsum.photos/id/1011/400/300"
  },
  {
    id: 3,
    title: "Hôtel Machin",
    price: 250,
    image: "https://picsum.photos/id/1025/400/300"
  },
  {
    id: 4,
    title: "Hôtel Machin",
    price: 250,
    image: "https://picsum.photos/id/1031/400/300"
  },
  {
    id: 5,
    title: "Hôtel Machin",
    price: 250,
    image: "https://picsum.photos/id/1040/400/300"
  },
  {
    id: 6,
    title: "Hôtel Machin",
    price: 250,
    image: "https://picsum.photos/id/1050/400/300",
  },
  
]
const isFavorite = ref({})

</script>

<template>
  <section class="px-4">
    <h2 class="text-bleu font-semibold mb-4">Tendances actuelles</h2>

    <div class="overflow-x-auto no-scrollbar">
      <div
        class="grid grid-flow-col auto-cols-[minmax(280px,1fr)] grid-rows-2 gap-4 min-w-[640px]"
      >
        <div
          v-for="(trend, index) in trends"
          :key="index"
          class="flex rounded-xl overflow-hidden bg-blanc shadow"
        >
          <img
            :src="trend.image"
            alt="hotel"
            class="w-1/3 h-28 object-cover"
          />
          <div
            class="bg-bleu w-2/3 px-4 py-3 text-blanc flex justify-between items-center"
          >
            <div>
              <div class="font-semibold">{{ trend.title }}</div>
              <div class="text-sm mt-1">{{ trend.price }}€/nuit</div>
            </div>
            <button
              @click="isFavorite[trend.id] = !isFavorite[trend.id]"
              class="text-white"
            >
              <Icon
                :name="isFavorite[trend.id] ? 'mdi:heart' : 'mdi:heart-outline'"
                class="w-6 h-6"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
