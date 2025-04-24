<template>
  <div class="p-4 max-w-xl mx-auto">
    <div class="flex flex-col gap-4">
      <input 
        v-model="query"
        type="text"
        class="border border-gray-300 rounded w-full p-2"
        placeholder="Ex : Hôtel avec spa à Nice"
        @keyup.enter="handleSearch"
      />
      
      <button 
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        @click="handleSearch"
        :disabled="loading"
      >
        {{ loading ? 'Recherche en cours...' : 'Rechercher' }}
      </button>

      <div v-if="loading" class="text-gray-500">
        Chargement...
      </div>
      
      <ul v-else class="space-y-4">
        <li 
          v-for="hotel in results" 
          :key="hotel.id" 
          class="p-4 border rounded-lg hover:bg-gray-50"
        >
          <h3 class="font-semibold text-lg">{{ hotel.name }}</h3>
          <p class="text-gray-600">{{ hotel.ville }}</p>
          <p class="text-sm text-gray-500 mt-1">
            {{ hotel.equipements.join(' • ') }}
          </p>
        </li>
        
        <li 
          v-if="results.length === 0" 
          class="text-gray-500 text-center p-4"
        >
          Aucun résultat trouvé
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useSearch } from '@/composables/useSearch'

const { query, results, loading, search } = useSearch()

const handleSearch = () => {
  if (!query.value?.trim()) return
  search()
}
</script>