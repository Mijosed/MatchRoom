<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { X } from 'lucide-vue-next'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Connexion requise'
  },
  message: {
    type: String,
    default: 'Vous devez être connecté pour accéder à cette fonctionnalité'
  }
})

const emit = defineEmits(['close'])
const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
}

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <Card class="w-full max-w-md relative animate-in fade-in zoom-in duration-300">
      <button 
        class="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
        @click="closeModal"
      >
        <X class="h-5 w-5 text-gray-500" />
      </button>
      
      <CardHeader>
        <CardTitle class="text-xl font-bold">{{ title }}</CardTitle>
        <CardDescription>
          {{ message }}
        </CardDescription>
      </CardHeader>
      
      <CardContent class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-bold text-center">MatchRoom</h1>
          <p class="text-center text-sm text-gray-600">
            Connectez-vous à votre compte pour accéder à toutes les fonctionnalités
          </p>
        </div>
      </CardContent>
      
      <CardFooter class="flex flex-col sm:flex-row gap-3 justify-center">
        <Button class="w-full bg-[#457891]" @click="goToLogin">
          Se connecter
        </Button>
        <Button class="w-full" variant="outline" @click="goToRegister">
          Créer un compte
        </Button>
      </CardFooter>
    </Card>
  </div>
</template> 