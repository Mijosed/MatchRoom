<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    hotelId: {
        type: String,
        required: true
    }
})

const supabase = useSupabaseClient()

const room = ref(null)

const fetchRoom = async () => { // Needs to be inserted in the useRoom composable 
    const { data, error } = await supabase
        .from('room')
        .select('id, description, images, price')
        .eq('id', props.id)
        .single()

    if (error) {
        console.error('Error fetching room:', error)
    } else {
        room.value = {
            image: data?.images?.length ? data.images[0] : null,
            title: `Chambre - ${data.price}€`,
            details: data.description
        }
    }
}

onMounted(() => {
    fetchRoom()
})
</script>

<template>
    <router-link
        v-if="room"
        :to="`/hotels/${props.hotelId}/${props.id}`"
        class="flex items-center bg-gray-100 rounded-xl overflow-hidden shadow-sm"
    >
        <img
            v-if="room.image"
            :src="room.image"
            alt=""
            class="w-24 h-24 object-cover sm:w-32 sm:h-24"
        />
        <div class="p-4">
            <h3 class="font-semibold text-[#333333] text-sm sm:text-base mb-1">{{ room.title }}</h3>
            <p class="text-xs sm:text-sm text-gray-700 leading-snug">{{ room.details }}</p>
        </div>
    </router-link>
    <p v-else class="text-gray-500">Aucune chambre disponible.</p>
</template>
