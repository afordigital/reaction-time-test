import supabase from "../db/supabase.js";
// This file contains the logic to interact with the users table in the database

export const getUsers = async () => {
    const users = await supabase
    .from("users")
    .select()
    .order("score", { ascending: true })
    .limit(10);

    return { data: users.data };
};

export const insertUser = async (name, score) => {
    await supabase.from("users").insert({ name, score });
    return { res: "ok" };
}

export const updateUser = async (id, name, score) => {
    await supabase.from("users").update({ id, score }).eq('name', name);
    return { res: "ok" };
}