import { ref } from 'vue'

export function useRecentSearches() {
  const recentSearches = ref([])

  const loadRecentSearches = () => {
    if (process.client) {
      try {
        const saved = localStorage.getItem('recentSearches')
        if (saved) {
          recentSearches.value = JSON.parse(saved)
        }
      } catch (error) {
        console.error('Erreur lors du chargement des recherches récentes:', error)
      }
    }
  }

  const addSearch = (query) => {
    if (!query.trim()) return
    
    const search = {
      id: Date.now(),
      query,
      timestamp: new Date().toISOString()
    }

    recentSearches.value.unshift(search)
    recentSearches.value = recentSearches.value.slice(0, 5)

    if (process.client) {
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches.value))
    }
  }

  const removeSearch = (id) => {
    recentSearches.value = recentSearches.value.filter(s => s.id !== id)
    if (process.client) {
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches.value))
    }
  }

  loadRecentSearches()

  return {
    recentSearches,
    addSearch,
    removeSearch
  }
} 