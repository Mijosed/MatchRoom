<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRoom } from '@/composables/useRoom'
import NegotiationSlider from '~/components/common/NegotiationSlider.vue'

const route = useRoute()
const router = useRouter()
const { room, loading, fetchRoomDetails } = useRoom()
const currentPhotoIndex = ref(0)

const hotelId = computed(() => route.params.hotelId)
const roomId = computed(() => route.params.roomId)

const proposedPrice = ref(120)
const handleNegotiation = (price) => {
    console.log('Proposed price:', price)
}

const nextPhoto = () => {
    if (room.value && room.value.images) {
        currentPhotoIndex.value = (currentPhotoIndex.value + 1) % room.value.images.length
    }
}

const prevPhoto = () => {
    if (room.value && room.value.images) {
        currentPhotoIndex.value = currentPhotoIndex.value === 0 
            ? room.value.images.length - 1 
            : currentPhotoIndex.value - 1
    }
}

const goToPhoto = (index) => {
    currentPhotoIndex.value = index
}

onMounted(async () => {
    if (hotelId.value && roomId.value) {
        await fetchRoomDetails(hotelId.value, roomId.value)
    }
})
</script>

<template>
    <div v-if="loading" class="flex items-center justify-center min-h-[50vh]">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#457891]"></div>
    </div>

    <div v-else-if="room" class="min-h-screen bg-white">
        <div class="relative h-72 sm:h-[400px]">
            <img
                :src="room.images[currentPhotoIndex]"
                :alt="room.name"
                class="w-full h-full object-cover"
            />

            <button
                @click="prevPhoto"
                class="absolute top-1/2 left-4 transform -translate-y-1/2 h-10 w-10 flex justify-center items-center rounded-full bg-white bg-opacity-70 hover:bg-opacity-90 transition"
            >
                <Icon name="mdi:chevron-left" class="text-black w-6 h-6" />
            </button>

            <button
                @click="nextPhoto"
                class="absolute top-1/2 right-4 transform -translate-y-1/2 h-10 w-10 flex justify-center items-center rounded-full bg-white bg-opacity-70 hover:bg-opacity-90 transition"
            >
                <Icon name="mdi:chevron-right" class="text-black w-6 h-6" />
            </button>

            <button
                @click="router.back()"
                class="absolute top-4 left-4 h-8 w-8 flex justify-center items-center rounded-full bg-white bg-opacity-70 hover:bg-opacity-90 transition"
            >
                <Icon name="mdi:arrow-left" class="text-black w-5 h-5" />
            </button>

            <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <button
                    v-for="(photo, index) in room.images"
                    :key="index"
                    @click="goToPhoto(index)"
                    :class="[
                        'h-2 w-2 rounded-full',
                        currentPhotoIndex === index ? 'bg-white' : 'bg-gray-400'
                    ]"
                ></button>
            </div>

            <div class="absolute bottom-4 left-4 text-white bg-black/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                <h1 class="text-xl sm:text-2xl font-bold">{{ room.name }}</h1>
                <p class="text-sm sm:text-base text-gray-200">{{ room.price }}€ / nuit</p>
            </div>
        </div>

        <div class="px-4 py-6 space-y-6">
            <p class="text-gray-600 text-sm sm:text-base">
                {{ room.description }}
            </p>

            <div v-if="room.features && room.features.length">
                <h2 class="text-base font-semibold mb-2">Caractéristiques</h2>
                <div class="grid grid-cols-2 gap-x-6 gap-y-4">
                    <div
                        v-for="(feature, i) in room.features"
                        :key="i"
                        class="flex items-center gap-2 text-sm text-gray-800"
                    >
                        <Icon name="mdi:check-circle-outline" class="w-5 h-5 text-green-500" />
                        <span>{{ feature }}</span>
                    </div>
                </div>
            </div>

            <div v-if="room.equipment && room.equipment.length">
                <h2 class="text-base font-semibold mb-2">Équipements</h2>
                <div class="grid grid-cols-2 gap-x-6 gap-y-4">
                    <div
                        v-for="(item, i) in room.equipment"
                        :key="i"
                        class="flex items-center gap-2 text-sm text-gray-800"
                    >
                        <Icon :name="item.icon" class="w-5 h-5" />
                        <span>{{ item.label }}</span>
                    </div>
                </div>
            </div>
        </div>

        <NegotiationSlider
            v-model="proposedPrice"
            :min="80"
            :max="150"
            @submit="handleNegotiation"
        />
    </div>

    <div v-else class="text-center py-10 text-gray-600">
        Chambre introuvable ou erreur de chargement.
    </div>
</template>
