import { ref } from "vue";

export const useHotels = () => {
  const supabase = useSupabaseClient();
  const hotels = ref([]);
  const loading = ref(false);

  const fetchAllHotels = async () => {
    const { data, error } = await supabase.from("hotel").select("*");
    if (error) {
      console.error("Erreur Supabase:", error);
      return [];
    }
    return data;
  };

  const searchHotels = async (params: {
    city?: string;
    adults?: number;
    children?: number;
    babies?: number;
  }) => {
    loading.value = true;
    try {
      let query = supabase.from("hotel").select("*");

      if (params.city) {
        const cityName = params.city.split(',')[0].trim().toLowerCase();
        query = query.ilike('ville', `%${cityName}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Erreur de recherche:", error);
        return [];
      }

      const formattedHotels = data.map(hotel => ({
        ...hotel,
        photo: hotel.photo || '/images/hotel-placeholder.jpg',
        tags: hotel.tags || [],
        address: hotel.address || hotel.adresse,
        lat: hotel.lat,
        lng: hotel.lng
      }));

      return formattedHotels;
    } catch (error) {
      console.error("Erreur:", error);
      return [];
    } finally {
      loading.value = false;
    }
  };

  const loadInitialHotels = async () => {
    hotels.value = await fetchAllHotels();
  };

  return {
    hotels,
    loading,
    searchHotels,
    loadInitialHotels
  };
};
