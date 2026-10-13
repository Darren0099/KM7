export const PASS = 2; // kartu benar minimal untuk lulus
export const XP_V = 20, XP_Q = 10, XP_PASS = 50;
const LEVELS = ["Pemula", "Pengamat", "Penjaga", "Pelindung", "Pahlawan Asa"];
export const level = (xp: number) => Math.floor(xp / 100) + 1;
export const rank = (xp: number) => LEVELS[Math.min(level(xp) - 1, LEVELS.length - 1)];

type Step = { t: string; p: string; q: [string, string[], number, string] };
type Card = { s: string; f: boolean; w: string };
export type Modul = { id: string; cover: string; title: string; desc: string; video?: string; steps: Step[]; cards: Card[] };

// video: isi ID YouTube (bagian setelah v=) untuk menampilkan video di modul.
export const MODULES: Modul[] = [
  { id: "pengenalan", cover: "/img/Mod1.jpg", title: "Pengenalan Pernikahan Dini", desc: "Definisi, penyebab, dan batas usia menikah.", video: "CwqQylB_bI0",
    steps: [
      { t: "Apa itu pernikahan dini?", p: "Pernikahan dini adalah pernikahan yang terjadi sebelum seseorang matang secara fisik, mental, dan ekonomi. Di Indonesia, usia minimal menikah adalah 19 tahun menurut UU No. 16 Tahun 2019.", q: ["Berapa usia minimal menikah menurut UU No. 16 Tahun 2019?", ["16 tahun", "19 tahun", "21 tahun"], 1, "Batas usia minimal adalah 19 tahun untuk perempuan dan laki-laki."] },
      { t: "Mengapa pernikahan dini terjadi?", p: "Penyebabnya antara lain tekanan ekonomi, tradisi, minimnya pendidikan, dan anggapan bahwa menikah menyelesaikan masalah. Banyak yang tidak benar-benar memilih, melainkan didorong keadaan.", q: ["Mana yang sering memicu pernikahan dini?", ["Tekanan ekonomi dan tradisi", "Prestasi sekolah", "Beasiswa kuliah"], 0, "Faktor ekonomi dan tradisi sering mendorong keputusan ini."] },
    ],
    cards: [
      { s: "Pernikahan hanya boleh dilakukan jika kedua calon berusia minimal 19 tahun.", f: true, w: "Itu aturan UU No. 16 Tahun 2019. Pengecualian hanya lewat dispensasi pengadilan." },
      { s: "Menikah muda pasti menyelesaikan masalah ekonomi keluarga.", f: false, w: "Justru sering menambah beban karena pasangan belum mandiri." },
      { s: "Tekanan keluarga atau tradisi bisa membuat seseorang menikah bukan karena pilihannya sendiri.", f: true, w: "Karena itu penting punya informasi dan keberanian untuk menolak." },
    ] },
  { id: "hukum", cover: "/img/Mod3.jpg", title: "Aspek Hukum Pernikahan", desc: "Batas usia, dispensasi, dan hukum yang melindungimu.", video: "xZsSVRgMlno",
    steps: [
      { t: "Batas usia dan dispensasi", p: "UU No. 16 Tahun 2019 menetapkan usia minimal 19 tahun. Dispensasi kawin hanya diberikan pengadilan dengan alasan sangat mendesak, bukan sekadar permintaan keluarga.", q: ["Siapa yang berwenang memberi dispensasi kawin?", ["Kepala desa", "Pengadilan", "Orang tua"], 1, "Dispensasi diputuskan oleh pengadilan."] },
      { t: "Hukum yang melindungimu", p: "UU No. 23 Tahun 2004 (PKDRT) melarang kekerasan fisik, psikis, seksual, dan penelantaran dalam rumah tangga. UU No. 12 Tahun 2022 (TPKS) mengatur pemaksaan perkawinan sebagai kekerasan seksual.", q: ["Memaksa seseorang menikah termasuk...", ["Hak orang tua", "Kekerasan seksual menurut UU TPKS", "Bukan pelanggaran"], 1, "UU TPKS mengaturnya sebagai bentuk kekerasan seksual."] },
    ],
    cards: [
      { s: "Kekerasan dalam rumah tangga hanya berarti pemukulan.", f: false, w: "UU PKDRT juga mencakup kekerasan psikis, seksual, dan penelantaran." },
      { s: "Memaksa seseorang menikah dapat dipidana menurut UU TPKS.", f: true, w: "Pemaksaan perkawinan diatur sebagai tindak pidana kekerasan seksual." },
      { s: "Dispensasi kawin bisa diberikan oleh kepala desa.", f: false, w: "Dispensasi hanya diputuskan oleh pengadilan." },
    ] },
  { id: "kesehatan", cover: "/img/Mod4.jpg", title: "Dampak Kesehatan", desc: "Risiko kehamilan dan kesehatan reproduksi usia remaja.", video: "83P3ydmqFLE",
    steps: [
      { t: "Risiko kehamilan di usia remaja", p: "Tubuh remaja belum matang sepenuhnya. Kehamilan dini meningkatkan risiko preeklamsia, anemia, perdarahan, kelahiran prematur, dan bayi dengan berat lahir rendah.", q: ["Salah satu risiko kehamilan di usia remaja adalah...", ["Preeklamsia dan anemia", "Tidak ada risiko tambahan", "Persalinan selalu lebih mudah"], 0, "Organ reproduksi yang belum matang meningkatkan risiko komplikasi."] },
      { t: "Kesehatan reproduksi dan infeksi", p: "Remaja lebih rentan terhadap infeksi menular seksual dan cedera jalan lahir. Edukasi kesehatan reproduksi dan akses layanan kesehatan membantu mencegahnya.", q: ["Apa yang membantu menurunkan risiko kesehatan reproduksi?", ["Edukasi dan akses layanan kesehatan", "Menunda periksa ke dokter", "Mengandalkan mitos"], 0, "Informasi yang benar dan layanan kesehatan melindungi."] },
    ],
    cards: [
      { s: "Panggul remaja yang belum berkembang optimal dapat menyulitkan persalinan.", f: true, w: "Ini meningkatkan risiko cedera jalan lahir dan operasi caesar." },
      { s: "Hamil di usia remaja tidak punya risiko tambahan.", f: false, w: "Risikonya lebih tinggi, termasuk preeklamsia dan kelahiran prematur." },
      { s: "Edukasi kesehatan reproduksi membantu remaja membuat keputusan yang lebih aman.", f: true, w: "Informasi yang benar adalah bentuk perlindungan." },
    ] },
  { id: "psikologis", cover: "/img/Mod6.jpg", title: "Dampak Psikologis", desc: "Beban mental dan kekerasan psikis yang sering tak terlihat.", video: "UHBIOw9KIW4",
    steps: [
      { t: "Beban mental yang datang terlalu cepat", p: "Tekanan peran rumah tangga dapat memicu stres, cemas, dan depresi. Hilangnya masa remaja, pendidikan, dan pertemanan juga menghambat perkembangan sosial dan emosional.", q: ["Dampak psikologis yang sering muncul adalah...", ["Stres, cemas, dan depresi", "Selalu lebih bahagia", "Tidak ada dampak"], 0, "Beban peran dewasa yang datang terlalu cepat memengaruhi kesehatan mental."] },
      { t: "Kekerasan psikis itu nyata", p: "Hinaan, ancaman, pengekangan, dan isolasi dari keluarga adalah kekerasan psikis. Lukanya tak terlihat, tetapi berdampak, dan kamu berhak mencari dukungan.", q: ["Pasangan terus menghina dan melarangmu bertemu keluarga. Ini...", ["Kekerasan psikis", "Perhatian biasa", "Urusan rumah tangga yang tak boleh dicampuri"], 0, "Hinaan dan isolasi termasuk kekerasan psikis menurut UU PKDRT."] },
    ],
    cards: [
      { s: "Kekerasan tanpa luka fisik tidak termasuk kekerasan.", f: false, w: "Kekerasan psikis juga diakui hukum." },
      { s: "Perasaan tertekan bisa dibicarakan dengan orang tepercaya atau tenaga profesional.", f: true, w: "Dukungan sejak dini membantu pemulihan." },
      { s: "Melarang pasangan bertemu keluarga adalah tanda kontrol yang perlu diwaspadai.", f: true, w: "Isolasi adalah pola kontrol dalam relasi yang tidak sehat." },
    ] },
  { id: "pencegahan", cover: "/img/Mod5.jpg", title: "Pencegahan Pernikahan Dini", desc: "Menguatkan diri dan tahu ke mana mencari bantuan.", video: "Ay3dnTzIMb4",
    steps: [
      { t: "Kuatkan dirimu", p: "Pendidikan, pengetahuan hukum, dan dukungan orang tepercaya membuatmu lebih mudah menolak paksaan. Kamu berhak menentukan kapan dan dengan siapa menikah.", q: ["Yang membuatmu lebih terlindungi adalah...", ["Pendidikan dan dukungan orang tepercaya", "Diam saja", "Menghindari semua informasi"], 0, "Pengetahuan dan dukungan memberi posisi tawar."] },
      { t: "Tahu ke mana mencari bantuan", p: "Jika dipaksa menikah atau mengalami kekerasan, hubungi SAPA 129 (telepon 129), UPTD PPA di daerahmu, atau polisi. Dalam bahaya langsung, hubungi 112. Halaman Butuh Bantuan menampilkan peta lembaga terdekat.", q: ["Nomor telepon SAPA 129 adalah...", ["129", "911", "999"], 0, "Telepon 129 untuk layanan SAPA 129 (Kementerian PPPA)."] },
    ],
    cards: [
      { s: "Dalam bahaya langsung, kamu bisa menghubungi 112.", f: true, w: "112 adalah nomor darurat umum di Indonesia." },
      { s: "UPTD PPA mendampingi korban kekerasan terhadap perempuan dan anak.", f: true, w: "Unit ini ada di tingkat daerah dan mendampingi korban secara langsung." },
      { s: "Orang yang dipaksa menikah tidak punya tempat untuk meminta bantuan.", f: false, w: "Ada SAPA 129, UPTD PPA, kepolisian, dan lembaga lainnya." },
    ] },
  { id: "studi-kasus", cover: "/img/c2.png", title: "Studi Kasus dan Evaluasi", desc: "Latihan mengambil keputusan dari dua kasus nyata.",
    steps: [
      { t: "Kasus Sari, 16 tahun", p: "Sari dijodohkan keluarganya karena masalah ekonomi. Ia ingin melanjutkan sekolah, tetapi takut mengecewakan orang tua.", q: ["Langkah pertama yang paling tepat bagi Sari?", ["Menerima tanpa bicara", "Menceritakan ke orang dewasa tepercaya dan mencari bantuan", "Pergi tanpa memberi tahu siapa pun"], 1, "Bicara dengan orang tepercaya dan mencari pendampingan adalah langkah paling aman."] },
      { t: "Kasus Rina, setelah menikah", p: "Rina sering dihina dan dilarang bertemu keluarga oleh suaminya. Setelah bertengkar, suaminya minta maaf dan berjanji berubah.", q: ["Apa yang perlu Rina ingat?", ["Pola kekerasan bisa terulang, keselamatannya prioritas", "Ia penyebab masalahnya", "Permintaan maaf menghapus semuanya"], 0, "Permintaan maaf tidak menghapus risiko. Rina bisa menghubungi SAPA 129 atau UPTD PPA."] },
    ],
    cards: [
      { s: "Mencari bantuan adalah tanda lemah.", f: false, w: "Mencari bantuan adalah langkah berani untuk melindungi diri." },
      { s: "Kekerasan yang berulang setelah permintaan maaf tetap perlu ditangani serius.", f: true, w: "Pola kekerasan cenderung terulang." },
      { s: "Kamu berhak menolak perjodohan yang membuatmu belum siap.", f: true, w: "Kamu berhak menentukan masa depanmu sendiri." },
    ] },
];
