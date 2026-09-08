import Link from "next/link";
import { DeleteButton } from "./resorts/delete-button";
import { createAuthClient } from "../utils/supabase/auth-server";
import { LogoutButton } from "./auth/logout-button";
import { connection } from "next/server";
import { createSupabaseClient } from "../utils/supabase/server";

export default async function Home() {
  await connection();
  const auth = await createAuthClient();
  const { data: { user } } = await auth.auth.getUser();
  const supabase = createSupabaseClient();
  const { data: resorts, error } = await supabase
    .from("resorts")
    .select("id, user_id, name, country, description, total_km, blue_km, red_km, black_km, category")
    .order("created_at", { ascending: false });

  return (
    <>
      <a className="skip-link" href="#turinys">Pereiti prie turinio</a>
      <header className="site-header container">
        <Link className="brand" href="/" aria-label="Kalnų draugai – pradinis puslapis">
          <span className="brand-icon" aria-hidden="true">△</span>
          Kalnų draugai<span className="brand-dot">.</span>
        </Link>
        <nav className="auth-nav" aria-label="Paskyra">
          {user ? <><span>Prisijungęs: <strong>{user.email}</strong></span><LogoutButton /></> : <><Link href="/login">Prisijungti</Link><Link className="button" href="/register">Registruotis</Link></>}
        </nav>
      </header>

      <main id="turinys" className="container">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">SLIDINĖJIMO KURORTŲ BENDRUOMENĖ</p>
            <h1 id="hero-title">Kalnai kviečia.<br /><span>Atrask savuosius.</span></h1>
            <p className="intro">Vieta tiems, kurie žiemą svajoja apie sniegą, trasas ir kitą kelionę į kalnus. Čia prasideda mūsų slidinėjimo bendruomenė.</p>
            <a className="button" href="#kurortai">Peržiūrėti kurortus <span aria-hidden="true">↓</span></a>
          </div>
          <div className="mountain-art" aria-hidden="true">
            <div className="sun" />
            <div className="mountain mountain-back" />
            <div className="mountain mountain-front" />
            <div className="mountain mountain-near" />
            <div className="art-caption">DAUGIAU KALNŲ. DAUGIAU ATRADIMŲ.</div>
          </div>
        </section>

        <section id="kurortai" className="resorts" aria-labelledby="resorts-title">
          <div className="section-heading">
            <div><p className="eyebrow">TAVO KITOS KELIONĖS PRADŽIA</p><h2 id="resorts-title">Kurortų sąrašas</h2></div>
            {user ? <Link className="button" href="/resorts/new">Pridėti kurortą</Link> : <span className="badge">Bendruomenė pradeda kurtis</span>}
          </div>
          {error ? (
            <div className="empty-state" role="alert">
              <h3>Nepavyko įkelti kurortų</h3>
              <p>Pabandykite atnaujinti puslapį po kelių akimirkų.</p>
            </div>
          ) : resorts && resorts.length > 0 ? (
            <ul className="resort-list">
              {resorts.map((resort) => (
                <li key={resort.id} className="resort-card">
                  <div className="resort-meta">
                    <span>{resort.country}</span>
                    {resort.category && <span className="badge">{resort.category}</span>}
                  </div>
                  <h3>{resort.name}</h3>
                  <p>{resort.description}</p>
                  <dl className="resort-stats">
                    <div><dt>Iš viso trasų</dt><dd>{resort.total_km ?? "–"} km</dd></div>
                    <div><dt>Mėlynos</dt><dd>{resort.blue_km ?? "–"} km</dd></div>
                    <div><dt>Raudonos</dt><dd>{resort.red_km ?? "–"} km</dd></div>
                    <div><dt>Juodos</dt><dd>{resort.black_km ?? "–"} km</dd></div>
                  </dl>
                  {user && resort.user_id === user.id && <div className="resort-actions"><Link className="button" href={`/resorts/${resort.id}/edit`}>Redaguoti</Link><DeleteButton id={resort.id} name={resort.name} /></div>}
                </li>
              ))}
            </ul>
          ) : (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">❄</span>
            <h3>Pirmieji atradimai – dar priešakyje</h3>
            <p>Kurortų įrašų kol kas nėra. Netrukus čia bus galima atrasti slidinėjimo vietas ir planuoti savo kelionę į kalnus.</p>
          </div>
          )}
        </section>
      </main>

      <footer className="site-footer container">
        <span>Kalnų draugai</span>
        <p>Visiems, kuriuos traukia kalnai.</p>
      </footer>
    </>
  );
}
