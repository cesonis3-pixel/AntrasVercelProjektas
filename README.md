# Kalnų draugai

Pradinis slidinėjimo kurortų bendruomenės puslapis, sukurtas su Next.js ir TypeScript.

## Paleidimas

Įdiekite paketus: `npm install`.

Paleiskite vietinį serverį: `npm run dev`.

Naršyklėje atidarykite http://localhost:3000.

Windows PowerShell aplinkoje, jei blokuojamas `npm.ps1`, naudokite `npm.cmd install` ir `npm.cmd run dev`.

## Patikra

- `npm run lint` – kodo patikra.
- `npm run build` – produkcinės versijos surinkimas.

Pradinis puslapis serverio pusėje skaito viešus įrašus iš Supabase `public.resorts` lentelės. `/register` ir `/login` naudoja Supabase Auth. Sesija laikoma slapukuose ir atnaujinama per `proxy.ts`; kurortų skaitymo klientas lieka viešas ir nesusietas su paskyra.

Registruojantis, jei Supabase reikalauja el. pašto patvirtinimo, atidarykite gautą laišką, patvirtinkite adresą ir grįžkite į vietinį `/login` puslapį. Patvirtinimo laiškų siuntimas priklauso nuo Supabase projekto el. pašto nustatymų. Prisijungę perkraukite puslapį, patikrinkite rodomą el. paštą, tada spauskite „Atsijungti“ ir dar kartą perkraukite puslapį.

Vietiniam veikimui `.env.local` faile nustatykite `NEXT_PUBLIC_SUPABASE_URL` ir `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Šis failas ignoruojamas pagal `.gitignore` ir neturi būti keliamas į GitHub. Naudojamas tik viešas raktas ir esama viešo skaitymo RLS taisyklė.
