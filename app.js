
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tjnagdjelhjyqalistir.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

sbp_e4e6958da4eb45d63e89581a336672b0177cfa03