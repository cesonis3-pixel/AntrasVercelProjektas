"use client";

import Link from "next/link";
import { useActionState } from "react";
import { saveResort, type ResortState } from "./actions";

type Resort = { id: string; name: string; country: string; description: string; category: string; blue_km: number; red_km: number; black_km: number };

export function ResortForm({ resort }: { resort?: Resort }) {
  const [state, action, pending] = useActionState(saveResort.bind(null, resort?.id ?? null), {} as ResortState);
  return <main className="auth-page container">
    <Link href="/">← Grįžti į kurortus</Link>
    <section className="auth-card resort-form">
      <h1>{resort ? "Redaguoti kurortą" : "Pridėti kurortą"}</h1>
      <form action={action}>
        <label htmlFor="name">Pavadinimas</label><input id="name" name="name" required maxLength={150} defaultValue={resort?.name} />
        <label htmlFor="country">Šalis</label><input id="country" name="country" required maxLength={100} defaultValue={resort?.country} />
        <label htmlFor="description">Trumpas aprašymas</label><textarea id="description" name="description" required maxLength={2000} rows={4} defaultValue={resort?.description} />
        <label htmlFor="category">Kurorto tipas</label>
        <select id="category" name="category" defaultValue={resort?.category ?? "Universalus"} required>
          {["Šeimoms", "Pradedantiesiems", "Pažengusiems", "Universalus"].map((category) => <option key={category}>{category}</option>)}
        </select>
        {([ ["blue_km", "Mėlynų trasų kilometrai"], ["red_km", "Raudonų trasų kilometrai"], ["black_km", "Juodų trasų kilometrai"] ] as const).map(([field, label]) => <div className="km-field" key={field}><label htmlFor={field}>{label}</label><input id={field} name={field} type="number" min="0" max="10000" step="0.01" required defaultValue={resort?.[field] ?? 0} /></div>)}
        <p>Bendras trasų kilometrų skaičius apskaičiuojamas sudėjus visas tris trasų kategorijas.</p>
        {state.error && <p role="alert" className="auth-error">{state.error}</p>}
        <button className="button" disabled={pending}>{pending ? "Saugoma…" : "Išsaugoti kurortą"}</button>
      </form>
    </section>
  </main>;
}
