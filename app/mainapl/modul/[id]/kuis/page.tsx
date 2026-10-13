"use client";
import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Shell from "../../../../../components/Shell";
import { MODULES, PASS, XP_PASS } from "../../../../../lib/data";
import { useStore, save } from "../../../../../lib/store";

const TONES: [string, string][] = [["#b9a2ff", "#2a1410"], ["#ff6a3d", "#2a1410"], ["#2a1410", "#ffffff"]];

export default function Kuis() {
  const { id } = useParams<{ id: string }>();
  const s = useStore();
  const m = MODULES.find((x) => x.id === id);
  const [i, setI] = useState(0);
  const [ans, setAns] = useState<boolean | null>(null);
  const [sc, setSc] = useState(0);
  const [gain, setGain] = useState(0);
  const [end, setEnd] = useState(false);
  if (!m) return <Shell auth><p>Modul tidak ditemukan.</p></Shell>;
  const c = m.cards[i];
  const choose = (v: boolean) => { if (ans === null) { setAns(v); if (v === c.f) setSc(sc + 1); } };
  const next = () => {
    if (i + 1 < m.cards.length) { setI(i + 1); setAns(null); return; }
    if (s && sc >= PASS) {
      const g = m.id in s.done ? 0 : XP_PASS;
      save({ ...s, done: { ...s.done, [m.id]: Math.max(sc, s.done[m.id] ?? 0) }, xp: s.xp + g });
      setGain(g);
    }
    setEnd(true);
  };
  const retry = () => { setI(0); setAns(null); setSc(0); setGain(0); setEnd(false); };
  if (end) {
    const ok = sc >= PASS;
    return (
      <Shell auth>
        <div className={"card " + (ok ? "pu" : "or")} style={{ marginTop: 20 }}>
          <h1 style={{ fontSize: "2.2rem" }}>{ok ? "Misi selesai!" : "Hampir, coba lagi ya"}</h1>
          <p>Kamu menebak {sc} dari {m.cards.length} kartu dengan benar.{gain ? ` Bonus +${gain} XP.` : ""}</p>
          <div className="row">
            {ok ? <><Link className="chip" href={`/mainapl/sertifikat/${m.id}`}>Ambil sertifikat</Link><Link className="chip exit" href="/mainapl/dashboard">Kembali ke dashboard</Link></>
              : <><button className="chip" onClick={retry}>Main lagi</button><Link className="chip exit" href={`/mainapl/modul/${m.id}`}>Baca modul lagi</Link></>}
          </div>
        </div>
      </Shell>
    );
  }
  return (
    <Shell auth>
      <p className="tag">Kuis kartu: kartu {i + 1} dari {m.cards.length}, benar {sc}. Tebak: mitos atau fakta?</p>
      <div className="deck" aria-live="polite">
        {m.cards.map((k, j) => {
          const d = j - i, t = TONES[j % 3];
          const st: CSSProperties = d < 0
            ? { transform: "translateX(130%) rotate(16deg)", opacity: 0, pointerEvents: "none" }
            : { transform: `translateY(${d * 16}px) scale(${1 - d * 0.05}) rotate(${d === 0 ? 0 : d % 2 ? 3 : -3}deg)`, zIndex: 10 - d, opacity: d > 2 ? 0 : 1 };
          const top = j === i;
          return (
            <div key={k.s} className="kc" style={st}>
              <div className={"fl" + (top && ans !== null ? " flip" : "")}>
                <div className="face" style={{ background: t[0], color: t[1] }}>
                  <p className="tag">Kartu {j + 1}</p><h2>{k.s}</h2>
                </div>
                <div className="face back" style={{ background: t[0], color: t[1] }}>
                  <p className="tag">{top && ans !== null ? (ans === k.f ? "Tebakanmu benar" : "Belum tepat") : ""}</p>
                  <h2>{k.f ? "Ini fakta." : "Ini mitos."}</h2><p>{k.w}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="row c">
        {ans === null ? (<>
          <button className="btn" style={{ background: "var(--ink)", color: "#fff" }} onClick={() => choose(false)}><i style={{ color: "var(--ink)" }}>←</i>Mitos</button>
          <button className="btn" onClick={() => choose(true)}><i>→</i>Fakta</button></>
        ) : <button className="btn" onClick={next}><i>→</i>{i + 1 < m.cards.length ? "Kartu berikutnya" : "Lihat hasil"}</button>}
      </div>
    </Shell>
  );
}
