export type DocCategory = 'all' | 'umum' | 'peserta' | 'jadwal' | 'lampiran';

export interface SubtesInfo {
  id: number;
  code: string;
  name: string;
  cluster: 'Verbal' | 'Kuantitatif' | 'Penalaran' | 'Spasial' | 'Mekanikal' | 'Penggunaan Bahasa' | 'Klerikal';
  officialQuestions: number;
  officialMinutes: number;
  description: string;
  focusTip: string;
}

export interface ScheduleStage {
  no: number;
  kegiatan: string;
  tanggal: string;
  keterangan: string;
  phase: 'persiapan' | 'ujicoba' | 'pelaksanaan' | 'susulan';
}

export const SCHEDULE_STAGES: ScheduleStage[] = [
  {
    no: 1,
    kegiatan: 'Rapat Koordinasi Pelaksanaan ABM',
    tanggal: '06 s.d 08 November 2026',
    keterangan: 'Pusat kepada Disdik Provinsi dan Kanwil Kemenag Provinsi',
    phase: 'persiapan',
  },
  {
    no: 2,
    kegiatan: 'Sosialisasi Pelaksanaan ABM',
    tanggal: '09 s.d 13 November 2026',
    keterangan: 'Disdik Provinsi dan Kanwil Kemenag Provinsi kepada Satuan Pendidikan',
    phase: 'persiapan',
  },
  {
    no: 3,
    kegiatan: 'Cut-off Data Peserta',
    tanggal: '15 November 2026',
    keterangan: 'BPPP',
    phase: 'persiapan',
  },
  {
    no: 4,
    kegiatan: 'Penjadwalan dan Verifikasi Data Peserta ABM',
    tanggal: '10 s.d 21 November 2026',
    keterangan: 'Satuan Pendidikan dan Peserta',
    phase: 'persiapan',
  },
  {
    no: 5,
    kegiatan: 'Uji Coba Serentak',
    tanggal: '17 November 2026',
    keterangan: 'Satuan Pendidikan dan Peserta',
    phase: 'ujicoba',
  },
  {
    no: 6,
    kegiatan: 'Pelaksanaan ABM Tahap I',
    tanggal: '23 s.d 26 November 2026',
    keterangan: 'Pusat, Disdik Provinsi, Kanwil Kemenag Provinsi, Satuan Pendidikan dan Peserta',
    phase: 'pelaksanaan',
  },
  {
    no: 7,
    kegiatan: 'Penjadwalan Peserta Potensi ABM Susulan Tahap I',
    tanggal: '27 November 2026',
    keterangan: 'Seluruh Satuan Pendidikan yang melaksanakan ABM pada tahap I',
    phase: 'susulan',
  },
  {
    no: 8,
    kegiatan: 'Pelaksanaan ABM Tahap II',
    tanggal: '30 November s.d 03 Desember 2026',
    keterangan: 'Pusat, Disdik Provinsi, Kanwil Kemenag Provinsi, Satuan Pendidikan dan Peserta',
    phase: 'pelaksanaan',
  },
  {
    no: 9,
    kegiatan: 'Penjadwalan Peserta Potensi ABM Susulan Tahap II',
    tanggal: '04 Desember 2026',
    keterangan: 'Seluruh Satuan Pendidikan yang melaksanakan ABM pada tahap II',
    phase: 'susulan',
  },
  {
    no: 10,
    kegiatan: 'Pelaksanaan ABM Susulan',
    tanggal: '07 s.d 10 Desember 2026',
    keterangan: 'Pusat, Dinas Pendidikan Provinsi, Kanwil Kemenag Provinsi, Satuan Pendidikan dan Peserta',
    phase: 'susulan',
  },
];

export const SUBTES_LIST: SubtesInfo[] = [
  {
    id: 1,
    code: 'Subtes 1',
    name: 'Verbal Analogi',
    cluster: 'Verbal',
    officialQuestions: 10,
    officialMinutes: 5,
    description: 'Mengukur kemampuan memahami hubungan logis antar konsep kata dan menerapkannya pada pasangan kata lain.',
    focusTip: 'Identifikasi jenis hubungan kata pertama (sebab-akibat, fungsi, bagian-keseluruhan, atau sinonim) sebelum melihat pilihan.',
  },
  {
    id: 2,
    code: 'Subtes 2',
    name: 'Verbal Pemahaman Bacaan',
    cluster: 'Verbal',
    officialQuestions: 10,
    officialMinutes: 10,
    description: 'Mengukur kemampuan memahami ide pokok, informasi tersurat dan tersirat, serta menarik simpulan dari teks.',
    focusTip: 'Baca pertanyaan terlebih dahulu agar lebih cepat menemukan kata kunci di dalam paragraf.',
  },
  {
    id: 3,
    code: 'Subtes 3',
    name: 'Kuantitatif Deret',
    cluster: 'Kuantitatif',
    officialQuestions: 8,
    officialMinutes: 10,
    description: 'Mengukur kemampuan mengenali pola perubahan bilangan dalam suatu barisan atau deret matematis.',
    focusTip: 'Periksa selisih antar suku berurutan; jika tidak konstan, cek selisih tingkat dua atau pola lompat satu suku.',
  },
  {
    id: 4,
    code: 'Subtes 4',
    name: 'Kuantitatif Perbandingan',
    cluster: 'Kuantitatif',
    officialQuestions: 10,
    officialMinutes: 10,
    description: 'Mengukur kemampuan membandingkan dua besaran numerik atau aljabar secara cepat dan tepat.',
    focusTip: 'Sederhanakan pecahan atau uji nilai substitusi positif dan negatif bila terdapat variabel.',
  },
  {
    id: 5,
    code: 'Subtes 5',
    name: 'Kuantitatif Grafik Tabel',
    cluster: 'Kuantitatif',
    officialQuestions: 10,
    officialMinutes: 12,
    description: 'Mengukur kemampuan membaca, menginterpretasi, dan menghitung data kuantitatif dari grafik serta tabel.',
    focusTip: 'Perhatikan satuan pada sumbu grafik dan judul kolom tabel sebelum melakukan perhitungan persentase atau selisih.',
  },
  {
    id: 6,
    code: 'Subtes 6',
    name: 'Penalaran Analitis',
    cluster: 'Penalaran',
    officialQuestions: 8,
    officialMinutes: 12,
    description: 'Mengukur kemampuan berpikir deduktif berdasarkan sekumpulan syarat, urutan posisi, atau aturan relasi.',
    focusTip: 'Gunakan kertas buram untuk membuat sketsa urutan atau matriks sederhana dari syarat yang diberikan.',
  },
  {
    id: 7,
    code: 'Subtes 7',
    name: 'Spasial Klasifikasi Figural',
    cluster: 'Spasial',
    officialQuestions: 10,
    officialMinutes: 6,
    description: 'Mengukur kemampuan menemukan satu gambar yang memiliki karakteristik berbeda dari empat gambar lainnya.',
    focusTip: 'Periksa jumlah sisi, arah rotasi, pola arsiran, serta posisi titik atau elemen internal pada setiap gambar.',
  },
  {
    id: 8,
    code: 'Subtes 8',
    name: 'Spasial Analogi Figural',
    cluster: 'Spasial',
    officialQuestions: 10,
    officialMinutes: 10,
    description: 'Mengukur kemampuan mengidentifikasi transformasi bentuk dari gambar pertama ke kedua dan menerapkannya pada gambar ketiga.',
    focusTip: 'Amati perubahan rotasi, pencerminan, penambahan elemen, atau pembalikan warna secara terpisah.',
  },
  {
    id: 9,
    code: 'Subtes 9',
    name: 'Spasial Rotasi 3D',
    cluster: 'Spasial',
    officialQuestions: 8,
    officialMinutes: 10,
    description: 'Mengukur kemampuan membayangkan perputaran objek tiga dimensi atau kesesuaian jaring-jaring bangun ruang.',
    focusTip: 'Tentukan satu sisi atau sudut unik sebagai patokan orientasi saat memutar objek dalam imajinasi.',
  },
  {
    id: 10,
    code: 'Subtes 10',
    name: 'Spasial Pola',
    cluster: 'Spasial',
    officialQuestions: 6,
    officialMinutes: 10,
    description: 'Mengukur kemampuan melengkapi deret atau matriks pola visual berdasarkan aturan pergeseran dan transformasi.',
    focusTip: 'Lacak perubahan pola secara horizontal (baris) maupun vertikal (kolom) pada kotak matriks.',
  },
  {
    id: 11,
    code: 'Subtes 11',
    name: 'Mekanik Mekanikal',
    cluster: 'Mekanikal',
    officialQuestions: 10,
    officialMinutes: 10,
    description: 'Mengukur pemahaman prinsip mekanika dasar seperti katrol, roda gigi, tuas, gaya, dan keseimbangan.',
    focusTip: 'Pahami arah putaran roda gigi bersinggungan (berlawanan) serta perbandingan lengan kuasa pada tuas.',
  },
  {
    id: 12,
    code: 'Subtes 12',
    name: 'Penggunaan Bahasa Melengkapi Kalimat',
    cluster: 'Penggunaan Bahasa',
    officialQuestions: 10,
    officialMinutes: 5,
    description: 'Mengukur ketepatan penggunaan struktur kalimat efektif, kata baku, dan konjungsi sesuai kaidah bahasa Indonesia.',
    focusTip: 'Pastikan pilihan kata menjaga kelogisan hubungan antar klausa dan memenuhi kaidah EYD.',
  },
  {
    id: 13,
    code: 'Subtes 13',
    name: 'Klerikal Akurasi',
    cluster: 'Klerikal',
    officialQuestions: 30,
    officialMinutes: 5,
    description: 'Mengukur kecepatan dan ketelitian dalam membandingkan pasangan kode angka, huruf, atau simbol.',
    focusTip: 'Bandingkan karakter per blok (3–4 karakter sekaligus) dan waspadai huruf mirip seperti O/0 atau I/l.',
  },
  {
    id: 14,
    code: 'Subtes 14',
    name: 'Klerikal Memory',
    cluster: 'Klerikal',
    officialQuestions: 20,
    officialMinutes: 7,
    description: 'Mengukur kemampuan mengingat informasi kode atau pasangan kata-angka dalam waktu singkat secara akurat.',
    focusTip: 'Kelompokkan kode menjadi potongan bermakna atau asosiasikan huruf awal dengan kata yang mudah diingat.',
  },
];

export interface DocSectionNav {
  id: string;
  label: string;
  shortTitle: string;
  category: Exclude<DocCategory, 'all'>;
  keywords: string[];
  summary: string;
}

export const DOC_SECTIONS: DocSectionNav[] = [
  {
    id: 'kata-pengantar',
    label: 'Kata Pengantar',
    shortTitle: 'Kata Pengantar',
    category: 'umum',
    keywords: ['kata pengantar', 'bppp', 'pusmendik', 'kelas xi', 'sma', 'smk', 'ma', 'perangkat seluler', 'oktober 2026', 'fransisca'],
    summary: 'Pengantar resmi BPPP dan Pusmendik mengenai penyelenggaraan Asesmen Bakat Murid (ABM) Tahun 2026 berbasis perangkat seluler secara daring bagi kelas XI SMA, SMK, dan MA.',
  },
  {
    id: 'bab-1',
    label: 'Bab I. Pendahuluan',
    shortTitle: 'Bab I · Pendahuluan',
    category: 'umum',
    keywords: ['latar belakang', 'tujuan', 'sasaran', 'prinsip', 'ruang lingkup', 'pembiayaan', 'gratis', 'biaya', 'verbal', 'kuantitatif', 'penalaran', 'spasial', 'mekanikal', 'klerikal', 'tidak wajib'],
    summary: 'Latar belakang, 5 tujuan, sasaran murid aktif kelas XI, 7 prinsip pelaksanaan, ruang lingkup nasional, serta ketentuan pembiayaan (gratis tanpa pungutan dari BPPP).',
  },
  {
    id: 'bab-2',
    label: 'Bab II. Data Peserta',
    shortTitle: 'Bab II · Data Peserta',
    category: 'peserta',
    keywords: ['persyaratan peserta', 'nisn', 'npsn', 'dapodik', 'emis', 'verval-pd', 'pusdatin', 'ketidaksesuaian data', 'operator abm', 'sinkronisasi'],
    summary: 'Persyaratan murid aktif kelas XI dengan NISN valid di Dapodik/EMIS, alur sumber data melalui Verval-PD Pusdatin, dan prosedur perbaikan jika data tidak ditemukan atau tidak sesuai.',
  },
  {
    id: 'bab-3',
    label: 'Bab III. Tugas Penyelenggara',
    shortTitle: 'Bab III · Penyelenggara',
    category: 'peserta',
    keywords: ['panitia pusat', 'direktorat sma', 'direktorat smk', 'disdik provinsi', 'kanwil kemenag', 'satuan pendidikan', 'operator', 'pengawas', 'eskalasi'],
    summary: 'Pembagian tugas dan kewenangan Panitia Pusat (Pusmendik & BPPP), Unsur Penguatan Koordinasi Pusat, Disdik Provinsi, Kanwil Kemenag Provinsi, dan Satuan Pendidikan.',
  },
  {
    id: 'bab-4',
    label: 'Bab IV. Persiapan & Pelaksanaan',
    shortTitle: 'Bab IV · Pelaksanaan',
    category: 'jadwal',
    keywords: ['jadwal', 'tahapan', 'november', 'desember', 'uji coba', 'tahap i', 'tahap ii', 'susulan', '122 menit', '08.00', '16.00', 'dashboard-abm', 'kuota', 'android', 'ios', 'gangguan koneksi', 'timer', 'selesai', 'rekap hasil'],
    summary: 'Jadwal 10 tahapan pelaksanaan (6 Nov – 10 Des 2026), durasi 122 menit (08.00–16.00 waktu setempat), penetapan jadwal pada dasbor ABM, persiapan perangkat, penanganan putus koneksi, dan hasil.',
  },
  {
    id: 'bab-5',
    label: 'Bab V. Kendala & Pemantauan',
    shortTitle: 'Bab V · Kendala',
    category: 'jadwal',
    keywords: ['penanganan kendala', 'berjenjang', 'penjadwalan ulang', 'susulan', 'pemantauan', 'dasbor', 'monitoring'],
    summary: 'Mekanisme eskalasi kendala berjenjang dari satuan pendidikan hingga pusat, penjadwalan ulang ke ABM Susulan, serta 5 indikator pemantauan pelaksanaan pada dasbor.',
  },
  {
    id: 'bab-6',
    label: 'Bab VI. Penutup & Disclaimer',
    shortTitle: 'Bab VI · Penutup',
    category: 'umum',
    keywords: ['penutup', 'disclaimer', 'serius', 'akuntabilitas', 'kerahasiaan'],
    summary: 'Ketentuan penutup, penyesuaian teknis lanjutan oleh Panitia Penyelenggara Pusat, dan disclaimer bahwa hasil ABM hanya bermakna apabila peserta menjawab dengan serius.',
  },
  {
    id: 'lampiran-1',
    label: 'Lampiran 1. Tata Tertib Peserta',
    shortTitle: 'Lampiran 1 · Tata Tertib',
    category: 'lampiran',
    keywords: ['tata tertib', 'kewajiban', 'larangan', 'kertas buram', 'screenshot', 'memotret', 'browser', 'curang', 'kerjasama'],
    summary: '6 kewajiban peserta dan 7 larangan tegas selama pelaksanaan ABM, termasuk larangan memotret/screenshot soal dan membuka peramban atau aplikasi komunikasi.',
  },
  {
    id: 'lampiran-2',
    label: 'Lampiran 2. Petunjuk Pengerjaan',
    shortTitle: 'Lampiran 2 · Petunjuk',
    category: 'lampiran',
    keywords: ['petunjuk pengerjaan', 'login', 'token', 'berurutan', 'tidak dapat kembali', 'timer berhenti', 'tombol selesai', 'mengulang'],
    summary: '10 langkah teknis pengerjaan: login NISN & NPSN, verifikasi identitas, input token, pengerjaan subtes berurutan tanpa kembali ke subtes sebelumnya, jeda timer otomatis, dan finalisasi.',
  },
  {
    id: 'lampiran-3',
    label: 'Lampiran 3. Perangkat & Koneksi',
    shortTitle: 'Lampiran 3 · Perangkat',
    category: 'lampiran',
    keywords: ['spesifikasi', 'android 7.0', 'ios 16.4', 'smartphone', 'tablet', 'touchscreen', 'speaker', 'storage', 'baterai', 'kuota', 'internet'],
    summary: 'Persyaratan teknis minimum perangkat seluler: Android minimal versi 7.0, iOS minimal versi 16.4, layar sentuh & speaker optimal, storage/memori memadai, baterai penuh, dan internet stabil.',
  },
  {
    id: 'lampiran-4',
    label: 'Lampiran 4. Informasi 14 Subtes',
    shortTitle: 'Lampiran 4 · 14 Subtes',
    category: 'lampiran',
    keywords: ['informasi subtes', '14 subtes', '160 soal', '122 menit', 'analogi', 'pemahaman bacaan', 'deret', 'perbandingan', 'grafik tabel', 'penalaran analitis', 'klasifikasi figural', 'rotasi 3d', 'pola', 'mekanikal', 'melengkapi kalimat', 'klerikal akurasi', 'klerikal memory'],
    summary: 'Daftar lengkap 14 subtes ABM Tahun 2026 beserta jumlah soal (total 160 butir) dan alokasi waktu pengerjaan (total 122 menit).',
  },
];

export interface SearchableEntry {
  id: string;
  sectionId: string;
  sectionLabel: string;
  title: string;
  content: string;
  category: Exclude<DocCategory, 'all'>;
}

export const SEARCH_INDEX: SearchableEntry[] = [
  {
    id: 's-kp',
    sectionId: 'kata-pengantar',
    sectionLabel: 'Kata Pengantar',
    title: 'Tujuan Layanan & Moda Daring Seluler 2026',
    content: 'Balai Pengelolaan Pengujian Pendidikan (BPPP) bersama Pusat Asesmen Pendidikan (Pusmendik) menyelenggarakan ABM Tahun 2026 bagi murid kelas XI jenjang SMA, SMK, dan MA secara daring menggunakan perangkat seluler masing-masing peserta.',
    category: 'umum',
  },
  {
    id: 's-b1-latar',
    sectionId: 'bab-1',
    sectionLabel: 'Bab I. Pendahuluan',
    title: 'A. Latar Belakang & 7 Aspek Bakat ABM',
    content: 'ABM mengukur potensi murid pada bidang khusus: kemampuan verbal, kuantitatif, penalaran, figural/spasial, mekanikal, penggunaan bahasa, dan klerikal. Berbeda dengan tes prestasi akademik, hasil ABM menjadi bahan pertimbangan pengembangan diri dan perencanaan pendidikan lanjutan.',
    category: 'umum',
  },
  {
    id: 's-b1-sasaran',
    sectionId: 'bab-1',
    sectionLabel: 'Bab I. Pendahuluan',
    title: 'B–E. Tujuan, Sasaran, Prinsip, dan Ruang Lingkup',
    content: 'Sasaran adalah murid aktif kelas XI pada SMA, SMK, dan MA yang tercatat di Dapodik atau EMIS. Keikutsertaan tidak bersifat wajib. Diikuti satu kali pada hari yang ditetapkan satuan pendidikan dengan pengawasan sekolah serta pengendalian kapasitas sistem.',
    category: 'umum',
  },
  {
    id: 's-b1-biaya',
    sectionId: 'bab-1',
    sectionLabel: 'Bab I. Pendahuluan',
    title: 'F. Pembiayaan (Gratis Tanpa Pungutan)',
    content: 'Murid dan satuan pendidikan tidak dikenakan biaya dalam mengikuti ABM 2026. BPPP tidak memungut biaya apapun. Kebutuhan operasional di sekolah menjadi tanggung jawab masing-masing satuan pendidikan secara mandiri.',
    category: 'umum',
  },
  {
    id: 's-b2-syarat',
    sectionId: 'bab-2',
    sectionLabel: 'Bab II. Data Peserta',
    title: 'A & B. Persyaratan & Sumber Data (Dapodik, EMIS, Verval-PD)',
    content: 'Wajib murid aktif kelas XI SMA/SMK/MA memiliki NISN valid dan tercatat aktif di Dapodik (SMA/SMK) atau EMIS (MA/MAK). Data diverifikasi melalui Verval-PD Pusdatin Kemendikdasmen lalu disinkronkan periodik ke sistem ABM.',
    category: 'peserta',
  },
  {
    id: 's-b2-kendala',
    sectionId: 'bab-2',
    sectionLabel: 'Bab II. Data Peserta',
    title: 'C. Penanganan Ketidaksesuaian Data Peserta',
    content: 'Peserta memeriksa kesesuaian data diri menggunakan NISN dan NPSN di aplikasi ABM. Jika data tidak ditemukan atau tidak sesuai, segera melapor kepada Operator ABM Sekolah/Madrasah untuk pemutakhiran dan sinkronisasi periodik, dibantu Disdik/Kanwil Kemenag Provinsi.',
    category: 'peserta',
  },
  {
    id: 's-b3-pusat',
    sectionId: 'bab-3',
    sectionLabel: 'Bab III. Tugas Penyelenggara',
    title: 'A–D. Tugas Panitia Pusat, Koordinasi, Disdik & Kanwil Kemenag',
    content: 'Pusmendik & BPPP menyusun kebijakan, substansi, sistem layanan, pemantauan nasional. Direktorat SMA, SMK, dan Kemenag memperkuat koordinasi. Disdik Provinsi (SMA/SMK) dan Kanwil Kemenag Provinsi (MA) mensosialisasikan, memantau dasbor wilayah, dan menindaklanjuti eskalasi.',
    category: 'peserta',
  },
  {
    id: 's-b3-satdik',
    sectionId: 'bab-3',
    sectionLabel: 'Bab III. Tugas Penyelenggara',
    title: 'E. Tugas Satuan Pendidikan (10 Poin)',
    content: 'Memvalidasi daftar peserta di dasbor ABM, menetapkan jadwal dalam rentang nasional, menugaskan Operator dan Pengawas ABM, menyiapkan ruang kelas & dukungan Wi-Fi jika diperlukan, memantau progres langsung, mengunduh rekapitulasi hasil, dan mendokumentasikan kejadian khusus.',
    category: 'peserta',
  },
  {
    id: 's-b4-jadwal',
    sectionId: 'bab-4',
    sectionLabel: 'Bab IV. Persiapan & Pelaksanaan',
    title: 'A. Tahapan & Waktu Pelaksanaan (6 Nov – 10 Des 2026)',
    content: 'Rakor 6–8 Nov, Sosialisasi 9–13 Nov, Cut-off data 15 Nov, Penjadwalan & Verifikasi 10–21 Nov, Uji Coba Serentak 17 Nov, ABM Tahap I 23–26 Nov, ABM Tahap II 30 Nov–3 Des, ABM Susulan 7–10 Des 2026. Total 14 subtes 122 menit, rentang harian pukul 08.00–16.00 waktu setempat.',
    category: 'jadwal',
  },
  {
    id: 's-b4-penetapan',
    sectionId: 'bab-4',
    sectionLabel: 'Bab IV. Persiapan & Pelaksanaan',
    title: 'B & C. Dasbor ABM, Kuota Sistem & Persiapan Perangkat',
    content: 'Operator mengakses https://dashboard-abm.bppp.kemendikdasmen.go.id/ untuk memilih hari pelaksanaan. Tidak diwajibkan ruang lab komputer khusus. Sistem membatasi kuota peserta bersamaan. Peserta memastikan aplikasi Android/iOS terpasang, baterai cukup, dan internet stabil.',
    category: 'jadwal',
  },
  {
    id: 's-b4-putus',
    sectionId: 'bab-4',
    sectionLabel: 'Bab IV. Persiapan & Pelaksanaan',
    title: 'D–F. Pelaksanaan, Gangguan Koneksi (Auto-Pause) & Hasil',
    content: 'Jika koneksi internet terputus, sistem menghentikan sementara penghitung waktu (timer) secara otomatis dan jawaban tersimpan aman. Segera lapor Pengawas/Operator. Jika perangkat rusak fisik, dapat diganti perangkat cadangan sekolah. Tekan tombol Selesai untuk melihat hasil ABM.',
    category: 'jadwal',
  },
  {
    id: 's-b5',
    sectionId: 'bab-5',
    sectionLabel: 'Bab V. Kendala & Pemantauan',
    title: 'Penanganan Kendala Berjenjang & 5 Indikator Pemantauan',
    content: 'Kendala ditangani berjenjang dari satuan pendidikan ke provinsi hingga pusat. Kendala sistem/gangguan layanan dapat dijadwalkan ulang ke ABM Susulan. Pemantauan dasbor mencakup peserta terdaftar, terjadwal, sedang mengerjakan, selesai, dan potensi susulan.',
    category: 'jadwal',
  },
  {
    id: 's-b6',
    sectionId: 'bab-6',
    sectionLabel: 'Bab VI. Penutup & Disclaimer',
    title: 'Disclaimer Keseriusan Peserta',
    content: 'DISCLAIMER: Hasil Asesmen Bakat Murid ini hanya bermakna bila peserta serius dalam menjawab pertanyaan. Penyesuaian teknis lapangan ditetapkan lebih lanjut oleh Panitia Penyelenggara Pusat.',
    category: 'umum',
  },
  {
    id: 's-l1',
    sectionId: 'lampiran-1',
    sectionLabel: 'Lampiran 1. Tata Tertib',
    title: '6 Kewajiban dan 7 Larangan Peserta',
    content: 'Wajib membawa ponsel sesuai spesifikasi, baterai cukup, mematuhi pengawas, dan melapor kendala. Dilarang berbagi akun, bekerja sama, memakai alat bantu selain kertas buram dan alat tulis, membuka browser/chat, memotret/screenshot soal, atau mengganggu sistem.',
    category: 'lampiran',
  },
  {
    id: 's-l2',
    sectionId: 'lampiran-2',
    sectionLabel: 'Lampiran 2. Petunjuk Pengerjaan',
    title: '10 Langkah Pengerjaan di Aplikasi ABM',
    content: 'Login NISN & NPSN, cek identitas, masukkan token dari Operator/Pengawas, baca petunjuk subtes, kerjakan berurutan (tidak dapat kembali ke subtes sebelumnya), timer berhenti otomatis saat putus koneksi, tinjau jawaban sebelum Selesai, tidak dapat mengulang setelah selesai.',
    category: 'lampiran',
  },
  {
    id: 's-l3',
    sectionId: 'lampiran-3',
    sectionLabel: 'Lampiran 3. Perangkat & Koneksi',
    title: 'Spesifikasi Minimum Android 7.0 & iOS 16.4',
    content: 'Perangkat seluler smartphone/tablet wajib Android minimal versi 7.0 atau lebih baru, atau iOS minimal versi 16.4 atau lebih baru. Layar sentuh dan pengeras suara berfungsi optimal, ruang penyimpanan & memori memadai, baterai penuh, dan koneksi internet/kuota stabil.',
    category: 'lampiran',
  },
  {
    id: 's-l4',
    sectionId: 'lampiran-4',
    sectionLabel: 'Lampiran 4. Informasi Subtes',
    title: 'Tabel Lengkap 14 Subtes (160 Soal / 122 Menit)',
    content: '14 Subtes: Verbal Analogi (10/5m), Verbal Pemahaman Bacaan (10/10m), Kuantitatif Deret (8/10m), Kuantitatif Perbandingan (10/10m), Kuantitatif Grafik Tabel (10/12m), Penalaran Analitis (8/12m), Spasial Klasifikasi Figural (10/6m), Spasial Analogi Figural (10/10m), Spasial Rotasi 3D (8/10m), Spasial Pola (6/10m), Mekanik Mekanikal (10/10m), Penggunaan Bahasa Melengkapi Kalimat (10/5m), Klerikal Akurasi (30/5m), Klerikal Memory (20/7m).',
    category: 'lampiran',
  },
];
