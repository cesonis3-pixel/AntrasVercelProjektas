"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createAuthClient } from "../../utils/supabase/auth-server";

export type AuthState = { error?: string; message?: string };

export async function authenticate(mode: "login" | "register", _previous: AuthState, form: FormData): Promise<AuthState> {
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password) {
    return { error: "Įveskite el. paštą ir slaptažodį." };
  }
  if (mode === "register" && (password.length < 8 || password !== form.get("confirmPassword"))) {
    return { error: "Slaptažodis turi būti bent 8 simbolių, o abu slaptažodžiai turi sutapti." };
  }
  try {
    const host = (await headers()).get("host");
    const client = await createAuthClient();
    const { data, error } = mode === "register"
      ? await client.auth.signUp({ email, password })
      : await client.auth.signInWithPassword({ email, password });
    if (error) {
      console.error("Auth sign-in result", JSON.stringify({ mode, host, code: error.code, message: error.message, status: error.status }));
      if (error.code === "email_not_confirmed") return { error: "Pirmiausia patvirtinkite el. paštą gautame laiške, tada prisijunkite." };
      if (error.status === 429) return { error: "Per daug bandymų. Palaukite kelias minutes ir bandykite dar kartą." };
      return { error: mode === "login" ? "Nepavyko prisijungti. Patikrinkite el. paštą ir slaptažodį." : "Nepavyko užsiregistruoti. Patikrinkite duomenis arba bandykite prisijungti, jei jau turite paskyrą." };
    }
    if (mode === "login" && process.env.NODE_ENV === "development") console.info("Auth sign-in result", JSON.stringify({ host, success: true, hasSession: Boolean(data.session) }));
    if (!data.session) return { message: "Patikrinkite el. paštą. Jei reikalingas patvirtinimas, paspauskite laiške gautą nuorodą, tada grįžkite čia ir prisijunkite. Jei paskyrą jau turite, eikite į prisijungimo puslapį." };
  } catch {
    return { error: "Nepavyko susisiekti su prisijungimo paslauga. Bandykite dar kartą." };
  }
  redirect("/");
}

export async function logout(): Promise<AuthState> {
  try {
    const client = await createAuthClient();
    const { error } = await client.auth.signOut({ scope: "local" });
    if (error) return { error: "Nepavyko atsijungti. Bandykite dar kartą." };
  } catch {
    return { error: "Nepavyko atsijungti. Patikrinkite interneto ryšį." };
  }
  redirect("/login");
}
