"use client";
import { useState } from "react";
import Shell from "../../components/Shell";

type Place = { n: string; ll?: string; url: string };
const TABS = ["UPTD PPA", "Dinas PPPA", "Polres", "LPSK", "Rumah sakit"];
const PLACES: Record<string, Place[]> = {
  "UPTD PPA": [{ n: "UPTD PPA Provinsi Sumatera Selatan", ll: "-2.9768088,104.7489554", url: "https://maps.app.goo.gl/z9UBSxUSX5Be7BBe9" }],
  "Dinas PPPA": [
    { n: "DP3APM Kota Palembang", ll: "-2.9846502,104.7239718", url: "https://maps.app.goo.gl/nReaS3gxiZ9VVcVT9" },
    { n: "DP3A Provinsi Sumsel", ll: "-2.9768503,104.749167", url: "https://maps.app.goo.gl/RcLR58yJUY87fvZN7" },
    { n: "Lokasi lainnya", url: "https://maps.app.goo.gl/JyevmYZN7FTHy5QR8" }],
  "Polres": [{ n: "Polrestabes Palembang", ll: "-3.0018637,104.7717013", url: "https://maps.app.goo.gl/hsJfRUno3MMC25936" }],
  "LPSK": [{ n: "LPSK (kantor pusat, Jakarta)", ll: "-6.3153139,106.863541", url: "https://maps.app.goo.gl/QAtLJ6kuffihiWmD9" }],
};
const CONTACTS = [
  { n: "SAPA 129 (KemenPPPA)", d: "Pengaduan darurat kekerasan terhadap perempuan dan anak.", tel: "129", wa: "628111129129", url: "https://laporsapa129.kemenpppa.go.id/" },
  { n: "Komnas Perempuan", d: "Lembaga negara independen untuk penegakan HAM perempuan dan penghapusan kekerasan.", url: "https://komnasperempuan.go.id" },
  { n: "LPSK", d: "Perlindungan darurat, hukum, dan fasilitasi medis bagi saksi dan korban.", tel: "148", url: "https://www.lpsk.go.id" },
  { n: "UPTD PPA", d: "Unit di provinsi, kabupaten, dan kota yang mendampingi korban secara langsung. Cari yang terdekat di peta." },
  { n: "SIMFONI-PPA", d: "Sistem informasi pelaporan kekerasan KemenPPPA. Pengaduan juga bisa lewat SAPA 129." },
  { n: "Darurat umum", d: "Polisi, ambulans, dan pemadam kebakaran.", tel: "112" },
];

export default function Bantuan() {
  const [tab, setTab] = useState(TABS[0]);
  const [pi, setPi] = useState(0);
  const [geo, setGeo] = useState("");
  const [city, setCity] = useState("");
  const [denied, setDenied] = useState(false);
  const [who, setWho] = useState("");
  const [where, setWhere] = useState("");
  const [story, setStory] = useState("");
  const hosp = tab === "Rumah sakit";
  const places = PLACES[tab] ?? [];
  const pl = places[pi];
  const locate = () => navigator.geolocation?.getCurrentPosition(
    (p) => { setGeo(`${p.coords.latitude},${p.coords.longitude}`); setDenied(false); }, () => setDenied(true));
  const pick = (t: string) => { setTab(t); setPi(0); if (t === "Rumah sakit" && !geo) locate(); };
  const q = encodeURIComponent(hosp ? (geo ? `rumah sakit @${geo}` : `rumah sakit ${city || "terdekat"}`) : pl?.ll ? `${pl.n} @${pl.ll}` : "");
  const src = hosp || pl?.ll ? `https://www.google.com/maps?q=${q}&z=${hosp ? 14 : 16}&output=embed` : "";
  const link = hosp ? `https://www.google.com/maps/search/?api=1&query=${q}` : pl?.url;
  const msg = `Halo SAPA 129, saya ingin mengadu.${who ? ` Nama: ${who}.` : ""}${where ? ` Lokasi: ${where}.` : ""}\n\n${story}`;
  return (
    <Shell>
      <h1 style={{ fontSize: "clamp(1.9rem,5vw,3rem)", margin: "20px 0" }}>Butuh bantuan sekarang?</h1>
      <div className="grid">
        {CONTACTS.map((c, k) => (
          <div key={c.n} className={"card" + (k === 0 ? " or" : k === 5 ? " dk" : "")}>
            <h3>{c.n}</h3><p>{c.d}</p>
            <div className="row">
              {c.tel && <a className="chip" href={`tel:${c.tel}`}>Telepon {c.tel}</a>}
              {c.wa && <a className="chip" href={`https://wa.me/${c.wa}`} target="_blank" rel="noreferrer">WhatsApp</a>}
              {c.url && <a className="chip" href={c.url} target="_blank" rel="noreferrer">Buka situs</a>}
            </div>
          </div>
        ))}
      </div>
      <h2>Peta tempat bantuan</h2>
      <div className="row" style={{ marginTop: 0 }}>
        {TABS.map((t) => <button key={t} className={"chip" + (t === tab ? " pu" : "")} aria-pressed={t === tab} onClick={() => pick(t)}>{t}</button>)}
      </div>
      {!hosp && <div className="row">{places.map((p, k) => <button key={p.n} className={"chip" + (k === pi ? " pu" : "")} onClick={() => setPi(k)}>{p.n}</button>)}</div>}
      {hosp && (
        <div className="row">
          <button className="chip pu" onClick={locate}>Pakai lokasi saya</button>
          <input className="in" style={{ margin: 0, flex: 1, minWidth: 180 }} placeholder="Atau ketik nama kota" aria-label="Kota" value={city}
            onChange={(e) => { setCity(e.target.value); setGeo(""); }} />
        </div>
      )}
      {hosp && denied && <p className="tag">Izin lokasi belum diberikan. Izinkan lokasi di browser, atau ketik nama kotamu.</p>}
      {src ? <iframe className="map" title={`Peta ${tab}`} loading="lazy" src={src} /> : <div className="card" style={{ marginTop: 14 }}><p>Lokasi ini dibuka langsung di Google Maps.</p></div>}
      <div className="row">
        {link && <a className="chip pu" href={link} target="_blank" rel="noreferrer">Buka di Google Maps</a>}
        <a className="chip" target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("UPTD PPA " + city)}`}>Cari UPTD PPA di kotamu</a>
      </div>
      <h2>Ingin mengadu?</h2>
      <div className="card">
        <p>Tulis ceritamu, lalu kirim ke SAPA 129 lewat WhatsApp. Isi ceritamu tidak disimpan di AsaKita. Nama boleh dikosongkan.</p>
        <input className="in" placeholder="Nama panggilan (boleh kosong)" aria-label="Nama" value={who} onChange={(e) => setWho(e.target.value)} />
        <input className="in" placeholder="Kota atau lokasi kejadian" aria-label="Lokasi" value={where} onChange={(e) => setWhere(e.target.value)} />
        <textarea className="in" style={{ borderRadius: 24, minHeight: 120 }} placeholder="Ceritakan apa yang terjadi" aria-label="Cerita" value={story} onChange={(e) => setStory(e.target.value)} />
        <div className="row">
          <a className="btn" target="_blank" rel="noreferrer" href={`https://wa.me/628111129129?text=${encodeURIComponent(msg)}`}><i>→</i>Kirim lewat WhatsApp</a>
          <button className="chip" onClick={() => navigator.clipboard?.writeText(msg)}>Salin teks</button>
          <a className="chip" href="https://laporsapa129.kemenpppa.go.id/" target="_blank" rel="noreferrer">Formulir resmi</a>
        </div>
      </div>
    </Shell>
  );
}
