import { redirect } from "next/navigation";
import { createAuthClient } from "../../utils/supabase/auth-server";
import { AuthForm } from "../auth/auth-form";

export default async function RegisterPage() {
  const client = await createAuthClient();
  const { data: { user } } = await client.auth.getUser();
  if (user) redirect("/");
  return <AuthForm mode="register" />;
}
