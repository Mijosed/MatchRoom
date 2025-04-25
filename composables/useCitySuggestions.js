export function useCitySuggestions() {
    const suggestions = [
      { 
        id: 1, 
        city: 'Nice',
        region: 'Provence-Alpes-Côte d\'Azur',
        country: 'France',
        coordinates: { lat: 43.7102, lng: 7.2620 }
      },
      { 
        id: 2, 
        city: 'Paris',
        region: 'Île-de-France',
        country: 'France',
        coordinates: { lat: 48.8566, lng: 2.3522 }
      },
      { 
        id: 3, 
        city: 'Lyon',
        region: 'Auvergne-Rhône-Alpes',
        country: 'France',
        coordinates: { lat: 45.7578, lng: 4.8320 }
      }
    ]
  
    return {
      suggestions
    }
  }