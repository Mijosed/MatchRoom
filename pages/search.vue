<template>
  <div class="relative">
    <!-- Map avec overlay -->
    <div class="relative h-[400px]">
      <Map 
        v-if="results.length > 0"
        :city="city"
        :hotels="results"
        class="w-full h-full"
      />
      
      <div class="absolute top-4 left-4 right-4 z-10">
        <div class="bg-white rounded-full shadow-lg p-2 flex items-center gap-4 flex-wrap">
          <div class="flex-1 flex items-center gap-2 px-4">
            <span class="font-medium">{{ city }}</span>
            <span class="text-gray-400">|</span>
            <span class="text-gray-600">
              {{ formatDateRange(route.query.startDate, route.query.endDate) }}
            </span>
            <span class="text-gray-400">|</span>
            <div class="flex items-center gap-1 text-gray-600">
              <span>{{ formatTravelers() }}</span>
              <Icon name="mdi:account-group" class="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      
    </div>

    
    <div class="container mx-auto px-4 py-6">
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
      
      <div v-else>
        <p class="text-gray-600 mb-6">
          {{ results.length }} hôtel{{ results.length > 1 ? 's' : '' }} trouvé{{ results.length > 1 ? 's' : '' }}
        </p>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResultCardHotel 
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
import ResultCardHotel from '~/components/common/resultCardHotel.vue'
import Map from '~/components/common/Map.vue'

const route = useRoute()
const router = useRouter()
const { search } = useSearch()

const loading = ref(true)
const results = ref([])

const formatDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return ''
  const start = new Date(startDate)
  const end = new Date(endDate)
  return `${start.getDate()} avr. - ${end.getDate()} avr.`
}

const formatTravelers = () => {
  const total = Number(route.query.adults) + Number(route.query.children) + Number(route.query.babies)
  return `${total}`
}

const loadResults = async () => {
  loading.value = true
  try {
    const city = route.query.city?.split(',')[0] ?? ''
    
    if (!city) {
      results.value = []
      return
    }

    const searchParams = {
      city,
      startDate: route.query.startDate,
      endDate: route.query.endDate,
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

const resetSearch = () => {
  router.push('/')
}

watch(
  () => route.fullPath,
  () => loadResults()
)

onMounted(() => {
  loadResults()
})

const city = computed(() => route.query.city?.split(',')[0].trim() ?? '')
</script>

<style scoped>
.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>