import { hotels } from '~/data/hotels'

export default defineEventHandler(async (event) => {
  try {
    console.log('search.get');
    const { 
      city, 
      adults = '0',
      children = '0',
      babies = '0'
    } = getQuery(event)

    if (!Array.isArray(hotels)) {
      console.error('La liste des hôtels n\'est pas un tableau')
      return []
    }

    let filteredHotels = [...hotels]
    console.log('Hotels avant filtrage:', filteredHotels);

    if (city) {
      // Extraire le nom de la ville avant la virgule et nettoyer
      const cityName = city.split(',')[0].trim()
      console.log('Recherche ville:', cityName)

      filteredHotels = filteredHotels.filter(hotel => {
        const match = hotel?.ville?.toLowerCase() === cityName.toLowerCase()
        console.log(`Comparaison: ${hotel?.ville?.toLowerCase()} === ${cityName.toLowerCase()} => ${match}`)
        return match
      })
    }

    console.log('Hotels après filtrage ville:', filteredHotels);

    // Calculer le nombre total de personnes
    const totalPersonnes = Number(adults) + Number(children) + Number(babies)
    
    // Filtrer les hôtels par capacité totale
    if (totalPersonnes > 0) {
      console.log('Filtrage par capacité:', totalPersonnes)
      filteredHotels = filteredHotels.filter(hotel => {
        const match = hotel?.capacite >= totalPersonnes
        console.log(`Capacité hôtel ${hotel?.name}: ${hotel?.capacite} >= ${totalPersonnes} => ${match}`)
        return match
      })
    }

    console.log('Hotels après filtrage capacité:', filteredHotels);
    return filteredHotels

  } catch (error) {
    console.error('Erreur de recherche:', error)
    return []
  }
})