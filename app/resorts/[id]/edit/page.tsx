import { notFound, redirect } from "next/navigation";
import { createAuthClient } from "../../../../utils/supabase/auth-server";
import { ResortForm } from "../../resort-form";

export default async function EditResortPage({ params }: { params: Promise<{ id: string }> }) {
  const client = await createAuthClient();
  const { data: { user } } = await client.auth.getUser();
  if (!user) redirect("/login");
  const { id } = await params;
  const { data, error } = await client.from("resorts").select("id, name, country, description, category, blue_km, red_km, black_km").eq("id", id).eq("user_id", user.id).maybeSingle();
  if (error || !data) notFound();
  return <ResortForm resort={data} />;
}
