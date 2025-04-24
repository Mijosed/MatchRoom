import { ref, onMounted } from "vue";

export const useHotels = () => {
  const supabase = useSupabaseClient();
  const hotels = ref([]);

  onMounted(async () => {
    const { data, error } = await supabase.from("hotel").select("*");
    if (error) {
      console.error("Erreur Supabase:", error);
    } else {
      hotels.value = data;
    }
  });

  return {
    hotels,
  };
};
