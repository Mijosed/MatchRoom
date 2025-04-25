<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const isOpen = ref(false)
const router = useRouter()
const client = useSupabaseClient()
const user = useSupabaseUser()

const logout = async () => {
  await client.auth.signOut()
  router.push('/')
}

const goToSettings = () => {
  // À implémenter plus tard
}

const goToHelp = () => {
  // À implémenter plus tard
}
</script>

<template>
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold">Mon Compte</h1>
    
    <DropdownMenu v-model:open="isOpen">
      <DropdownMenuTrigger as-child>
        <button class="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none">
          <Icon name="mdi:cog" class="w-6 h-6 text-gray-600" />
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" class="w-56">
        <DropdownMenuLabel>
          <div class="flex flex-col">
            <span>{{ user?.email }}</span>
            <span class="text-xs text-muted-foreground">Options du compte</span>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem class="cursor-pointer" @click="goToSettings">
          <Icon name="mdi:account-cog" class="w-4 h-4 mr-2" />
          <span>Paramètres</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem class="cursor-pointer" @click="goToHelp">
          <Icon name="mdi:help-circle" class="w-4 h-4 mr-2" />
          <span>Aide</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem class="cursor-pointer text-red-600 focus:text-red-600" @click="logout">
          <Icon name="mdi:logout" class="w-4 h-4 mr-2" />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
