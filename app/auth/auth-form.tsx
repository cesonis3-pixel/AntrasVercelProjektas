"use client";

import Link from "next/link";
import { useActionState } from "react";
import { authenticate, type AuthState } from "./actions";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [state, action, pending] = useActionState(authenticate.bind(null, mode), {} as AuthState);
  const register = mode === "register";
  return (
    <main className="auth-page container">
      <Link href="/">← Grįžti į kurortus</Link>
      <section className="auth-card">
        <h1>{register ? "Registracija" : "Prisijungimas"}</h1>
        <p>{register ? "Susikurkite Kalnų draugų paskyrą." : "Prisijunkite prie savo paskyros."}</p>
        <form action={action}>
          <label htmlFor="email">El. paštas</label>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} />
          <label htmlFor="password">Slaptažodis{register ? " (bent 8 simboliai)" : ""}</label>
          <input id="password" name="password" type="password" autoComplete={register ? "new-password" : "current-password"} minLength={register ? 8 : undefined} required />
          {register && <><label htmlFor="confirmPassword">Pakartokite slaptažodį</label><input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required minLength={8} /></>}
          {state.error && <p className="auth-error" role="alert">{state.error}</p>}
          {state.message && <p role="status">{state.message}</p>}
          <button className="button" disabled={pending}>{pending ? "Palaukite…" : register ? "Registruotis" : "Prisijungti"}</button>
        </form>
        <p>{register ? "Jau turite paskyrą?" : "Dar neturite paskyros?"} <Link href={register ? "/login" : "/register"}>{register ? "Prisijunkite" : "Registruokitės"}</Link></p>
      </section>
    </main>
  );
}
