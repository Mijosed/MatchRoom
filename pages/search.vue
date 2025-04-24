<template>
  <div class="container mx-auto p-4">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">Résultats de recherche</h1>
      <div class="text-gray-600">
        {{ searchSummary }}
      </div>
    </div>

    <!-- Filtres et résultats -->
    <div class="grid grid-cols-12 gap-6">
      <!-- Filtres -->
      <div class="col-span-3 space-y-4">
        <!-- Ajouter vos filtres ici -->
      </div>

      <!-- Résultats -->
      <div class="col-span-9">
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
        
        <div v-else class="grid gap-4">
          <p class="text-gray-600 mb-4">
            {{ results.length }} hôtel{{ results.length > 1 ? 's' : '' }} trouvé{{ results.length > 1 ? 's' : '' }}
          </p>
          <HotelCard 
            v-for="hotel in results" 
            :key="hotel.id" 
            :hotel="hotel"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HotelCard from '~/components/common/HotelCard.vue'

const route = useRoute()
const router = useRouter()
const { search } = useSearch()

const loading = ref(true)
const results = ref([])

// Récupérer les paramètres de l'URL
const city = route.query.city?.split(',')[0] ?? ''
const region = route.query.startDate?.split(',')[1] ?? ''

const searchParams = {
  city: city,
  region: region,
  startDate: route.query.startDate,
  endDate: route.query.endDate,
  flexibility: Number(route.query.flexibility),
  adults: Number(route.query.adults),
  children: Number(route.query.children),
  babies: Number(route.query.babies),
  pets: Number(route.query.pets)
}

// Formater le résumé de recherche
const searchSummary = computed(() => {
  if (!searchParams.city) return ''
  
  const dates = searchParams.startDate && searchParams.endDate
    ? `du ${new Date(searchParams.startDate).toLocaleDateString()} au ${new Date(searchParams.endDate).toLocaleDateString()}`
    : ''
    
  const travelers = [
    searchParams.adults && `${searchParams.adults} adulte${searchParams.adults > 1 ? 's' : ''}`,
    searchParams.children && `${searchParams.children} enfant${searchParams.children > 1 ? 's' : ''}`,
    searchParams.babies && `${searchParams.babies} bébé${searchParams.babies > 1 ? 's' : ''}`,
    searchParams.pets && `${searchParams.pets} animal${searchParams.pets > 1 ? 'aux' : ''}`
  ].filter(Boolean).join(', ')

  return [city,region, dates, travelers].filter(Boolean).join(' - ')
})

// Fonction pour réinitialiser la recherche
const resetSearch = () => {
  router.push('/')
}

// Charger les résultats au montage
onMounted(async () => {
  try {
    if (!searchParams.city) {
      results.value = []
      return
    }
    
    console.log('Appel API avec params:', searchParams)
    results.value = await search(searchParams)
    console.log('Résultats reçus:', results.value)
  } catch (error) {
    console.error('Erreur lors de la recherche:', error)
    results.value = []
  } finally {
    loading.value = false
  }
})
</script>