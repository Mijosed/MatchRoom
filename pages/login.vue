<script setup>
const client = useSupabaseClient()
const router = useRouter()

const email = ref('')
const password = ref('')
const errorMsg = ref(null)

const login = async () => {
  const { data, error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    errorMsg.value = error.message
  } else {
    router.push('/')
  }
}
</script>

<template>
  <div class="h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md p-6 bg-white rounded-xl shadow">
      <h1 class="text-2xl font-bold mb-4 text-center">Connexion</h1>
      <form @submit.prevent="login" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full border rounded px-4 py-2"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Mot de passe"
          class="w-full border rounded px-4 py-2"
        />
        <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded">
          Se connecter
        </button>
      </form>
      <p v-if="errorMsg" class="text-red-500 mt-4 text-sm">{{ errorMsg }}</p>
    </div>
  </div>
</template>
