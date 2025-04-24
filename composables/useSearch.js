import { ref } from 'vue'
import { useHotels } from './useHotels'

export function useSearch() {
  const { searchHotels } = useHotels()
  const results = ref([])
  const loading = ref(false)
  const error = ref(null)

  const search = async (params) => {
    loading.value = true
    error.value = null

    try {
      results.value = await searchHotels(params)
      return results.value
    } catch (err) {
      error.value = err
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    search,
    results,
    loading,
    error
  }
}