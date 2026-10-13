"use client";
import Link from "next/link";
import Shell from "../../../components/Shell";
import { MODULES, level, rank } from "../../../lib/data";
import { useStore } from "../../../lib/store";

export default function Dashboard() {
  const s = useStore();
  const done: Record<string, number> = s?.done ?? {};
  const xp = s?.xp ?? 0;
  const n = MODULES.filter((m) => m.id in done).length;
  const cur = MODULES.findIndex((m) => !(m.id in done));
  const open = (k: number) => k === 0 || MODULES[k - 1].id in done;
  const badges: [string, boolean][] = [
    ["Langkah pertama", n >= 1], ["Setengah jalan", n >= 3], ["Tamat belajar", n === MODULES.length],
    ["Kartu sempurna", Object.values(done).some((v) => v === 3)],
  ];
  return (
    <Shell auth>
      <section className="herox">
        <div className="card dk herol">
          <p className="tag">Level {level(xp)}: {rank(xp)}</p>
          <h1>Halo, {s?.name}! Yuk lanjut belajar.</h1>
          <p>Kenali risiko pernikahan dini, hak hukummu, dan cara mencari bantuan lewat misi singkat.</p>
          <div className="bar"><div style={{ width: `${xp % 100}%` }} /></div>
          <p className="tag">{xp} XP, {100 - (xp % 100)} XP lagi menuju level {level(xp) + 1}</p>
          {cur === -1
            ? <Link className="btn" href={`/mainapl/sertifikat/${MODULES[MODULES.length - 1].id}`}><i>→</i>Lihat sertifikat</Link>
            : <Link className="btn" href={`/mainapl/modul/${MODULES[cur].id}`}><i>→</i>{n === 0 ? "Mulai misi pertama" : "Lanjutkan misi"}</Link>}
        </div>
        <div className="heror">
          <img src="/img/Mod4.jpg" alt="Perempuan muda tersenyum di dapur" />
          <span className="float f1">{n}/{MODULES.length} modul selesai</span>
          <span className="float f2">{xp} XP</span>
        </div>
      </section>

      <h2>Peta misi</h2>
      <ol className="path">
        {MODULES.map((m, k) => (
          <li key={m.id} className={"node" + (m.id in done ? " done" : k === cur ? " cur" : "")}>
            <div className="dot">{m.id in done ? "✓" : k + 1}</div><p>{m.title}</p>
          </li>
        ))}
      </ol>

      <h2>Lencana</h2>
      <div className="row" style={{ marginTop: 0 }}>
        {badges.map(([b, got]) => <span key={b} className={"chip" + (got ? " pu" : " lock")}>{got ? "★" : "🔒"} {b}</span>)}
      </div>

      <h2>Semua modul</h2>
      <div className="grid">
        {MODULES.map((m, k) => (
          <div key={m.id} className={"mcard" + (open(k) ? "" : " lock")}>
            <div className="mcover" style={{ backgroundImage: `url(${m.cover})` }}>
              <span className="mtag">{m.id in done ? `Selesai ${done[m.id]}/${m.cards.length}` : open(k) ? "Terbuka" : "Terkunci"}</span>
            </div>
            <div className="mbody">
              <h3>{m.title}</h3><p>{m.desc}</p>
              <p className="tag">{m.video ? "Video, " : ""}{m.steps.length} materi, kuis kartu</p>
              <div className="row">
                {open(k) && <Link className="chip pu" href={`/mainapl/modul/${m.id}`}>{m.id in done ? "Ulangi" : "Mulai"}</Link>}
                {m.id in done && <Link className="chip" href={`/mainapl/sertifikat/${m.id}`}>Sertifikat</Link>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}
