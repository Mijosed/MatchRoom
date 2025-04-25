<script setup>
definePageMeta({ layout: 'default' })
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import AuthRequired from '~/components/common/AuthRequired.vue'
import FavoriteHotelCard from '~/components/common/FavoriteHotelCard.vue'

const user = useSupabaseUser()
const showAuthModal = ref(false)
const isLoading = ref(true)

// Données d'exemple pour les hôtels favoris
const favoriteHotels = ref([
  {
    id: 1,
    name: 'Hôtel Paradis',
    address: 'Paris, France',
    photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2940&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Résidence Élite',
    address: 'Lyon, France',
    photo: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2940&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Grand Palace',
    address: 'Marseille, France',
    photo: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2940&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Vue sur Mer',
    address: 'Nice, France',
    photo: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2940&auto=format&fit=crop',
  },
])

// Fonction pour supprimer un hôtel des favoris
const removeFavorite = (hotelId) => {
  favoriteHotels.value = favoriteHotels.value.filter(hotel => hotel.id !== hotelId)
}

onMounted(() => {
  // Petit délai pour laisser le temps au user d'être récupéré
  setTimeout(() => {
    showAuthModal.value = !user.value
    isLoading.value = false
  }, 500)
})

const closeAuthModal = () => {
  showAuthModal.value = false
}
</script>

<template>
  <section class="p-4">
    <div v-if="isLoading" class="flex items-center justify-center min-h-[50vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#457891]"></div>
    </div>
    
    <template v-else-if="user">
      <h1 class="text-xl font-semibold mb-4">Mes favoris</h1>
      
      <div v-if="favoriteHotels.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <FavoriteHotelCard 
          v-for="hotel in favoriteHotels" 
          :key="hotel.id" 
          :hotel="hotel"
          @remove="removeFavorite" 
        />
      </div>
      <p v-else class="text-gray-600">Vous n'avez pas encore d'hôtels favoris.</p>
    </template>
    
    <div v-else class="min-h-[50vh] flex flex-col gap-6 items-center justify-center p-4">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-2">Vous n'êtes pas connecté</h2>
        <p class="text-gray-600">Connectez-vous pour accéder à vos favoris</p>
      </div>
      
      <div class="flex flex-col sm:flex-row gap-4">
        <Button class="bg-[#457891]" @click="$router.push('/login')">
          Se connecter
        </Button>
        <Button variant="outline" @click="$router.push('/register')">
          Créer un compte
        </Button>
      </div>
    </div>
    
    <!-- Modal de connexion requise -->
    <AuthRequired 
      :show="showAuthModal" 
      @close="closeAuthModal"
      title="Connectez-vous à votre compte"
      message="Vous devez être connecté pour accéder à vos favoris"
    />
  </section>
</template>
