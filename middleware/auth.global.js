export default defineNuxtRouteMiddleware(async (to, from) => {
    const protectedRoutes = ['/admin']
    if (protectedRoutes.some(route => to.path.startsWith(route))) {
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

        if (profile.role === 'client') {
            return navigateTo('/')
        }
    }
})
