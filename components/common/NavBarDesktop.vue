<script setup>
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const { user, signOut } = useAuth()
const router = useRouter()
const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>

<template>
  <header class="bg-white shadow-md">
    <div class="max-w-6xl mx-auto flex items-center justify-between px-4 h-16">
      <!-- Logo Nuxt -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <Icon name="logos:nuxt-icon" class="w-8 h-8 text-green-600" />
        <span class="text-xl font-bold text-indigo-600 hover:text-indigo-700">MatchRoom</span>
      </NuxtLink>

      <!-- Menu principal -->
      <nav class="flex items-center gap-6 text-sm text-gray-700">
        <NuxtLink to="/" class="hover:text-indigo-600">Accueil</NuxtLink>
        <NuxtLink to="/favorites" class="hover:text-indigo-600">Favoris</NuxtLink>
        <NuxtLink to="/negotiations" class="hover:text-indigo-600">Négociations</NuxtLink>
        <NuxtLink to="/bookings" class="hover:text-indigo-600">Réservations</NuxtLink>

        <!-- Menu utilisateur -->
        <div class="relative">
          <button @click="toggleMenu" class="flex items-center gap-1 hover:text-indigo-600">
            <Icon name="mdi:account-circle" class="w-5 h-5" />
            <span>{{ user ? 'Mon compte' : 'Connexion' }}</span>
          </button>

          <!-- Dropdown -->
          <div
            v-if="showMenu"
            class="absolute right-0 mt-2 w-40 bg-white border rounded shadow text-sm z-50"
          >
            <NuxtLink
              v-if="user"
              to="/account"
              class="block px-4 py-2 hover:bg-gray-100"
              @click="showMenu = false"
            >Profil</NuxtLink>

            <button
              v-if="user"
              @click="signOut().then(() => router.push('/'))"
              class="w-full text-left px-4 py-2 hover:bg-gray-100"
            >Déconnexion</button>

            <NuxtLink
              v-else
              to="/login"
              class="block px-4 py-2 hover:bg-gray-100"
              @click="showMenu = false"
            >Se connecter</NuxtLink>
            <NuxtLink
              v-else
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
