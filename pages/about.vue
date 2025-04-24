<script setup>
const { $supabase } = useNuxtApp()
const instruments = ref([])

const getInstruments = async () => {
  try {
    const { data, error } = await $supabase.from('hotel').select()
    
    if (error) {
      console.error('Erreur lors de la récupération des données:', error)
      return
    }
    
    instruments.value = data
  } catch (error) {
    console.error('Erreur inattendue:', error)
  }
}

onMounted(() => {
  getInstruments()
})
</script>

<template>
  <ul class="list-disc pl-6 space-y-2">
    <li 
      v-for="instrument in instruments" 
      :key="instrument.id"
      class="text-gray-800"
    >
      {{ instrument.name }}
    </li>
  </ul>
</template>