<script setup>
const route = useRoute()
const hotelId = route.params.id
import NegotiationSlider from '~/components/common/NegotiationSlider.vue'

const proposedPrice = ref(120)
const newReview = ref('')
const newRating = ref(5)
const hotel = {
  id: hotelId,
  name: "Hôtel du Lac",
  city: "Annecy",
  maxGuests: 4,
  description: "Chambre moderne avec vue sur le lac, literie haut de gamme, ambiance relaxante.",
  image: "https://picsum.photos/id/1036/1000/600",
  equipment: [
    { icon: "mdi:bed", label: "1 lit" },
    { icon: "mdi:shower", label: "1 salle de bain" },
    { icon: "mdi:binoculars", label: "Vue mer" },
    { icon: "mdi:headphones", label: "Insonorisation" },
    { icon: "mdi:air-conditioner", label: "Climatisation" },
  ],
  services: [
    { icon: "mdi:glass-cocktail", label: "bar" },
    { icon: "mdi:silverware-fork-knife", label: "restauration" },
    { icon: "mdi:pool", label: "piscine" },
    { icon: "mdi:air-conditioner", label: "Climatisation" },
    { icon: "mdi:coffee-maker", label: "Petit déjeuner" }
  ],
  infos: [
    { icon: "mdi:clock-outline", label: "Check-in 15h - Check-out 12h" },
    { icon: "mdi:calendar-remove-outline", label: "Annulation flexible" },
    { icon: "mdi:wheelchair-accessibility", label: "Accessible aux PMR" },
    { icon: "mdi:paw", label: "Petfriendly" }
  ],
  reviews: [
    {
      user: "Marie Dupont",
      comment: "Super séjour, très belle vue et lit confortable !",
      rating: 5
    },
    {
      user: "Jean Martin",
      comment: "Personnel accueillant, bon petit déjeuner.",
      rating: 4
    }
  ]
}

const handleNegotiation = (price) => {
  console.log('Prix proposé :', price)
}

const handleReviewSubmit = () => {
  if (newReview.value.trim()) {
    hotel.reviews.push({
      user: 'Utilisateur anonyme',
      comment: newReview.value,
      rating: newRating.value
    })
    newReview.value = ''
    newRating.value = 5
  }
}

const isFavorite = ref(false)
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}
const router = useRouter()
</script>

<template>
  <div class="min-h-screen bg-white pb-40">
    <!-- Image header -->
    <div class="relative h-72 sm:h-[400px]">
      <img
        :src="hotel.image"
        :alt="hotel.name"
        class="w-full h-full object-cover"
      />

      <button
        @click="router.back()"
        class="absolute top-4 left-4 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-90 transition"
      >
        <Icon name="mdi:arrow-left" class="text-black w-5 h-5" />
      </button>

      <button
        @click="toggleFavorite"
        class="absolute top-4 right-4  p-2 rounded-full hover:bg-opacity-100 transition"
      >
        <Icon :name="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'" class="text-bleu w-6 h-6" />
      </button>

      <div class="absolute bottom-4 left-4 text-white bg-black/50 px-4 py-2 rounded-xl backdrop-blur-sm">
        <h1 class="text-xl sm:text-2xl font-bold">{{ hotel.name }}</h1>
        <p class="text-sm sm:text-base text-gray-200">{{ hotel.city }}</p>
      </div>
    </div>

    <div class="px-4 py-6 space-y-6">
      <div class="text-gray-700 text-sm sm:text-base">
        👥 Jusqu'à {{ hotel.maxGuests }} personnes
      </div>

      <p class="text-gray-600 text-sm sm:text-base">
        {{ hotel.description }}
      </p>

      <!-- Équipements principaux -->
      <div>
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

      <!-- Équipements et services -->
      <div>
        <h2 class="text-base font-semibold mb-2">Equipements et services</h2>
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

      <!-- Infos pratiques -->
      <div>
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

      <!-- Avis clients -->
      <div>
        <h2 class="text-base font-semibold mb-2">Avis clients</h2>

        <!-- Formulaire avis -->
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

        <div class="space-y-4">
          <div
            v-for="(review, i) in hotel.reviews"
            :key="i"
            class="border p-4 rounded-lg bg-gray-50"
          >
            <div class="flex justify-between items-center mb-1">
              <span class="font-medium text-sm">{{ review.user }}</span>
              <div class="flex gap-1">
                <Icon
                  v-for="n in review.rating"
                  :key="n"
                  name="mdi:star"
                  class="text-yellow-400 w-4 h-4"
                />
              </div>
            </div>
            <p class="text-sm text-gray-700">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Slider fixe -->
    <NegotiationSlider
      v-model="proposedPrice"
      :min="80"
      :max="150"
      @submit="handleNegotiation"
    />
  </div>
</template>