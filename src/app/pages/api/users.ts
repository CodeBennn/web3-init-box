import { supabase } from "../../lib/supabase";

export default async function saveUser() {
  const tableName = "vase_accounts";
  const userData = {
    userName: "vase",
    email: "vase@test.com",
  };
  try {
    await supabase.from(tableName).insert(userData);
    alert('User added successfully!');
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}
