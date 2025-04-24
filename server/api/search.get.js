import { hotels } from '~/data/hotels'

export default defineEventHandler(async (event) => {
  try {
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

    if (city) {
      const cityName = city.split(',')[0].trim()

      filteredHotels = filteredHotels.filter(hotel => {
        const match = hotel?.ville?.toLowerCase() === cityName.toLowerCase()
        return match
      })
    }

    const totalPersonnes = Number(adults) + Number(children) + Number(babies)
    
    //if (totalPersonnes > 0) {
      //filteredHotels = filteredHotels.filter(hotel => {
        //const match = hotel?.capacite >= totalPersonnes
        //return match
      //})
    //}

    const hotelsWithAllData = filteredHotels.map(hotel => ({
      ...hotel,
      photo: hotel.photo || hotel.images?.[0] || '/images/hotel-placeholder.jpg',
      tags: hotel.tags || [],
      address: hotel.address || hotel.adresse,
      lat: hotel.lat,
      lng: hotel.lng
    }))

    return hotelsWithAllData

  } catch (error) {
    console.error('Erreur de recherche:', error)
    return []
  }
})