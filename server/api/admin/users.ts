// server/api/list-users.ts
import { serverSupabaseServiceRole } from '#supabase/server'
import { defineEventHandler, createError } from 'h3'

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseServiceRole(event)

    const { data, error } = await supabase.auth.admin.listUsers()
    if (error) {
        console.error('Erreur Supabase:', error)
        throw createError({ statusCode: 500, statusMessage: error.message })
    }

    return data.users
})
