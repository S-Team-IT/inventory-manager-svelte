import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getAllSuppliers() {
    const { error, data } = await supabase
        .from("suppliers")
        .select("*")
        .order("id", { ascending: true });
    if (error) {
        console.error("Error retrieving all suppliers: ", error);
        return;
    }
    return data;
}
