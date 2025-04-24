<template>
  <div class="relative">
    <!-- Barre de recherche -->
    <div class="bg-white rounded-full shadow-sm px-4 py-2 flex items-center gap-2 cursor-pointer" @click="openModal">
      <Icon name="mdi:magnify" class="w-5 h-5 text-gray-500" />
      <input
        readonly
        type="text"
        placeholder="Rechercher un hôtel, une ville…"
        class="w-full outline-none bg-transparent text-sm cursor-pointer"
      />
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto bg-white">
      <!-- En-tête -->
      <div class="p-4 bg-white">
        <div class="flex items-center justify-between">
          <button @click="goBack" class="p-2" v-if="currentStep !== 'search'">
            <Icon name="mdi:arrow-left" class="w-6 h-6" />
          </button>
          <button @click="closeModal" class="p-2" v-else>
            <Icon name="mdi:close" class="w-6 h-6" />
          </button>
          <h1 class="text-xl font-semibold text-[#457891]">
            {{ stepTitle }}
          </h1>
          <div class="w-10"></div>
        </div>
      </div>

      <div class=" flex-1">
        <!-- Étape recherche -->
        <div v-if="currentStep === 'search'" class="p-4 bg-[#457891]">
          <div class="relative mb-6">
            <div class="flex items-center rounded-lg bg-gray-100 px-4">
              <input 
                v-model="searchQuery"
                type="text"
                class="w-full py-3 bg-transparent outline-none"
                placeholder="Destination"
                @input="handleInput"
                @keydown.down.prevent="navigateSuggestion(1)"
                @keydown.up.prevent="navigateSuggestion(-1)"
                @keydown.enter="selectSuggestion(selectedIndex)"
                ref="searchInput"
              />
              <Icon name="mdi:magnify" class="w-5 h-5 text-gray-500" />
            </div>
          </div>

          <!-- Recherches récentes -->
          <div class="mb-6">
            <h2 class="text-white text-lg font-medium mb-4">Recherches récentes</h2>
            <div class="space-y-2">
              <div 
                v-for="search in recentSearches" 
                :key="search.id"
                class="flex items-center justify-between p-3 bg-gray-100 rounded-lg cursor-pointer"
                @click="useRecentSearch(search)"
              >
                <span class="font-medium">{{ search.query }}</span>
                <div class="flex items-center gap-4">
                  <span class="text-gray-600">{{ search.dates }}</span>
                  <div class="flex items-center">
                    <Icon name="mdi:account" class="w-4 h-4 mr-1" />
                    <span>{{ search.travelers }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Suggestions -->
          <div>
            <h2 class="text-white text-lg font-medium mb-4">Suggestions de destinations</h2>
            <div class="space-y-2">
              <div 
                v-for="(suggestion, index) in suggestions" 
                :key="suggestion.id"
                :class="[
                  'p-3 bg-gray-100 rounded-lg cursor-pointer',
                  selectedIndex === index ? 'bg-gray-200' : ''
                ]"
                @click="selectSuggestion(index)"
              >
                <div class="flex flex-col">
                  <span class="font-medium">{{ suggestion.city }}</span>
                  <span class="text-gray-600 text-sm">{{ suggestion.description }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Étape calendrier -->
        <div v-else-if="currentStep === 'calendar'" class="h-full flex flex-col">
          <!-- Destination sélectionnée -->
          <div class="p-4 mb-6  ">
            <div class="flex justify-between items-center text-white bg-[#457891] p-4 rounded-2xl">
              <span class="text-sm">Destination</span>
              <span class="font-medium">{{ selectedDestination?.city }}</span>
            </div>
          </div>

          <!-- Calendrier -->
          <div class="px-4 flex-1">
            <Calendar
              v-model="dateRange"
              mode="range"
              :min-date="new Date()"
              :attributes="calendarAttributes"
              :masks="masks"
              is-expanded
              :columns="1"
              class="w-full"
              :title-position="'center'"
              @dayclick="handleDayClick"
            />
          </div>

          <!-- Bouton Suivant -->
          <div class="p-4 mt-auto">
            <button 
              @click="goToTravelers"
              class="w-full py-3 bg-white text-[#457891] rounded-lg font-medium"
              :disabled="!isDateRangeValid"
            >
              Suivant
            </button>
          </div>
        </div>

        <!-- Étape voyageurs -->
        <div v-else-if="currentStep === 'travelers'" class="p-4">
          <div class="bg-white rounded-lg p-4 space-y-4">
            <!-- Adultes -->
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium">Adultes</h3>
                <p class="text-sm text-gray-600">13 ans et plus</p>
              </div>
              <div class="flex items-center gap-4">
                <button 
                  @click="adults > 0 && adults--"
                  class="w-8 h-8 rounded-full border flex items-center justify-center"
                  :class="adults > 0 ? 'border-[#457891] text-[#457891]' : 'border-gray-300 text-gray-300'"
                >
                  -
                </button>
                <span class="w-4 text-center">{{ adults }}</span>
                <button 
                  @click="adults++"
                  class="w-8 h-8 rounded-full border border-[#457891] text-[#457891] flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Enfants -->
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium">Enfants</h3>
                <p class="text-sm text-gray-600">2 à 12 ans</p>
              </div>
              <div class="flex items-center gap-4">
                <button 
                  @click="children > 0 && children--"
                  class="w-8 h-8 rounded-full border flex items-center justify-center"
                  :class="children > 0 ? 'border-[#457891] text-[#457891]' : 'border-gray-300 text-gray-300'"
                >
                  -
                </button>
                <span class="w-4 text-center">{{ children }}</span>
                <button 
                  @click="children++"
                  class="w-8 h-8 rounded-full border border-[#457891] text-[#457891] flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            <button 
              @click="handleSearch"
              class="w-full mt-4 py-3 bg-[#457891] text-white rounded-lg font-medium"
              :disabled="!isTravelersValid"
            >
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useSearch } from '@/composables/useSearch'
import { useRecentSearches } from '@/composables/useRecentSearches'
import { useCitySuggestions } from '~/composables/useCitySuggestions'
import { Calendar } from 'v-calendar'
import 'v-calendar/style.css'

const { query, search } = useSearch()
const { recentSearches, addSearch } = useRecentSearches()
const { suggestions } = useCitySuggestions()

const isModalOpen = ref(false)
const searchQuery = ref('')
const selectedIndex = ref(-1)
const searchInput = ref(null)
const currentStep = ref('search')
const dateRange = ref({ start: null, end: null })
const adults = ref(1)
const children = ref(0)
const selectedDestination = ref(null)

// Configuration du calendrier
const masks = {
  title: 'MMMM YYYY',
  weekdays: 'WW',
}

const calendarAttributes = ref([
  {
    key: 'today',
    highlight: {
      fillMode: 'light',
      color: 'orange',
    },
    dates: new Date(),
  },
  {
    key: 'range',
    highlight: {
      startEnd: {
        fillMode: 'solid',
        color: 'orange',
      },
      base: {
        fillMode: 'light',
        color: 'orange',
      }
    },
    
  },
])

// Computed properties
const stepTitle = computed(() => {
  switch (currentStep.value) {
    case 'calendar':
      return 'Sélectionnez vos dates'
    case 'travelers':
      return 'Voyageurs'
    default:
      return 'Recherche'
  }
})

const isDateRangeValid = computed(() => {
  return dateRange.value.start && dateRange.value.end
})

const isTravelersValid = computed(() => {
  return adults.value > 0 || children.value > 0
})

const formatDateRange = (start, end) => {
  if (!start || !end) return ''
  return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
}

// Methods
const handleInput = () => {
  selectedIndex.value = -1
}

const goBack = () => {
  if (currentStep.value === 'travelers') {
    currentStep.value = 'calendar'
  } else if (currentStep.value === 'calendar') {
    currentStep.value = 'search'
  }
}

const navigateSuggestion = (direction) => {
  const newIndex = selectedIndex.value + direction
  if (newIndex >= -1 && newIndex < suggestions.length) {
    selectedIndex.value = newIndex
  }
}

const selectSuggestion = (index) => {
  if (index === -1 || !suggestions[index]) return
  const suggestion = suggestions[index]
  selectedDestination.value = suggestion
  searchQuery.value = suggestion.city
  currentStep.value = 'calendar'
}

const goToTravelers = () => {
  if (isDateRangeValid.value) {
    currentStep.value = 'travelers'
  }
}

const handleSearch = async () => {
  if (!selectedDestination.value || !isDateRangeValid.value || !isTravelersValid.value) return
  
  const totalTravelers = adults.value + children.value
  
  addSearch({
    query: selectedDestination.value.city,
    dates: formatDateRange(dateRange.value.start, dateRange.value.end),
    travelers: totalTravelers
  })
  
  query.value = selectedDestination.value.city
  await search()
  
  const searchParams = new URLSearchParams({
    destination: selectedDestination.value.city,
    startDate: dateRange.value.start.toISOString(),
    endDate: dateRange.value.end.toISOString(),
    adults: adults.value,
    children: children.value
  })
  
  closeModal()
  navigateTo(`/search?${searchParams.toString()}`)
}

const useRecentSearch = (search) => {
  searchQuery.value = search.query
  handleSearch(search)
}

const openModal = () => {
  isModalOpen.value = true
  currentStep.value = 'search'
  nextTick(() => {
    searchInput.value?.focus()
  })
}

const closeModal = () => {
  isModalOpen.value = false
  currentStep.value = 'search'
  searchQuery.value = ''
  selectedIndex.value = -1
  dateRange.value = { start: null, end: null }
  adults.value = 1
  children.value = 0
  selectedDestination.value = null
}

const handleDayClick = (day) => {
  if (!dateRange.value.start || (dateRange.value.start && dateRange.value.end)) {
    // Premier clic ou nouveau range
    dateRange.value = {
      start: day.date,
      end: null,
    }
  } else {
    // Deuxième clic
    if (day.date < dateRange.value.start) {
      dateRange.value.end = dateRange.value.start
      dateRange.value.start = day.date
    } else {
      dateRange.value.end = day.date
    }
  }
  
  // Mettre à jour les attributs du calendrier
  calendarAttributes.value[1].dates = {
    start: dateRange.value.start,
    end: dateRange.value.end,
  }
}
</script>
<style scoped>
:deep(.vc-pane-container) {
  @apply bg-[#457891];
  @apply rounded-2xl;
}

:deep(.vc-pane) {
  @apply rounded-2xl;
}

:deep(.vc-pane-layout) {
  @apply rounded-2xl;
}

:deep(.vc-container) {
  @apply w-full;
  @apply border-0;
}
:deep(.vc-weekday) {
  @apply text-white;
  @apply font-normal
}
:deep(.vc-day-content){
  @apply text-white font-normal
}
</style>


