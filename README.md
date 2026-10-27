# AsaKita

**Platform belajar untuk mencegah pernikahan dini dan kekerasan terhadap perempuan.**

AsaKita adalah web edukasi interaktif untuk perempuan muda. Pengguna belajar mengenali risiko pernikahan dini, memahami hak hukum, dan tahu ke mana harus mencari bantuan, sebelum masalah terjadi. Belajarnya dibuat seperti game: ada misi, XP, level, lencana, kuis kartu, dan sertifikat.

Proyek ini dibuat untuk KMIPN ke-7.

> AsaKita adalah media edukasi, bukan layanan darurat. Dalam bahaya langsung, hubungi **112**. Untuk pengaduan kekerasan terhadap perempuan dan anak, hubungi **SAPA 129** (telepon 129 atau WhatsApp 08111-129-129).

---

## Fitur

### Landing page
- Halaman perkenalan dengan kartu modul, fitur utama, dan FAQ.
- Logo berputar tanpa jeda, menu hamburger, dan kartu yang bisa digeser di HP.

### Login tanpa data pribadi
- Pengguna cukup memasukkan **nama panggilan**. Nama dipakai di modul dan sertifikat.
- Tidak ada server dan tidak ada database. Nama, progres, dan XP hanya tersimpan di browser perangkat (`localStorage`).
- Masuk dengan nama berbeda otomatis memulai semua progres dari awal.

### Dashboard
- Hero berisi sapaan, level, dan XP, dengan tombol lanjut misi.
- **Peta misi** 6 modul (responsif: grid di laptop, garis vertikal di HP).
- **Lencana** yang terbuka sesuai pencapaian.
- Kartu modul dengan foto sampul. Modul berikutnya terkunci sampai modul sebelumnya lulus.
- Tombol **Aksesibilitas**.

### Modul belajar bertahap
Tiap modul berjalan dalam tahap: **Video, Materi 1, Materi 2, lalu Kuis kartu**. Setiap materi disertai pertanyaan, dan jawaban benar memberi XP.

| No | Modul |
|----|-------|
| 1 | Pengenalan Pernikahan Dini |
| 2 | Aspek Hukum Pernikahan |
| 3 | Dampak Kesehatan |
| 4 | Dampak Psikologis |
| 5 | Pencegahan Pernikahan Dini |
| 6 | Studi Kasus dan Evaluasi |

### Kuis kartu "Mitos atau Fakta"
- Tiga kartu bertumpuk (ungu, oranye, hitam). Kartu paling depan ditebak, lalu dibalik untuk menampilkan penjelasan.
- Lulus jika menebak minimal 2 dari 3 kartu dengan benar. Boleh mengulang.

### Sertifikat
- Sertifikat landscape berisi nama, modul, skor, level, tanggal, dan nomor unik.
- Bisa dicetak atau disimpan sebagai PDF dari browser.

### Butuh Bantuan
- Kartu lembaga dengan tombol telepon, WhatsApp, dan situs resmi: SAPA 129 (KemenPPPA), Komnas Perempuan, LPSK, UPTD PPA, SIMFONI-PPA, dan nomor darurat 112.
- **Peta Google Maps** dengan tab UPTD PPA, Dinas PPPA, Polres, LPSK, dan Rumah sakit. Rumah sakit tampil di sekitar lokasi pengguna (dengan izin lokasi) atau berdasarkan kota yang diketik.
- **Form pengaduan** yang menyusun pesan siap kirim ke WhatsApp SAPA 129. Isi pesan tidak disimpan di AsaKita.

### Aksesibilitas
Tombol Aksesibilitas tersedia di setiap halaman setelah login:
- Ukuran teks (85% sampai 160%)
- Kontras tinggi
- Font ramah disleksia
- Kurangi animasi
- Bacakan halaman (suara) dalam bahasa Indonesia

### Keamanan pengguna
- Tombol **Keluar cepat** di setiap halaman langsung membuka situs netral.
- **Keluar akun** menghapus seluruh data di perangkat.

---

## Teknologi

- [Next.js](https://nextjs.org/) 14 (App Router)
- React 18
- TypeScript (TSX)
- CSS biasa (`app/globals.css`), tanpa framework CSS
- Landing page berupa HTML statis di `public/landing`, disajikan di `/`

---

## Alur penggunaan

```
Landing  ->  Login  ->  Dashboard  ->  Pilih modul
                                          |
                          Video -> Materi -> Kuis kartu
                                          |
                                      Sertifikat  ->  kembali ke Dashboard
```

Halaman **Butuh Bantuan** (`/bantuan`) bisa dibuka kapan saja dari menu atas.

---

## Struktur folder

```
asakita/
├─ app/
│  ├─ layout.tsx
│  ├─ globals.css
│  ├─ login/page.tsx
│  ├─ bantuan/page.tsx
│  └─ mainapl/
│     ├─ dashboard/page.tsx
│     ├─ modul/[id]/page.tsx          # video dan materi bertahap
│     ├─ modul/[id]/kuis/page.tsx     # kuis kartu
│     └─ sertifikat/[id]/page.tsx
├─ components/
│  ├─ Shell.tsx                       # header, menu, keluar cepat
│  └─ A11y.tsx                        # panel aksesibilitas
├─ lib/
│  ├─ data.ts                         # isi modul, kartu kuis, ID video, XP dan level
│  └─ store.ts                        # penyimpanan lokal (nama, progres, XP)
├─ public/
│  ├─ landing/                        # landing page statis (index.html, css, js, image)
│  └─ img/                            # foto sampul modul dan hero
└─ next.config.js                     # "/" diarahkan ke landing page
```

---

## Struktur konten dan rancangan edukasi

- **Materi, pertanyaan, kartu kuis, dan video:** dikelola secara terstruktur melalui `lib/data.ts`; modul memakai objek dalam `MODULES`.
- **Aturan XP dan kelulusan:** ditentukan oleh konstanta `PASS`, `XP_V`, `XP_Q`, dan `XP_PASS` di `lib/data.ts`.
- **Lokasi peta dan kontak lembaga:** dipisahkan ke data `PLACES` dan `CONTACTS` di `app/bantuan/page.tsx`.
- **Tampilan landing:** konten HTML di `public/landing/index.html` dan stylesheet responsif di `public/landing/css/fix.css`.

---

## Catatan

- Rujukan hukum yang dipakai: UU No. 16 Tahun 2019 (batas usia perkawinan), UU No. 23 Tahun 2004 (PKDRT), dan UU No. 12 Tahun 2022 (TPKS). Mohon cek kembali isi materi sebelum dipublikasikan luas.
- Nomor dan tautan lembaga (SAPA 129, LPSK, dan lainnya) sebaiknya diverifikasi berkala karena dapat berubah.
- Peta memakai embed pencarian Google Maps tanpa API key, sehingga hasilnya bergantung pada Google.
- Belum tersedia: konsultasi dengan psikolog, halaman informasi hukum lengkap, dan FAQ pengaduan dari versi HTML sebelumnya.
