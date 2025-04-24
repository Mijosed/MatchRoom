import { parseQuery } from '~/utils/parseQuery'
import { hotels } from '~/data/hotels'

export default defineEventHandler(async (event) => {
  try {
    const { q } = getQuery(event)
    if (!q) return []

    const parsedQuery = parseQuery(q)
    
    if (!parsedQuery) return []

    const { ville, equipements } = parsedQuery
    
    return hotels.filter(hotel => {
      const matchVille = !ville || 
        hotel.ville.toLowerCase() === ville.toLowerCase()

      const matchEquipements = equipements.length === 0 || 
        equipements.every(eq => 
          hotel.equipements.map(e => e.toLowerCase())
            .includes(eq.toLowerCase())
        )
      
      return matchVille && matchEquipements
    })
  } catch (error) {
    console.error('Erreur de recherche:', error)
    return []
  }
})