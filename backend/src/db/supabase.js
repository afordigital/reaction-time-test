import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.PROJECT_URL, process.env.API_KEY);

export default supabase;