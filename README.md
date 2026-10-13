# AsaKita (Next.js + TypeScript)

Platform belajar pencegahan kekerasan untuk perempuan muda sebelum menikah.

    npm install
    npm run dev      # buka http://localhost:3000

Alur: Landing (public/landing) -> /login -> /mainapl/dashboard -> modul bertahap (video, materi, pertanyaan) -> kuis kartu -> sertifikat -> dashboard. Bantuan: /bantuan.
Login masih lokal (nama panggilan, disimpan di localStorage). Progres juga di localStorage.
Konten modul ada di `lib/data.ts (isi modul, kartu kuis, ID video YouTube)`; tambah modul cukup menambah objek baru di sana.
