import { supabase } from "./supabase";

export async function createUser(
  email: string,
  password: string,
): Promise<string | undefined> {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    console.error("Error creating user: ", error);
    return undefined;
  }
  return data.user?.id;
}

export async function createProfile(
  uuid: string,
  firstName: string,
  role: string,
): Promise<boolean> {
  const { error } = await supabase
    .from("profiles")
    .insert({ id: uuid, first_name: firstName, role });
  if (error) {
    console.error("Error creating profile: ", error);
    return false;
  }
  return true;
}
