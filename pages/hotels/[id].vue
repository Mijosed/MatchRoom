<script setup>
const route = useRoute();
const hotelId = route.params.id;
import SuggestionsSection from "~/components/hotels/SuggestionsSection.vue";
const proposedPrice = ref(120);
const newReview = ref("");
const newRating = ref(5);
const hotel = {
  id: hotelId,
  name: "Hôtel du Lac",
  city: "Annecy",
  maxGuests: 4,
  description:
    "Un hôtel 3 étoiles au charme discretNiché au cœur de la ville, notre hôtel allie élégance classique et confort moderne. Dans une atmosphère chaleureuse et paisible, chaque chambre offre un cocon raffiné pour une escapade urbaine tout en douceur.",
  image: "https://picsum.photos/id/1036/1000/600",
  // equipment: [
  //   { icon: "mdi:bed", label: "1 lit" },
  //   { icon: "mdi:shower", label: "1 salle de bain" },
  //   { icon: "mdi:binoculars", label: "Vue mer" },
  //   { icon: "mdi:headphones", label: "Insonorisation" },
  //   { icon: "mdi:air-conditioner", label: "Climatisation" },
  // ],
  services: [
    { icon: "mdi:glass-cocktail", label: "bar" },
    { icon: "mdi:silverware-fork-knife", label: "restauration" },
    { icon: "mdi:pool", label: "piscine" },
    { icon: "mdi:air-conditioner", label: "Climatisation" },
    { icon: "mdi:coffee-maker", label: "Petit déjeuner" },
  ],
  infos: [
    { icon: "mdi:clock-outline", label: "Check-in 15h - Check-out 12h" },
    { icon: "mdi:calendar-remove-outline", label: "Annulation flexible" },
    { icon: "mdi:wheelchair-accessibility", label: "Accessible aux PMR" },
    { icon: "mdi:paw", label: "Petfriendly" },
  ],
  reviews: [
    {
      user: "Marie Dupont",
      comment: "Super séjour, très belle vue et lit confortable !",
      rating: 5,
      photo: "https://randomuser.me/api/portraits/men/10.jpg"

    },
    {
      user: "Jean Martin",
      comment: "Personnel accueillant, bon petit déjeuner.",
      rating: 4,
      photo: "https://randomuser.me/api/portraits/men/11.jpg"
    },
    {
      user: "Sophie Durand",
      comment: "Chambre propre mais un peu bruyante.",
      rating: 3,
      photo: "https://randomuser.me/api/portraits/women/10.jpg"
    },
    {
      user: "Lucas Bernard",
      comment: "Pas mal, mais le prix est un peu élevé.",
      rating: 3,
      photo: "https://randomuser.me/api/portraits/women/11.jpg"
    },
  ],
};

const handleNegotiation = (price) => {
  console.log("Prix proposé :", price);
};

const handleReviewSubmit = () => {
  if (newReview.value.trim()) {
    hotel.reviews.push({
      user: "Utilisateur anonyme",
      comment: newReview.value,
      rating: newRating.value,
    });
    newReview.value = "";
    newRating.value = 5;
  }
};

const isFavorite = ref(false);
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};
const router = useRouter();
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
        class="absolute top-4 right-4 p-2 rounded-full hover:bg-opacity-100 transition"
      >
        <Icon
          :name="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'"
          class="text-bleu w-6 h-6"
        />
      </button>

      <div
        class="absolute bottom-4 left-4 text-white bg-black/50 px-4 py-2 rounded-xl backdrop-blur-sm"
      >
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
      <!-- <div>
                <h2 class="text-base font-semibold mb-2">Equipements</h2>

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
      </div> -->

      <!-- Équipements et services -->
      <div>
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

        <div>
  <h2 class="text-lg font-semibold mb-4 text-bleu">Avis clients</h2>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div
      v-for="(review, i) in hotel.reviews"
      :key="i"
      class="flex bg-gray-100 rounded-xl shadow overflow-hidden"
    >
      <!-- Avatar : sans padding ni arrondi -->
      <div class="w-28 h-full shrink-0">
        <img
          :src="review.photo"
          alt="avatar"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Contenu texte -->
      <div class="p-4 flex flex-col justify-center">
        <p class="font-semibold text-noir mb-1">{{ review.user }}</p>
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


        <SuggestionsSection />
      </div>
    </div>
  </div>
</template>
