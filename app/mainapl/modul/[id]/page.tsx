"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Shell from "../../../../components/Shell";
import { MODULES, XP_V, XP_Q } from "../../../../lib/data";
import { useStore, save } from "../../../../lib/store";

export default function Modul() {
  const { id } = useParams<{ id: string }>();
  const s = useStore();
  const m = MODULES.find((x) => x.id === id);
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  if (!m) return <Shell auth><p>Modul tidak ditemukan.</p><Link href="/mainapl/dashboard" className="chip">Ke dashboard</Link></Shell>;
  const total = m.steps.length + 1;
  const first = !!s && !(m.id in s.done);
  const award = (n: number) => { if (s && first) save({ ...s, xp: s.xp + n }); };
  const st = i > 0 ? m.steps[i - 1] : null;
  return (
    <Shell auth>
      <div className="mhead" style={{ backgroundImage: `linear-gradient(180deg,#2a141066,#2a1410dd),url(${m.cover})` }}>
        <p className="tag">Modul {MODULES.findIndex((x) => x.id === m.id) + 1} dari {MODULES.length}</p>
        <h1>{m.title}</h1><p>{m.desc}</p>
      </div>
      <div className="stages">
        {["Video", ...m.steps.map((_, k) => `Materi ${k + 1}`), "Kuis kartu"].map((t, k) => (
          <span key={t} className={"stage" + (k === i ? " on" : k < i ? " ok" : "")}>{t}</span>
        ))}
      </div>
      <div className="bar"><div style={{ width: `${((i + 1) / (total + 1)) * 100}%` }} /></div>
      {!st ? (
        <div className="card dk">
          <h2 style={{ marginTop: 0 }}>Tonton videonya dulu</h2>
          {m.video
            ? <div className="vid"><iframe src={`https://www.youtube-nocookie.com/embed/${m.video}`} title={`Video ${m.title}`} allowFullScreen /></div>
            : <p>Video untuk modul ini segera hadir. Kamu bisa langsung lanjut ke materi.</p>}
          <button className="btn" onClick={() => { award(XP_V); setI(1); }}><i>→</i>Lanjut ke materi{first ? ` (+${XP_V} XP)` : ""}</button>
        </div>
      ) : (
        <div className="two">
          <div className="card pu"><h2 style={{ marginTop: 0 }}>{st.t}</h2><p>{st.p}</p></div>
          <div className="card">
            <h3>{st.q[0]}</h3>
            {st.q[1].map((o, k) => (
              <button key={o} disabled={pick !== null} onClick={() => { setPick(k); if (k === st.q[2]) award(XP_Q); }}
                className={"opt" + (pick === null ? "" : k === st.q[2] ? " ok" : k === pick ? " bad" : "")}>{o}</button>
            ))}
            {pick !== null && <p><b>{pick === st.q[2] ? `Tepat${first ? ` (+${XP_Q} XP)` : ""}. ` : "Belum tepat. "}</b>{st.q[3]}</p>}
            {pick !== null && (i === m.steps.length
              ? <Link className="btn" href={`/mainapl/modul/${m.id}/kuis`}><i>→</i>Mulai kuis kartu</Link>
              : <button className="btn" onClick={() => { setI(i + 1); setPick(null); }}><i>→</i>Lanjut</button>)}
          </div>
        </div>
      )}
    </Shell>
  );
}
