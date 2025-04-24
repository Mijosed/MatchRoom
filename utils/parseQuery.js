export function parseQuery(query) {
  const normalizedQuery = query.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') 
  
  const villes = ['nice', 'paris', 'lyon']
  const equipementsConnus = ['spa', 'piscine', 'wifi', 'restaurant', 'parking']
  
  const ville = villes.find(v => normalizedQuery.includes(v))
  
  const equipements = equipementsConnus.filter(eq => 
    normalizedQuery.includes(eq)
  )

  if (!ville && !equipements.length) {
    return null
  }
  
  return {
    ville,
    equipements
  }
}