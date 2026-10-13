"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import Shell from "../../../../components/Shell";
import { MODULES, level, rank } from "../../../../lib/data";
import { useStore } from "../../../../lib/store";

export default function Sertifikat() {
  const { id } = useParams<{ id: string }>();
  const s = useStore();
  const m = MODULES.find((x) => x.id === id);
  const got = !!m && !!s && id in s.done;
  const code = got ? `ASA-${id.slice(0, 3).toUpperCase()}-${[...s!.name].reduce((t, c) => t + c.charCodeAt(0), 0)}` : "";
  return (
    <Shell auth>
      {!got ? (
        <div className="card"><h3>Sertifikat belum tersedia</h3><p>Lulus kuis kartu modul ini terlebih dahulu.</p>
          <Link className="btn" href="/mainapl/dashboard"><i>→</i>Ke dashboard</Link></div>
      ) : (<>
        <div className="cwrap"><div className="cert2">
          <div className="seal">★</div>
          <p className="ck">Sertifikat penyelesaian</p>
          <h1 className="cname">{s!.name}</h1>
          <p>telah menuntaskan modul</p>
          <h2 className="cmod">{m!.title}</h2>
          <p>skor kartu {s!.done[id]}/{m!.cards.length}, Level {level(s!.xp)} {rank(s!.xp)}</p>
          <div className="cfoot"><span>{new Date().toLocaleDateString("id-ID", { dateStyle: "long" })}</span><b>AsaKita</b><span>No. {code}</span></div>
        </div></div>
        <div className="row noprint">
          <button className="chip pu" onClick={() => window.print()}>Cetak atau simpan PDF</button>
          <Link className="chip exit" href="/mainapl/dashboard">Kembali ke dashboard</Link>
        </div>
      </>)}
    </Shell>
  );
}
