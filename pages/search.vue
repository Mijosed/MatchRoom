<template>
  <div class="container mx-auto p-4">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">Résultats de recherche</h1>
      <div class="text-gray-600">
        {{ searchSummary }}
      </div>
    </div>


      <div class="w-full">
        <div v-if="loading" class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p class="mt-2 text-gray-600">Chargement des résultats...</p>
        </div>
        
        <div v-else-if="!results?.length" class="text-center py-12">
          <Icon name="mdi:alert-circle-outline" class="w-12 h-12 text-gray-400 mx-auto mb-4"/>
          <h2 class="text-xl font-semibold text-gray-700 mb-2">
            Aucun hôtel disponible
          </h2>
          <p class="text-gray-600 mb-6">
            Aucun hôtel ne correspond à vos critères de recherche.
          </p>
          <button 
            @click="resetSearch"
            class="text-blue-600 hover:text-blue-700 font-medium"
          >
            Modifier la recherche
          </button>
        </div>
        
        <div v-else class="grid gap-6">
          <p class="text-gray-600 mb-4">
            {{ results.length }} hôtel{{ results.length > 1 ? 's' : '' }} trouvé{{ results.length > 1 ? 's' : '' }}
          </p>
          <ResultCardHotel 
            v-for="hotel in results" 
            :key="hotel.id" 
            :hotel="hotel"
          />
        </div>
      </div>
  </div>
</template>

<script setup>
import ResultCardHotel from '~/components/common/resultCardHotel.vue'

const route = useRoute()
const router = useRouter()
const { search } = useSearch()

const loading = ref(true)
const results = ref([])

// Fonction pour charger les résultats
const loadResults = async () => {
  loading.value = true
  try {
    // Extraire la ville de l'URL
    const city = route.query.city?.split(',')[0] ?? ''
    
    if (!city) {
      results.value = []
      return
    }

    const searchParams = {
      city,
      startDate: route.query.startDate,
      endDate: route.query.endDate,
      flexibility: Number(route.query.flexibility),
      adults: Number(route.query.adults),
      children: Number(route.query.children),
      babies: Number(route.query.babies),
      pets: Number(route.query.pets)
    }
    
    results.value = await search(searchParams)
  } catch (error) {
    console.error('Erreur lors de la recherche:', error)
    results.value = []
  } finally {
    loading.value = false
  }
}

// Formater le résumé de recherche
const searchSummary = computed(() => {
  const city = route.query.city?.split(',')[0] ?? ''
  if (!city) return ''
  
  const dates = route.query.startDate && route.query.endDate
    ? `du ${new Date(route.query.startDate).toLocaleDateString()} au ${new Date(route.query.endDate).toLocaleDateString()}`
    : ''
    
  const travelers = [
    Number(route.query.adults) > 0 && `${route.query.adults} adulte${Number(route.query.adults) > 1 ? 's' : ''}`,
    Number(route.query.children) > 0 && `${route.query.children} enfant${Number(route.query.children) > 1 ? 's' : ''}`,
    Number(route.query.babies) > 0 && `${route.query.babies} bébé${Number(route.query.babies) > 1 ? 's' : ''}`,
    Number(route.query.pets) > 0 && `${route.query.pets} animal${Number(route.query.pets) > 1 ? 'aux' : ''}`
  ].filter(Boolean).join(', ')

  return [city, dates, travelers].filter(Boolean).join(' - ')
})

// Fonction pour réinitialiser la recherche
const resetSearch = () => {
  router.push('/')
}

// Surveiller les changements de route
watch(
  () => route.fullPath,
  () => loadResults()
)

// Charger les résultats au montage
onMounted(() => {
  loadResults()
})
</script>