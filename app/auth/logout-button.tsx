"use client";
import { useActionState } from "react";
import { logout, type AuthState } from "./actions";

export function LogoutButton() {
  const [state, action, pending] = useActionState(logout, {} as AuthState);
  return <form action={action}><button className="button" disabled={pending}>{pending ? "Atsijungiama…" : "Atsijungti"}</button>{state.error && <p role="alert" className="auth-error">{state.error}</p>}</form>;
}
