import { ref } from "vue";

export interface Room {
  id: number;
  id_hotel: number;
  description: string;
  price: number;
  photos: string[];
  data: any;
}

export const useRoom = () => {
  const supabase = useSupabaseClient();
  const rooms = ref<Room[]>([]);
  const loading = ref(false);

  const fetchRoomsByHotel = async (hotelId: string | number) => {
    loading.value = true;
    try {
      const { data, error } = await supabase
        .from("room")
        .select("*")
        .eq("id_hotel", hotelId);

      if (error) {
        console.error("Erreur Supabase:", error);
        return [];
      }

      const formattedRooms = data.map((room: Room) => ({
        id: room.id,
        id_hotel: room.id_hotel,
        description: room.description,
        price: room.price,
        photos: room.photos || ['/images/room-placeholder.jpg'],
        data: room.data || {}
      }));

      rooms.value = formattedRooms;
      return formattedRooms;
    } catch (error) {
      console.error("Erreur:", error);
      return [];
    } finally {
      loading.value = false;
    }
  };

  return {
    rooms,
    loading,
    fetchRoomsByHotel
  };
}; 