<script setup>
const user = {
  firstName: 'Nom',
  lastName: 'Prénom',
  level: 'Voyageur amateur'
}
</script>

<template>
  <div class="flex flex-col items-center space-y-2">
    <div class="relative w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
      <Icon name="mdi:account" class="w-16 h-16 text-gray-600" />
      <button
        class="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow hover:bg-gray-100 transition"
        title="Modifier le profil"
      >
        <Icon name="mdi:pencil" class="w-4 h-4 text-gray-600" />
      </button>
    </div>

    <div class="text-sm text-gray-500">{{ user.level }}</div>
    <div class="text-xl font-bold text-center">
      {{ user.firstName }}<br />{{ user.lastName }}
    </div>
  </div>
</template>
