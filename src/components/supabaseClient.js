import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://eoyrwjrjsfzkokcuhvtm.supabase.co";
const supabaseAnonKey =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVveXJ3anJqc2Z6a29rY3VodnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4NDgzMzEsImV4cCI6MjAxNzQyNDMzMX0.H2mwXsDsjgl7G1VjgYUn9CIavHkKNQ_ihlUOSVLG6f0"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)