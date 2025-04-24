import { ref } from 'vue'

export function useSearch() {
  const query = ref('')
  const results = ref([])
  const loading = ref(false)

  const search = async () => {
    try {
      if (!query.value.trim()) return
      
      loading.value = true
      const response = await $fetch('/api/search', {
        params: { q: query.value }
      })
      results.value = response
    } catch (error) {
      console.error('Erreur de recherche:', error)
      results.value = []
    } finally {
      loading.value = false
    }
  }

  return { 
    query, 
    results, 
    loading, 
    search 
  }
}