<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRoom } from '~/composables/useRoom'
import { useHotels } from '~/composables/useHotels'
import RoomCard from '~/components/hotels/RoomCard.vue'

const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()
const hotelId = route.params.hotelId

const newReview = ref('')
const newRating = ref(5)
const hotel = ref(null)
const isFavorite = ref(false)
const isLoading = ref(true)

const { rooms, fetchRoomsByHotel } = useRoom()
const { searchHotels } = useHotels()

onMounted(async () => {
    const hotels = await searchHotels({})
    const currentHotel = hotels.find(h => h.id === hotelId)

    if (!currentHotel) {
        console.error('Error fetching hotel: Hôtel introuvable')
    } else {
        hotel.value = currentHotel
        await fetchRoomsByHotel(hotelId)
    }

    isLoading.value = false
})
</script>

<template>
    <div v-if="isLoading" class="flex items-center justify-center min-h-[50vh]">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#457891]"></div>
    </div>

    <div v-else-if="hotel" class="min-h-screen bg-white">
        <div class="relative h-72 sm:h-[400px]">
            <img
                :src="hotel.photo"
                :alt="hotel.name"
                class="w-full h-full object-cover"
            />

            <button
                @click="router.back()"
                class="absolute top-4 left-4 h-8 w-8 flex justify-center items-center rounded-full bg-white bg-opacity-70 hover:bg-opacity-90 transition"
            >
                <Icon name="mdi:arrow-left" class="text-black w-5 h-5" />
            </button>

            <button
                @click="toggleFavorite"
                class="absolute top-4 right-4 h-8 w-8 flex justify-center items-center rounded-full hover:bg-opacity-100 transition"
            >
                <Icon :name="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'" class="text-bleu w-6 h-6" />
            </button>

            <div class="absolute bottom-4 left-4 text-white bg-black/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                <h1 class="text-xl sm:text-2xl font-bold">{{ hotel.name }}</h1>
                <p class="text-sm sm:text-base text-gray-200">{{ hotel.ville }}</p>
            </div>
        </div>

        <div class="px-4 py-6 space-y-6">
            <p class="text-gray-600 text-sm sm:text-base">
                {{ hotel.description }}
            </p>

            <div v-if="hotel.equipment && hotel.equipment.length">
                <h2 class="text-base font-semibold mb-2">Équipements</h2>
                <div class="grid grid-cols-2 gap-x-6 gap-y-4">
                    <div
                        v-for="(item, i) in hotel.equipment"
                        :key="i"
                        class="flex items-center gap-2 text-sm text-gray-800"
                    >
                        <Icon :name="item.icon" class="w-5 h-5" />
                        <span>{{ item.label }}</span>
                    </div>
                </div>
            </div>

            <div v-if="hotel.services && hotel.services.length">
                <h2 class="text-base font-semibold mb-2">Services</h2>
                <div class="grid grid-cols-2 gap-x-6 gap-y-4">
                    <div
                        v-for="(item, i) in hotel.services"
                        :key="i"
                        class="flex items-center gap-2 text-sm text-gray-800"
                    >
                        <Icon :name="item.icon" class="w-5 h-5" />
                        <span>{{ item.label }}</span>
                    </div>
                </div>
            </div>

            <div v-if="hotel.infos && hotel.infos.length">
                <h2 class="text-base font-semibold mb-2">Infos pratiques</h2>
                <div class="grid grid-cols-2 gap-x-6 gap-y-4">
                    <div
                        v-for="(item, i) in hotel.infos"
                        :key="i"
                        class="flex items-center gap-2 text-sm text-gray-800"
                    >
                        <Icon :name="item.icon" class="w-5 h-5" />
                        <span>{{ item.label }}</span>
                    </div>
                </div>
            </div>

            <div>
                <h2 class="text-base font-semibold mb-2">Contact</h2>
                <p class="text-sm text-gray-700">Adresse : {{ hotel.address }}</p>
                <p class="text-sm text-gray-700">Tél. : {{ hotel.phone }}</p>
                <p class="text-sm text-gray-700">Email : {{ hotel.email }}</p>
            </div>

            <div class="mt-6">
                <h2 class="text-base font-semibold mb-2">Chambres disponibles</h2>

                <div v-if="rooms.length" class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <RoomCard v-for="room in rooms" :key="room.id" :hotelId="hotelId" :id="room.id" />
                </div>
                <div v-else class=" text-sm font-bold text-red-800">
                    Aucune chambre disponible pour cet hôtel actuellement.
                </div>
            </div>

            <div>
                <h2 class="text-base font-semibold mb-2">Avis clients</h2>

                <div class="mb-4 bg-gray-50 p-4 rounded-lg border">
                    <textarea
                        v-model="newReview"
                        class="w-full text-sm border rounded p-2 mb-2 resize-none"
                        placeholder="Laissez un commentaire..."
                        rows="3"
                    ></textarea>
                    <div class="flex items-center justify-between">
                        <div class="flex gap-1">
                            <button
                                v-for="n in 5"
                                :key="n"
                                @click="newRating = n"
                                type="button"
                            >
                                <Icon
                                    :name="n <= newRating ? 'mdi:star' : 'mdi:star-outline'"
                                    class="w-5 h-5 text-yellow-400"
                                />
                            </button>
                        </div>
                        <button
                            @click="handleReviewSubmit"
                            class="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm hover:bg-indigo-700"
                        >
                            Envoyer
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                        v-for="(review, i) in hotel.reviews"
                        :key="i"
                        class="flex bg-gray-100 rounded-lg p-4 items-start gap-4 shadow-sm"
                    >
                        <img
                            :src="`https://i.pravatar.cc/150?img=${i + 10}`"
                            alt="avatar"
                            class="w-14 h-14 rounded-full object-cover"
                        />
                        <div>
                            <p class="font-semibold text-[#333333]">{{ review.user }}</p>
                            <div class="flex gap-1 mb-1">
                                <Icon
                                    v-for="n in 5"
                                    :key="n"
                                    :name="n <= review.rating ? 'mdi:star' : 'mdi:star-outline'"
                                    class="text-yellow-400 w-4 h-4"
                                />
                            </div>
                            <p class="text-sm text-gray-700 leading-snug line-clamp-2">
                                "{{ review.comment }}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="text-center py-10 text-gray-600">
        Hôtel introuvable ou erreur de chargement.
    </div>
</template>
