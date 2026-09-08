"use client";
import { useActionState } from "react";
import { deleteResort, type ResortState } from "./actions";

export function DeleteButton({ id, name }: { id: string; name: string }) {
  const [state, action, pending] = useActionState(deleteResort.bind(null, id), {} as ResortState);
  return <form action={action} onSubmit={(event) => { if (!window.confirm(`Ar tikrai ištrinti „${name}“? Šio veiksmo atšaukti negalėsite.`)) event.preventDefault(); }}>
    <button className="button delete-button" disabled={pending}>{pending ? "Trinama…" : "Ištrinti"}</button>
    {state.error && <p className="auth-error" role="alert">{state.error}</p>}
  </form>;
}
