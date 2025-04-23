export default defineNuxtRouteMiddleware(async (to, from) => {
    const protectedRoutes = ['/admin']

    if (protectedRoutes.some(route => to.path.startsWith(route))) {
        const client = useSupabaseClient()
        const user = useSupabaseUser()

        if (!user.value) {
            const { data, error } = await client.auth.getUser()
            if (error || !data.user) {
                return navigateTo('/login')
            }
        }
    }
})
