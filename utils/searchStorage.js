export const searchStorage = {
  keys: {
    recent: 'recentSearches',
    user: 'userSearches'
  },

  save(key, data) {
    if (process.client) {
      try {
        localStorage.setItem(key, JSON.stringify(data))
      } catch (error) {
        console.error(`Erreur lors de la sauvegarde: ${key}`, error)
      }
    }
  },

  load(key) {
    if (process.client) {
      try {
        const data = localStorage.getItem(key)
        return data ? JSON.parse(data) : null
      } catch (error) {
        console.error(`Erreur lors du chargement: ${key}`, error)
        return null
      }
    }
    return null
  },

  saveSearch(type, search) {
    const key = this.keys[type]
    const searches = this.load(key) || []
    
    const existingIndex = searches.findIndex(s => s.query === search.query)
    if (existingIndex !== -1) {
      searches.splice(existingIndex, 1)
    }
    
    searches.unshift(search)
    this.save(key, searches.slice(0, 5))
  },

  getSearches(type) {
    return this.load(this.keys[type]) || []
  },

  removeSearch(type, id) {
    const key = this.keys[type]
    const searches = this.load(key) || []
    const filtered = searches.filter(s => s.id !== id)
    this.save(key, filtered)
    return filtered
  },

  clearSearches(type) {
    this.save(this.keys[type], [])
  }
} 