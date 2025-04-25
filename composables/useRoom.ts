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
  const room = ref<Room | null>(null);
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
        photos: room.photos || ['/images/room-placeholder.jpg','/images/room-placeholder2.png','/images/room-placeholder.jpg'],
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

  const fetchRoomDetails = async (hotelId: string | number, roomId: string | number) => {
    loading.value = true;
    try {
      const { data: roomData, error } = await supabase
        .from("room")
        .select("*")
        .eq("id_hotel", hotelId)
        .eq("id", roomId)
        .single() as { data: Room | null, error: any };

      if (error || !roomData) {
        console.error("Erreur Supabase:", error);
        room.value = null;
        return null;
      }

      const formattedRoom: Room = {
        id: roomData.id,
        id_hotel: roomData.id_hotel,
        description: roomData.description,
        price: roomData.price,
        photos: roomData.photos || ['/images/room-placeholder.jpg','/images/room-placeholder2.png','/images/room-placeholder.jpg'],
        data: roomData.data || {}
      };

      room.value = formattedRoom;
      return formattedRoom;
    } catch (error) {
      console.error("Erreur:", error);
      room.value = null;
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    rooms,
    room,
    loading,
    fetchRoomsByHotel,
    fetchRoomDetails
  };
}; 