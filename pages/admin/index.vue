<template>
    <div>
        <h1>Liste des hôtels</h1>
        <div v-if="loading">Chargement...</div>
        <ul v-else>
            <li v-for="hotel in hotels" :key="hotel.id">{{ hotel.name }} - {{ hotel.address }}</li>
        </ul>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: 'auth'
    })

    const client = useSupabaseClient()
    const hotels = ref([])
    const loading = ref(true)

    const getHotels = async () => {
        loading.value = true
        const { data, error } = await client.from('hotel').select('*')

        if (error) {
            console.error('Erreur:', error)
        } else {
            hotels.value = data
        }
        loading.value = false
    }

    onMounted(() => {
        getHotels()
    })
</script>
