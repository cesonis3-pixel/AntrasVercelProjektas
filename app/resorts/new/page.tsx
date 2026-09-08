import { redirect } from "next/navigation";
import { createAuthClient } from "../../../utils/supabase/auth-server";
import { ResortForm } from "../resort-form";

export default async function NewResortPage() {
  const client = await createAuthClient();
  const { data: { user } } = await client.auth.getUser();
  if (!user) redirect("/login");
  return <ResortForm />;
}
