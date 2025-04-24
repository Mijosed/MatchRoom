<template>
    <div>
        <section>
            <h1>Liste des hôtels</h1>
            <div v-if="loadingHotels">Chargement des hôtels...</div>
            <ul v-else>
                <li v-for="hotel in hotels" :key="hotel.id">
                    <h2>{{ hotel.name }}</h2>
                    <p>Adresse : {{ hotel.address }}</p>
                    <p>Téléphone : {{ hotel.phone }}</p>
                    <p>Email : {{ hotel.email }}</p>
                    <p>Description : {{ hotel.description }}</p>
                    <p>Tags : {{ hotel.tags }}</p>
                </li>
            </ul>
        </section>

        <section>
            <h1>Liste des utilisateurs</h1>
            <div v-if="loadingUsers">Chargement des utilisateurs...</div>
            <ul v-else>
                <li v-for="user in users" :key="user.id">
                    <h2>{{ user.email || 'Email inconnu' }}</h2>
                    <p>Rôle : {{ user.role || 'Sans rôle' }}</p>
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: 'auth',
        layout: 'admin'
    })

    const client = useSupabaseClient()

    const { data: hotelsData, pending: loadingHotels } = await useAsyncData('hotels', fetchHotels)
    const hotels = computed(() => hotelsData.value || [])

    async function fetchHotels() {
        const { data, error } = await client.from('hotel').select('*')
        if (error) {
            console.error('Erreur lors du chargement des hôtels:', error)
            return []
        }
        return data
    }

    const { data: rawUsersData, pending: loadingUsers } = await useAsyncData('admin-users', () =>
        $fetch('/api/admin/users')
    )

    const users = ref([])

    watchEffect(() => {
        if (!rawUsersData.value) return
        enrichUsersWithRoles(rawUsersData.value).then((enriched) => {
            users.value = enriched
        })
    })

    async function enrichUsersWithRoles(userList) {
        return Promise.all(
            userList.map(async (user) => {
                const { data, error } = await client
                    .from('user_informations')
                    .select('role')
                    .eq('id', user.id)
                    .limit(1)

                if (error || !data || data.length === 0) {
                    return { ...user, role: 'Rôle inconnu' }
                }

                return { ...user, role: data[0].role || 'Rôle inconnu' }
            })
        )
    }
</script>
