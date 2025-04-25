<script setup>
defineProps({ items: Array })
</script>

<template>
  <div class="space-y-2">
    <h2 class="text-base font-semibold">Réservations passées</h2>
    <div class="overflow-x-auto no-scrollbar">
      <div class="flex gap-4 pb-2">
        <div
          v-for="item in items"
          :key="item.id"
          class="min-w-[220px] bg-white shadow rounded-lg overflow-hidden"
        >
          <img :src="item.image" class="w-full h-32 object-cover" />
          <div class="p-2">
            <h3 class="text-sm font-semibold truncate">{{ item.title }}</h3>
            <p class="text-xs text-gray-500">{{ item.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
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
