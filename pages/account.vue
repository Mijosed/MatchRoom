<script setup>
definePageMeta({ layout: 'default' })
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import AccountHeader from '~/components/account/AccountHeader.vue'
import AccountProfile from '~/components/account/AccountProfile.vue'
import AccountBadges from '~/components/account/AccountBadges.vue'
import AuthRequired from '~/components/common/AuthRequired.vue'

const user = useSupabaseUser()
const showAuthModal = ref(false)
const isLoading = ref(true)

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
  <section class="p-4 space-y-6">
    <div v-if="isLoading" class="flex items-center justify-center min-h-[50vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#457891]"></div>
    </div>
    
    <template v-else-if="user">
      <AccountHeader />
      <AccountProfile />
      <AccountBadges />
    </template>
    
    <div v-else class="min-h-[50vh] flex flex-col gap-6 items-center justify-center p-4">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-2">Vous n'êtes pas connecté</h2>
        <p class="text-gray-600">Connectez-vous pour accéder à votre compte</p>
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
      message="Vous devez être connecté pour accéder à la page de votre profil"
    />
  </section>
</template>
