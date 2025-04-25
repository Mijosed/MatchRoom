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

  const addSearch = (query, dates, travelers) => {
    if (!query.trim()) return
    
    const search = {
      id: Date.now(),
      query,
      dates,
      travelers,
      timestamp: new Date().toISOString()
    }

    // Vérifier si une recherche similaire existe déjà
    const existingIndex = recentSearches.value.findIndex(
      s => s.query.toLowerCase() === query.toLowerCase()
    )

    if (existingIndex !== -1) {
      // Mettre à jour la recherche existante
      recentSearches.value[existingIndex] = search
    } else {
      // Ajouter la nouvelle recherche
      recentSearches.value.unshift(search)
    }

    // Garder seulement les 5 dernières recherches
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