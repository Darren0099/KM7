"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Shell from "../../components/Shell";
import { useStore, save } from "../../lib/store";

export default function Login() {
  const s = useStore();
  const r = useRouter();
  const [name, setName] = useState("");
  const go = () => {
    const n = name.trim();
    if (!n) return;
    if (s?.name !== n) save({ name: n, done: {}, xp: 0 }); // nama baru = mulai dari awal
    r.push("/mainapl/dashboard");
  };
  return (
    <Shell>
      <div style={{ maxWidth: 520, margin: "30px auto" }}>
        {s?.name && (
          <div className="card pu" style={{ marginBottom: 16 }}>
            <p>Perangkat ini sedang masuk sebagai <b>{s.name}</b>.</p>
            <Link className="btn" href="/mainapl/dashboard"><i>→</i>Lanjutkan sebagai {s.name}</Link>
          </div>
        )}
        <div className="card">
          <h1 style={{ fontSize: "2.1rem" }}>{s?.name ? "Bukan kamu?" : "Siapa namamu?"}</h1>
          <p style={{ marginTop: 10 }}>Nama dipakai di modul dan sertifikat. Tidak perlu nama asli, dan tidak dikirim ke server. {s?.name ? "Masuk dengan nama lain akan memulai semua progres dari awal." : ""}</p>
          <input className="in" placeholder="Nama panggilan" value={name} maxLength={30} aria-label="Nama panggilan"
            onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go()} />
          <button className="btn" onClick={go} disabled={!name.trim()}><i>→</i>Mulai belajar</button>
        </div>
      </div>
    </Shell>
  );
}
