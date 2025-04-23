<template>
    <div>
        <h1>Bienvenue à notre hôtel</h1>
        <p>Nous sommes heureux de vous accueillir !</p>
        <button @click="navigateTo('/hotel')">Voir notre hôtel</button>
        <button @click="navigateTo('/admin')">Voir la page admin</button>
        <button @click="navigateTo('/map')">Voir la map</button>
        <template v-if="!isLoading">
            <button v-if="!isLoggedIn" @click="navigateTo('/login')">Se connecter</button>
            <button v-else @click="logout()">Se déconnecter</button>
        </template>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router'
    import { ref, onMounted } from 'vue'

    const client = useSupabaseClient()
    const router = useRouter()
    const isLoggedIn = ref(false)
    const isLoading = ref(true)

    const navigateTo = (path) => {
        router.push(path)
    }

    const logout = async () => {
        await client.auth.signOut()
        isLoggedIn.value = false
    }

    onMounted(async () => {
        const { data: { user } } = await client.auth.getUser()
        isLoggedIn.value = !!user
        isLoading.value = false
    })
</script>
