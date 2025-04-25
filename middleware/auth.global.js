export default defineNuxtRouteMiddleware(async (to, from) => {
    const protectedRoutes = {
        '/admin': 'admin',
        '/owner': 'owner'
    }

    const matchingRoute = Object.keys(protectedRoutes).find(route => to.path.startsWith(route))
    if (matchingRoute) {
        const supabase = useSupabaseClient()
        const nuxtUser = useSupabaseUser()

        let user = nuxtUser.value
        if (!user) {
            const { data: authData, error: authError } = await supabase.auth.getUser()
            if (authError || !authData.user) {
                return navigateTo('/login')
            }
            user = authData.user
        }

        const { data: profile, error: profileError } = await supabase
            .from('user_informations')
            .select('role')
            .eq('id', user.id)
            .single()

        if (profileError || !profile) {
            return navigateTo('/login')
        }

        const requiredRole = protectedRoutes[matchingRoute]
        if (profile.role !== requiredRole) {
            return navigateTo(profile.role === 'client' ? '/' : `/${profile.role}`)
        }
    }
})
