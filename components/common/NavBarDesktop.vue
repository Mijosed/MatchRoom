<script setup>
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'

const { user, signOut } = useAuth()
const router = useRouter()
const showMenu = ref(false)
const menuRef = ref(null)
const buttonRef = ref(null)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

// Fonction pour gérer les clics en dehors du menu
const handleClickOutside = (event) => {
  if (showMenu.value && 
      menuRef.value && 
      !menuRef.value.contains(event.target) &&
      buttonRef.value && 
      !buttonRef.value.contains(event.target)) {
    showMenu.value = false
  }
}

// Ajouter l'écouteur de clic global quand le composant est monté
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

// Supprimer l'écouteur quand le composant est démonté
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <header class="bg-white shadow-md">
    <div class="max-w-6xl mx-auto flex items-center justify-between px-4 h-16">
      <!-- Logo Nuxt -->
      <NuxtLink to="/" class="flex items-center gap-2">
      <img src="/logo.svg" alt="Logo" class="w-16 h-16 pt-4 ">
      </NuxtLink>

      <!-- Menu principal -->
      <nav class="font-Lato flex items-center gap-6 text-sm text-gray-700">
        <NuxtLink to="/offers" class="hover:text-bleu">Nos offres</NuxtLink>
        <NuxtLink to="/favorites" class="hover:text-bleu">Favoris</NuxtLink>
        <NuxtLink to="/negotiations" class="hover:text-bleu">Négociations</NuxtLink>
        <NuxtLink to="/bookings" class="hover:text-bleu">Réservations</NuxtLink>

        <!-- Menu utilisateur -->
        <div class="relative">
          <button 
            ref="buttonRef"
            @click.stop="toggleMenu" 
            class="flex items-center gap-1 hover:text-bleu"
          >
            <Icon name="mdi:account-circle" class="w-5 h-5" />
            <!-- <span>{{ user ? 'Mon compte' : 'Connexion' }}</span> -->
          </button>

          <!-- Dropdown -->
          <div
            v-if="showMenu"
            ref="menuRef"
            class="absolute right-0 mt-2 w-40 bg-white border rounded shadow text-sm z-50"
          >
            <NuxtLink
              v-if="user"
              to="/account"
              class="block px-4 py-2 hover:bg-gray-100"
              @click="showMenu = false"
            >Profil</NuxtLink>

            <NuxtLink to="/admin" class="block px-4 py-2 hover:bg-gray-100">Administration</NuxtLink>

            <button
              v-if="user"
              @click="signOut().then(() => router.push('/'))"
              class="w-full text-left px-4 py-2 hover:bg-gray-100"
            >Déconnexion</button>

            <NuxtLink
              v-if="!user"
              to="/login"
              class="block px-4 py-2 hover:bg-gray-100"
              @click="showMenu = false"
            >Se connecter</NuxtLink>
            <NuxtLink
              v-if="!user"
              to="/register"
              class="block px-4 py-2 hover:bg-gray-100"
              @click="showMenu = false"
            >S'inscrire</NuxtLink>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>
