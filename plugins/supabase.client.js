import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  console.log('Config Supabase:', {
    url: config.public.SUPABASE_URL,
    key: config.public.SUPABASE_KEY
  })

  const supabaseUrl = config.public.SUPABASE_URL
  const supabaseKey = config.public.SUPABASE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Les variables d\'environnement Supabase ne sont pas définies')
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  return {
    provide: {
      supabase
    }
  }
}) 