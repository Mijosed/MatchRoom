import { ref } from 'vue'

export function useSearch() {
  const query = ref('')
  const results = ref([])
  const loading = ref(false)

  const search = async (params) => {
    const response = await fetch(`/api/search?${new URLSearchParams(params)}`)
    return response.json()
  }

  return { 
    query, 
    results, 
    loading, 
    search 
  }
}