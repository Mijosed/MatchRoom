export function parseQuery(query) {
  // Vérifier si query est défini
  if (!query) return null

  const normalizedQuery = query.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') 
  
  const villes = ['nice', 'paris', 'lyon']
  
  // On ne cherche plus que la ville
  debugger;
  const ville = villes.find(v => normalizedQuery === v)
  
  if (!ville) {
    return null
  }
  
  return { ville }
}