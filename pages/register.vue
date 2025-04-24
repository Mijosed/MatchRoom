<script setup>
const client = useSupabaseClient()

const email = ref('')
const password = ref('')
const errorMsg = ref(null)
const successMsg = ref(null)

const signup = async () => {
  const { data, error } = await client.auth.signUp({
    email: email.value,
    password: password.value
  })

  if (error) {
    errorMsg.value = error.message
    successMsg.value = null
  } else {
    successMsg.value = 'Un e-mail de confirmation vous a été envoyé.'
    errorMsg.value = null
  }
}
</script>

<template>
  <div class="h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md p-6 bg-white rounded-xl shadow">
      <h1 class="text-2xl font-bold mb-4 text-center">Créer un compte</h1>
      <form @submit.prevent="signup" class="space-y-4">
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
          S'inscrire
        </button>
      </form>
      <p v-if="errorMsg" class="text-red-500 mt-4 text-sm">{{ errorMsg }}</p>
      <p v-if="successMsg" class="text-green-600 mt-4 text-sm">{{ successMsg }}</p>
    </div>
  </div>
</template>
