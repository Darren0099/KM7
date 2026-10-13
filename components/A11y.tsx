"use client";
import { useEffect, useState } from "react";
type A = { size: number; contrast: boolean; dys: boolean; calm: boolean };
const K = "asakita-a11y";
const def: A = { size: 100, contrast: false, dys: false, calm: false };

export default function A11y() {
  const [open, setOpen] = useState(false);
  const [a, setA] = useState<A>(def);
  useEffect(() => { try { setA({ ...def, ...JSON.parse(localStorage.getItem(K) ?? "null") }); } catch {} }, []);
  useEffect(() => {
    const r = document.documentElement;
    r.style.fontSize = `${a.size}%`;
    r.dataset.contrast = a.contrast ? "1" : "";
    r.dataset.dys = a.dys ? "1" : "";
    r.dataset.motion = a.calm ? "1" : "";
    try { localStorage.setItem(K, JSON.stringify(a)); } catch {}
  }, [a]);
  const read = () => {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(document.querySelector("main")?.textContent ?? "");
    u.lang = "id-ID";
    speechSynthesis.speak(u);
  };
  const Toggle = ({ k, label }: { k: "contrast" | "dys" | "calm"; label: string }) => (
    <div className="sw"><span>{label}</span>
      <button className={"chip" + (a[k] ? " pu" : "")} aria-pressed={a[k]} onClick={() => setA({ ...a, [k]: !a[k] })}>{a[k] ? "Aktif" : "Mati"}</button></div>
  );
  return (
    <div className="a11y">
      <button className="chip" aria-expanded={open} onClick={() => setOpen(!open)}>Aksesibilitas</button>
      {open && (
        <div className="a11y-panel" role="dialog" aria-label="Pengaturan aksesibilitas">
          <div className="sw"><span>Ukuran teks ({a.size}%)</span>
            <span className="row" style={{ margin: 0 }}>
              <button className="chip" aria-label="Perkecil teks" onClick={() => setA({ ...a, size: Math.max(85, a.size - 10) })}>A-</button>
              <button className="chip" aria-label="Perbesar teks" onClick={() => setA({ ...a, size: Math.min(160, a.size + 10) })}>A+</button></span></div>
          <Toggle k="contrast" label="Kontras tinggi" />
          <Toggle k="dys" label="Font ramah disleksia" />
          <Toggle k="calm" label="Kurangi animasi" />
          <div className="row"><button className="chip pu" onClick={read}>Bacakan halaman</button><button className="chip" onClick={() => speechSynthesis.cancel()}>Berhenti</button>
            <button className="chip" onClick={() => setA(def)}>Reset</button></div>
        </div>
      )}
    </div>
  );
}
