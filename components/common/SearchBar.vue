<template>
  <div class="relative">
    <div 
      class="bg-white rounded-full shadow-sm px-4 py-2 flex items-center gap-2 cursor-pointer"
      @click="openModal"
    >
      <Icon name="mdi:magnify" class="w-5 h-5 text-gray-500" />
      <input
        readonly
        type="text"
        placeholder="Rechercher un hôtel, une ville…"
        class="w-full outline-none bg-transparent text-sm cursor-pointer"
      />
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50" @click="closeModal"></div>

      <div class="relative min-h-screen flex items-center justify-center p-4 z-50">
        <div class="relative bg-white rounded-lg w-full max-w-2xl p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">
              {{ 
                currentStep === 'search' ? 'Rechercher' : 
                currentStep === 'calendar' ? 'Dates du séjour' : 
                'Voyageurs'
              }}
            </h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-500">×</button>
          </div>

          <div v-if="currentStep === 'search'">
            <div class="mb-6">
              <div class="flex items-center gap-2 border border-gray-300 rounded-lg p-3">
                <Icon name="mdi:magnify" class="w-5 h-5 text-gray-500" />
                <input 
                  v-model="searchQuery"
                  type="text"
                  class="w-full outline-none"
                  placeholder="Rechercher une ville..."
                  @keyup.enter="handleSearch"
                  @input="handleInput"
                  @keydown.down.prevent="navigateSuggestion(1)"
                  @keydown.up.prevent="navigateSuggestion(-1)"
                  @keydown.enter="selectSuggestion(selectedIndex)"
                  ref="searchInput"
                />
              </div>

              <div v-if="recentSearches.length > 0" class="mt-2">
                <div class="text-sm text-gray-500 mb-2">Recherches récentes :</div>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="search in recentSearches"
                    :key="search.id"
                    class="group flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1"
                    @click="useRecentSearch(search)"
                  >
                    {{ search.query }}
                    <span 
                      class="opacity-0 group-hover:opacity-100 text-red-500 cursor-pointer ml-1"
                      @click.stop="removeSearch(search.id)"
                    >
                      ×
                    </span>
                  </button>
                </div>
              </div>
              
              <div v-if="showSuggestions && filteredSuggestions.length > 0" class="mt-4">
                <div class="text-sm text-gray-500 mb-2">Suggestions :</div>
                <ul class="border rounded-lg divide-y">
                  <li 
                    v-for="(suggestion, index) in filteredSuggestions" 
                    :key="suggestion.id"
                    :class="[
                      'p-3 cursor-pointer flex items-center gap-2',
                      selectedIndex === index ? 'bg-gray-100' : 'hover:bg-gray-50'
                    ]"
                    @mouseenter="selectedIndex = index"
                    @click="selectSuggestion(index)"
                  >
                    <Icon name="mdi:map-marker" class="w-5 h-5 text-gray-400" />
                    <div>
                      <span class="font-medium">{{ suggestion.city }}</span>
                      <span class="text-gray-500">, {{ suggestion.region }}</span>
                      <span class="text-gray-400 text-sm ml-1">{{ suggestion.country }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div v-if="hasSearched" class="max-h-[400px] overflow-y-auto">
              <div v-if="!results.length" class="text-center py-8 text-gray-500">
                Aucun hôtel ne correspond à votre recherche
              </div>
              
              <ul v-else class="space-y-4">
                <li 
                  v-for="hotel in results" 
                  :key="hotel.id"
                  class="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  @click="selectHotel(hotel)"
                >
                  <h3 class="font-semibold text-lg">{{ hotel.name }}</h3>
                  <p class="text-gray-600">{{ hotel.location.address }}</p>
                  <p class="text-sm text-gray-500 mt-1">
                    {{ hotel.equipements.join(' • ') }}
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div v-else-if="currentStep === 'calendar'" class="space-y-4">
            <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Icon name="mdi:map-marker" class="w-5 h-5 text-gray-500" />
              <span class="font-medium">{{ selectedCity }}</span>
              <button 
                @click="currentStep = 'search'"
                class="ml-auto text-sm text-blue-600 hover:text-blue-700"
              >
                Modifier
              </button>
            </div>

            <div class="flex gap-4">
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">Arrivée</label>
                <input 
                  type="date" 
                  v-model="startDate"
                  class="w-full border rounded-lg p-2"
                  :min="minDate"
                />
              </div>
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">Départ</label>
                <input 
                  type="date" 
                  v-model="endDate"
                  class="w-full border rounded-lg p-2"
                  :min="startDate || minDate"
                />
              </div>
            </div>

            <div class="border-t pt-4">
              <h3 class="text-sm font-medium text-gray-700 mb-2">Flexibilité</h3>
              <div class="flex gap-2">
                <button
                  v-for="option in flexibilityOptions"
                  :key="option.days"
                  :class="[
                    'px-3 py-1 rounded-full text-sm',
                    selectedFlexibility === option.days
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                  @click="selectedFlexibility = option.days"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>

            <div class="mt-6">
              <button 
                class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                @click="currentStep = 'travelers'"
                :disabled="!isValidDateRange"
              >
                Suivant
              </button>
            </div>
          </div>

          <div v-else-if="currentStep === 'travelers'" class="space-y-4">
            <div class="space-y-2">
              <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Icon name="mdi:map-marker" class="w-5 h-5 text-gray-500" />
                <span class="font-medium">{{ selectedCity }}</span>
                <button 
                  @click="currentStep = 'search'"
                  class="ml-auto text-sm text-blue-600 hover:text-blue-700"
                >
                  Modifier
                </button>
              </div>
              <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Icon name="mdi:calendar" class="w-5 h-5 text-gray-500" />
                <span class="font-medium">{{ formatDateRange }}</span>
                <button 
                  @click="currentStep = 'calendar'"
                  class="ml-auto text-sm text-blue-600 hover:text-blue-700"
                >
                  Modifier
                </button>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 border-b">
                <div>
                  <h3 class="font-medium">Adultes</h3>
                  <p class="text-sm text-gray-500">13 ans et plus</p>
                </div>
                <div class="flex items-center gap-3">
                  <button 
                    class="w-8 h-8 rounded-full border flex items-center justify-center"
                    :class="adults > 0 ? 'text-gray-700 hover:border-gray-400' : 'text-gray-300'"
                    @click="adults = Math.max(0, adults - 1)"
                  >
                    -
                  </button>
                  <span class="w-4 text-center">{{ adults }}</span>
                  <button 
                    class="w-8 h-8 rounded-full border flex items-center justify-center text-gray-700 hover:border-gray-400"
                    @click="adults++"
                  >
                    +
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 border-b">
                <div>
                  <h3 class="font-medium">Enfants</h3>
                  <p class="text-sm text-gray-500">De 2 à 12 ans</p>
                </div>
                <div class="flex items-center gap-3">
                  <button 
                    class="w-8 h-8 rounded-full border flex items-center justify-center"
                    :class="children > 0 ? 'text-gray-700 hover:border-gray-400' : 'text-gray-300'"
                    @click="children = Math.max(0, children - 1)"
                  >
                    -
                  </button>
                  <span class="w-4 text-center">{{ children }}</span>
                  <button 
                    class="w-8 h-8 rounded-full border flex items-center justify-center text-gray-700 hover:border-gray-400"
                    @click="children++"
                  >
                    +
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 border-b">
                <div>
                  <h3 class="font-medium">Bébés</h3>
                  <p class="text-sm text-gray-500">- de 2 ans</p>
                </div>
                <div class="flex items-center gap-3">
                  <button 
                    class="w-8 h-8 rounded-full border flex items-center justify-center"
                    :class="babies > 0 ? 'text-gray-700 hover:border-gray-400' : 'text-gray-300'"
                    @click="babies = Math.max(0, babies - 1)"
                  >
                    -
                  </button>
                  <span class="w-4 text-center">{{ babies }}</span>
                  <button 
                    class="w-8 h-8 rounded-full border flex items-center justify-center text-gray-700 hover:border-gray-400"
                    @click="babies++"
                  >
                    +
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between p-4">
                <div>
                  <h3 class="font-medium">Animaux domestiques</h3>
                  <button class="text-sm text-gray-500 underline">
                    Vous voyagez avec un animal d'assistance ?
                  </button>
                </div>
                <div class="flex items-center gap-3">
                  <button 
                    class="w-8 h-8 rounded-full border flex items-center justify-center"
                    :class="pets > 0 ? 'text-gray-700 hover:border-gray-400' : 'text-gray-300'"
                    @click="pets = Math.max(0, pets - 1)"
                  >
                    -
                  </button>
                  <span class="w-4 text-center">{{ pets }}</span>
                  <button 
                    class="w-8 h-8 rounded-full border flex items-center justify-center text-gray-700 hover:border-gray-400"
                    @click="pets++"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <button 
                class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                @click="searchWithTravelers"
                :disabled="!isValidTravelers"
              >
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, computed, onMounted, onUnmounted } from 'vue'
import { useSearch } from '@/composables/useSearch'
import { useRecentSearches } from '@/composables/useRecentSearches'
import { useCitySuggestions } from '~/composables/useCitySuggestions'

const { query, results, loading, search } = useSearch()
const { recentSearches, addSearch, removeSearch } = useRecentSearches()
const { suggestions } = useCitySuggestions()

const isModalOpen = ref(false)
const hasSearched = ref(false)
const searchInput = ref(null)
const searchQuery = ref('')
const showSuggestions = ref(false)
const selectedIndex = ref(-1)
const currentStep = ref('search')
const selectedCity = ref('')
const startDate = ref('')
const endDate = ref('')
const selectedFlexibility = ref(0)
const adults = ref(0)
const children = ref(0)
const babies = ref(0)
const pets = ref(0)

// Filtrer les suggestions
const filteredSuggestions = computed(() => {
  if (!searchQuery.value) return suggestions
  const query = searchQuery.value.toLowerCase()
  return suggestions.filter(suggestion => 
    suggestion.city.toLowerCase().includes(query) || 
    suggestion.region.toLowerCase().includes(query) ||
    suggestion.country.toLowerCase().includes(query)
  )
})

const flexibilityOptions = [
  { days: 0, label: 'Dates exactes' },
  { days: 1, label: '± 1 jour' },
  { days: 2, label: '± 2 jours' },
  { days: 3, label: '± 3 jours' },
  { days: 7, label: '± 7 jours' },
]

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const isValidDateRange = computed(() => {
  return startDate.value && endDate.value && endDate.value >= startDate.value
})

const isValidTravelers = computed(() => {
  return adults.value > 0 || children.value > 0 || babies.value > 0 || pets.value > 0
})

const formatDateRange = computed(() => {
  if (!startDate.value || !endDate.value) return ''
  const start = new Date(startDate.value).toLocaleDateString()
  const end = new Date(endDate.value).toLocaleDateString()
  return `${start} - ${end}`
})

const openModal = () => {
  isModalOpen.value = true
  showSuggestions.value = true
  nextTick(() => {
    searchInput.value?.focus()
  })
}

const closeModal = () => {
  isModalOpen.value = false
  currentStep.value = 'search'
  selectedCity.value = ''
  startDate.value = ''
  endDate.value = ''
  selectedFlexibility.value = 0
  searchQuery.value = ''
  showSuggestions.value = false
  hasSearched.value = false
  selectedIndex.value = -1
  adults.value = 0
  children.value = 0
  babies.value = 0
  pets.value = 0
}

const handleInput = () => {
  showSuggestions.value = true
  hasSearched.value = false
  selectedIndex.value = -1
}

const handleSearch = async () => {
  if (!searchQuery.value?.trim()) return
  showSuggestions.value = false
  addSearch(searchQuery.value)
  query.value = searchQuery.value
  await search()
  hasSearched.value = true

  const searchParams = new URLSearchParams({
    city: selectedCity.value,
    startDate: startDate.value,
    endDate: endDate.value,
    flexibility: selectedFlexibility.value,
    adults: adults.value,
    children: children.value,
    babies: babies.value,
    pets: pets.value
  })

  
  closeModal()
  navigateTo(`/search?${searchParams.toString()}`)
}

const useRecentSearch = async (search) => {
  searchQuery.value = search.query
  query.value = search.query
  await search()
  hasSearched.value = true
  showSuggestions.value = false
}

const navigateSuggestion = (direction) => {
  const newIndex = selectedIndex.value + direction
  if (newIndex >= -1 && newIndex < filteredSuggestions.value.length) {
    selectedIndex.value = newIndex
  }
}

const selectSuggestion = (index) => {
  if (index === -1 || !filteredSuggestions.value[index]) return
  
  const selected = filteredSuggestions.value[index]
  selectedCity.value = `${selected.city}, ${selected.region}`
  currentStep.value = 'calendar'
}

const selectHotel = (hotel) => {
  closeModal()
  navigateTo(`/hotel/${hotel.id}`)
}

const searchWithDates = () => {
  if (!isValidDateRange.value) return
  
  // Construire les paramètres de recherche
  const searchParams = new URLSearchParams({
    city: selectedCity.value,
    startDate: startDate.value,
    endDate: endDate.value,
    flexibility: selectedFlexibility.value
  })

  // Fermer la modal et rediriger vers la page de recherche
  closeModal()
  navigateTo(`/search?${searchParams.toString()}`)
}

const searchWithTravelers = () => {
  if (!isValidTravelers.value) return
  
  // Construire les paramètres de recherche
  const searchParams = new URLSearchParams({
    city: selectedCity.value,
    startDate: startDate.value,
    endDate: endDate.value,
    flexibility: selectedFlexibility.value,
    adults: adults.value,
    children: children.value,
    babies: babies.value,
    pets: pets.value
  })

  // Fermer la modal et rediriger vers la page de recherche
  closeModal()
  navigateTo(`/search?${searchParams.toString()}`)
}

// Fermer les suggestions si on clique en dehors
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showSuggestions.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
