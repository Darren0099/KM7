"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useStore, clear } from "../lib/store";
import { level } from "../lib/data";
import A11y from "./A11y";

export default function Shell({ auth, children }: { auth?: boolean; children: ReactNode }) {
  const s = useStore();
  const r = useRouter();
  useEffect(() => { if (auth && s && !s.name) r.replace("/login"); }, [auth, s, r]);
  if (auth && (!s || !s.name)) return null;
  const logout = () => { clear(); window.location.href = "/"; };
  return (
    <div className="wrap">
      <header className="top">
        {s?.name ? <Link href="/mainapl/dashboard" className="logo">Asa<b>Kita</b></Link> : <a href="/" className="logo">Asa<b>Kita</b></a>}
        <nav className="nav">
          {s?.name && <span className="chip lv">Level {level(s.xp)}, {s.xp} XP</span>}
          <Link href="/bantuan" className="chip pu">Butuh bantuan</Link>
          <A11y />
          {s?.name && <button className="chip" onClick={logout}>Keluar akun</button>}
          <button className="chip exit" onClick={() => window.location.replace("https://www.google.com")}>Keluar cepat</button>
        </nav>
      </header>
      <main>{children}</main>
      <p className="foot">AsaKita adalah media edukasi, bukan layanan darurat. Dalam bahaya langsung, hubungi 112. Data hanya tersimpan di browser ini.</p>
    </div>
  );
}
