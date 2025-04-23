<template>
    <div>
        <h1>Connexion</h1>
        <form @submit.prevent="login">
            <input v-model="email" type="email" placeholder="Email" />
            <input v-model="password" type="password" placeholder="Mot de passe" />
            <button type="submit">Se connecter</button>
        </form>
    </div>
</template>

<script setup>
    const email = ref('')
    const password = ref('')

    const client = useSupabaseClient()

    const login = async () => {
        if (!client) {
            console.error('Supabase client is not initialized.')
            return
        }

        const { data, error } = await client.auth.signInWithPassword({
            email: email.value,
            password: password.value
        })

        if (error) {
            alert(error.message)
        } else {
            useRouter().push('/admin')
        }
    }
</script>
