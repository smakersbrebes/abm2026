export interface TableData {
  headers: string[];
  rows: (string | number)[][];
}

export interface MemoryItem {
  label: string;
  value: string;
}

export interface QuestionItem {
  id: string;
  subtesId: number;
  prompt: string;
  passage?: string;
  diagramId?: string;
  tableData?: TableData;
  memoryItems?: MemoryItem[];
  memorySeconds?: number;
  options: {
    text: string;
    diagramId?: string;
  }[];
  correctIndex: number;
  explanation: string;
}

export const ABM_QUESTIONS: QuestionItem[] = [
  // ================= SUBTES 1: VERBAL ANALOGI =================
  {
    id: 's1-q1',
    subtesId: 1,
    prompt: 'DOKTER : STETOSKOP = ... : ...',
    options: [
      { text: 'Guru : Murid' },
      { text: 'Pelukis : Kuas' },
      { text: 'Petani : Padi' },
      { text: 'Penulis : Pembaca' },
      { text: 'Sopir : Penumpang' },
    ],
    correctIndex: 1,
    explanation: 'Hubungan kedua kata adalah profesi dan alat kerja khasnya. Dokter menggunakan stetoskop untuk bekerja, sebagaimana pelukis menggunakan kuas.',
  },
  {
    id: 's1-q2',
    subtesId: 1,
    prompt: 'BENIH : POHON = ULAT : ...',
    options: [
      { text: 'Daun' },
      { text: 'Ranting' },
      { text: 'Kupu-kupu' },
      { text: 'Serangga' },
      { text: 'Sarang' },
    ],
    correctIndex: 2,
    explanation: 'Hubungannya adalah tahap awal pertumbuhan menuju bentuk dewasa. Benih tumbuh menjadi pohon, sedangkan ulat bermetamorfosis menjadi kupu-kupu.',
  },
  {
    id: 's1-q3',
    subtesId: 1,
    prompt: 'LELAH : ISTIRAHAT = LAPAR : ...',
    options: [
      { text: 'Makan' },
      { text: 'Dapur' },
      { text: 'Piring' },
      { text: 'Minum' },
      { text: 'Kenyang' },
    ],
    correctIndex: 0,
    explanation: 'Hubungan kondisi dan tindakan untuk mengatasinya. Lelah diatasi dengan istirahat, sedangkan lapar diatasi dengan makan.',
  },
  {
    id: 's1-q4',
    subtesId: 1,
    prompt: 'PETA : ARAH = KOMPAS : ... (padanan terbaik untuk TERMOMETER : ...)',
    options: [
      { text: 'Suhu' },
      { text: 'Demam' },
      { text: 'Udara' },
      { text: 'Air Raksa' },
      { text: 'Klinis' },
    ],
    correctIndex: 0,
    explanation: 'Alat dan besaran/informasi yang ditunjukkan: kompas menunjukkan arah, sedangkan termometer mengukur/menunjukkan suhu.',
  },

  // ================= SUBTES 2: VERBAL PEMAHAMAN BACAAN =================
  {
    id: 's2-q1',
    subtesId: 2,
    passage:
      'Asesmen Bakat Murid (ABM) dirancang bukan untuk mengukur penguasaan materi pelajaran di kelas seperti halnya tes prestasi akademik, melainkan untuk memetakan potensi bawaan dan kecenderungan bakat murid di berbagai bidang khusus. Melalui pemetaan ini, satuan pendidikan dapat merancang pendampingan pembelajaran yang lebih relevan dengan kekuatan tiap murid.',
    prompt: 'Berdasarkan paragraf tersebut, pernyataan yang paling tepat mengenai perbedaan ABM dengan tes prestasi akademik adalah ...',
    options: [
      { text: 'ABM hanya diikuti murid yang berprestasi tinggi di kelas XI.' },
      { text: 'ABM mengukur potensi bakat khusus, bukan penguasaan materi pelajaran.' },
      { text: 'Tes prestasi akademik tidak memerlukan pendampingan satuan pendidikan.' },
      { text: 'ABM menentukan kelulusan murid pada jenjang SMA, SMK, dan MA.' },
      { text: 'Hasil ABM menggantikan seluruh nilai rapor akademik murid.' },
    ],
    correctIndex: 1,
    explanation: 'Kalimat pertama secara eksplisit menjelaskan bahwa ABM memetakan potensi/bakat bidang khusus, berbeda dengan tes prestasi yang mengukur penguasaan materi pelajaran.',
  },
  {
    id: 's2-q2',
    subtesId: 2,
    passage:
      'Asesmen Bakat Murid (ABM) dirancang bukan untuk mengukur penguasaan materi pelajaran di kelas seperti halnya tes prestasi akademik, melainkan untuk memetakan potensi bawaan dan kecenderungan bakat murid di berbagai bidang khusus. Melalui pemetaan ini, satuan pendidikan dapat merancang pendampingan pembelajaran yang lebih relevan dengan kekuatan tiap murid.',
    prompt: 'Manfaat utama hasil pemetaan ABM bagi satuan pendidikan menurut teks di atas adalah ...',
    options: [
      { text: 'Menyusun peringkat kelas secara nasional.' },
      { text: 'Mengurangi jam pelajaran wajib di sekolah.' },
      { text: 'Merancang pendampingan belajar yang sesuai kekuatan murid.' },
      { text: 'Menghapus ujian tulis pada akhir semester.' },
      { text: 'Menyeleksi penerima beasiswa perguruan tinggi.' },
    ],
    correctIndex: 2,
    explanation: 'Kalimat kedua menyatakan bahwa satuan pendidikan memanfaatkan hasil pemetaan untuk merancang pendampingan pembelajaran yang relevan dengan kekuatan murid.',
  },
  {
    id: 's2-q3',
    subtesId: 2,
    passage:
      'Penggunaan energi surya atap di sekolah-sekolah mulai diminati karena mampu menekan biaya listrik bulanan sekaligus menjadi sarana belajar langsung tentang energi terbarukan. Meski biaya pemasangan awal relatif tinggi, penghematan jangka panjang serta dukungan program efisiensi energi membuat investasi panel surya kian rasional dalam kurun lima hingga tujuh tahun.',
    prompt: 'Ide pokok paragraf tersebut adalah ...',
    options: [
      { text: 'Kendala teknis perawatan panel surya di musim hujan.' },
      { text: 'Manfaat ekonomi dan edukatif pemasangan energi surya atap di sekolah.' },
      { text: 'Larangan penggunaan listrik konvensional di lingkungan sekolah.' },
      { text: 'Perbandingan harga panel surya impor dan lokal.' },
      { text: 'Kurangnya minat murid terhadap pelajaran fisika terapan.' },
    ],
    correctIndex: 1,
    explanation: 'Keseluruhan paragraf membahas keuntungan pemasangan panel surya atap di sekolah (hemat listrik, sarana belajar) serta kelayakan investasinya dalam jangka panjang.',
  },
  {
    id: 's2-q4',
    subtesId: 2,
    passage:
      'Penggunaan energi surya atap di sekolah-sekolah mulai diminati karena mampu menekan biaya listrik bulanan sekaligus menjadi sarana belajar langsung tentang energi terbarukan. Meski biaya pemasangan awal relatif tinggi, penghematan jangka panjang serta dukungan program efisiensi energi membuat investasi panel surya kian rasional dalam kurun lima hingga tujuh tahun.',
    prompt: 'Kata "rasional" pada kalimat kedua paragraf tersebut bermakna ...',
    options: [
      { text: 'Sangat murah' },
      { text: 'Masuk akal dan layak dipertimbangkan' },
      { text: 'Bersifat sementara' },
      { text: 'Wajib dilaksanakan segera' },
      { text: 'Rumit secara teknis' },
    ],
    correctIndex: 1,
    explanation: 'Dalam konteks investasi jangka panjang, kata "rasional" berarti masuk akal dan layak secara perhitungan.',
  },

  // ================= SUBTES 3: KUANTITATIF DERET =================
  {
    id: 's3-q1',
    subtesId: 3,
    prompt: 'Tentukan bilangan selanjutnya pada deret: 3, 7, 15, 31, 63, ...',
    options: [
      { text: '95' },
      { text: '115' },
      { text: '125' },
      { text: '127' },
      { text: '131' },
    ],
    correctIndex: 3,
    explanation: 'Pola selisih berlipat ganda: +4, +8, +16, +32, sehingga selanjutnya +64. 63 + 64 = 127 (atau pola 2n + 1).',
  },
  {
    id: 's3-q2',
    subtesId: 3,
    prompt: 'Tentukan bilangan yang tepat untuk melengkapi deret: 2, 5, 10, 17, 26, ...',
    options: [
      { text: '35' },
      { text: '36' },
      { text: '37' },
      { text: '38' },
      { text: '39' },
    ],
    correctIndex: 2,
    explanation: 'Selisih antar suku adalah bilangan ganjil berurutan: +3, +5, +7, +9, maka suku berikutnya +11. 26 + 11 = 37.',
  },
  {
    id: 's3-q3',
    subtesId: 3,
    prompt: 'Tentukan bilangan selanjutnya pada deret: 162, 54, 18, 6, ...',
    options: [
      { text: '1' },
      { text: '2' },
      { text: '3' },
      { text: '4' },
      { text: '0' },
    ],
    correctIndex: 1,
    explanation: 'Deret geometri dengan rasio dibagi 3 (: 3). 6 : 3 = 2.',
  },
  {
    id: 's3-q4',
    subtesId: 3,
    prompt: 'Tentukan nilai X pada deret: 4, 6, 9, 13, 18, X, 31',
    options: [
      { text: '22' },
      { text: '23' },
      { text: '24' },
      { text: '25' },
      { text: '26' },
    ],
    correctIndex: 2,
    explanation: 'Pola pertambahan bertingkat: +2, +3, +4, +5, +6, +7. Maka X = 18 + 6 = 24, dan cek: 24 + 7 = 31.',
  },

  // ================= SUBTES 4: KUANTITATIF PERBANDINGAN =================
  {
    id: 's4-q1',
    subtesId: 4,
    prompt: 'Diketahui P = 3/4 dari 80, dan Q = 40% dari 150. Manakah hubungan yang benar antara P dan Q?',
    options: [
      { text: 'P > Q' },
      { text: 'P < Q' },
      { text: 'P = Q' },
      { text: 'P = 2Q' },
      { text: 'Hubungan P dan Q tidak dapat ditentukan' },
    ],
    correctIndex: 2,
    explanation: 'P = (3/4) × 80 = 60. Q = 0,4 × 150 = 60. Jadi P = Q.',
  },
  {
    id: 's4-q2',
    subtesId: 4,
    prompt: 'Jika x > 3, manakah perbandingan yang tepat antara P = 2x + 1 dan Q = x + 4?',
    options: [
      { text: 'P > Q' },
      { text: 'P < Q' },
      { text: 'P = Q' },
      { text: 'P + Q = 10' },
      { text: 'Tidak dapat ditentukan' },
    ],
    correctIndex: 0,
    explanation: 'P − Q = (2x + 1) − (x + 4) = x − 3. Karena diketahui x > 3, maka x − 3 > 0 sehingga P > Q.',
  },
  {
    id: 's4-q3',
    subtesId: 4,
    prompt: 'Diketahui P = 0,25 × 48 dan Q = (1/3) × 42. Hubungan P dan Q adalah ...',
    options: [
      { text: 'P > Q' },
      { text: 'P < Q' },
      { text: 'P = Q' },
      { text: 'P − Q = 2' },
      { text: 'Tidak dapat ditentukan' },
    ],
    correctIndex: 1,
    explanation: 'P = 1/4 × 48 = 12, sedangkan Q = 1/3 × 42 = 14. Karena 12 < 14, maka P < Q.',
  },
  {
    id: 's4-q4',
    subtesId: 4,
    prompt: 'Harga 5 buku tulis yang sama adalah Rp37.500. Jika P adalah harga 8 buku tulis tersebut dan Q = Rp58.000, maka ...',
    options: [
      { text: 'P > Q' },
      { text: 'P < Q' },
      { text: 'P = Q' },
      { text: 'P = Q − Rp2.000' },
      { text: 'Tidak dapat ditentukan' },
    ],
    correctIndex: 0,
    explanation: 'Harga 1 buku = Rp37.500 / 5 = Rp7.500. Harga 8 buku (P) = 8 × Rp7.500 = Rp60.000. Jadi P > Q (Rp60.000 > Rp58.000).',
  },

  // ================= SUBTES 5: KUANTITATIF GRAFIK TABEL =================
  {
    id: 's5-q1',
    subtesId: 5,
    diagramId: 'chart-produksi',
    prompt: 'Berdasarkan grafik hasil panen di atas, berapakah selisih total panen Padi dan total panen Jagung selama periode 2023–2025?',
    options: [
      { text: '25 ton' },
      { text: '30 ton' },
      { text: '35 ton' },
      { text: '40 ton' },
      { text: '45 ton' },
    ],
    correctIndex: 2,
    explanation: 'Total Padi = 40 + 50 + 60 = 150 ton. Total Jagung = 30 + 45 + 40 = 115 ton. Selisihnya = 150 − 115 = 35 ton.',
  },
  {
    id: 's5-q2',
    subtesId: 5,
    diagramId: 'chart-produksi',
    prompt: 'Berapakah persentase kenaikan hasil panen Jagung dari tahun 2023 ke tahun 2024?',
    options: [
      { text: '15%' },
      { text: '33,3%' },
      { text: '45%' },
      { text: '50%' },
      { text: '60%' },
    ],
    correctIndex: 3,
    explanation: 'Jagung naik dari 30 ton (2023) menjadi 45 ton (2024). Kenaikan = 15 ton. Persentase = (15 / 30) × 100% = 50%.',
  },
  {
    id: 's5-q3',
    subtesId: 5,
    diagramId: 'chart-pengunjung',
    prompt: 'Berdasarkan grafik pengunjung perpustakaan di atas, berapakah rata-rata jumlah pengunjung per hari dari Senin hingga Jumat?',
    options: [
      { text: '130 orang' },
      { text: '135 orang' },
      { text: '140 orang' },
      { text: '145 orang' },
      { text: '150 orang' },
    ],
    correctIndex: 2,
    explanation: 'Jumlah pengunjung = 120 + 150 + 110 + 180 + 140 = 700 orang dalam 5 hari. Rata-rata = 700 / 5 = 140 orang/hari.',
  },
  {
    id: 's5-q4',
    subtesId: 5,
    tableData: {
      headers: ['Ekstrakurikuler', 'Kelas XI IPA', 'Kelas XI IPS', 'Total'],
      rows: [
        ['Robotika', 24, 6, 30],
        ['Jurnalistik', 12, 18, 30],
        ['Pramuka', 20, 20, 40],
        ['Paduan Suara', 8, 12, 20],
      ],
    },
    prompt: 'Berdasarkan tabel peserta ekstrakurikuler kelas XI di atas, berapa persen peserta Robotika yang berasal dari kelas XI IPS terhadap seluruh peserta kelas XI?',
    options: [
      { text: '5%' },
      { text: '6%' },
      { text: '10%' },
      { text: '12%' },
      { text: '20%' },
    ],
    correctIndex: 0,
    explanation: 'Total seluruh peserta = 30 + 30 + 40 + 20 = 120 murid. Peserta Robotika dari XI IPS = 6 murid. Persentase = (6 / 120) × 100% = 5%.',
  },

  // ================= SUBTES 6: PENALARAN ANALITIS =================
  {
    id: 's6-q1',
    subtesId: 6,
    prompt:
      'Lima murid (Andi, Budi, Cici, Dedi, dan Eka) sedang mengantre di loket verifikasi. Diketahui: (1) Budi berada tepat di depan Cici. (2) Dedi berada di urutan paling belakang. (3) Eka berada di urutan paling depan, tepat di depan Andi. Siapakah yang berada pada urutan ke-3?',
    options: [
      { text: 'Andi' },
      { text: 'Budi' },
      { text: 'Cici' },
      { text: 'Dedi' },
      { text: 'Eka' },
    ],
    correctIndex: 1,
    explanation: 'Dari (3) urutan 1 = Eka, urutan 2 = Andi. Dari (2) urutan 5 = Dedi. Dari (1) Budi di depan Cici mengisi urutan 3 dan 4. Jadi urutan ke-3 adalah Budi.',
  },
  {
    id: 's6-q2',
    subtesId: 6,
    prompt:
      'Empat murid (Rina, Sinta, Tono, Wati) mendapat jadwal piket Senin hingga Kamis (1 orang per hari). Syarat: (1) Tono piket pada hari Kamis. (2) Rina tidak piket pada hari Senin maupun Selasa. (3) Sinta piket tepat sehari sebelum Rina. Siapakah yang bertugas piket pada hari Senin?',
    options: [
      { text: 'Rina' },
      { text: 'Sinta' },
      { text: 'Tono' },
      { text: 'Wati' },
      { text: 'Tidak dapat ditentukan' },
    ],
    correctIndex: 3,
    explanation: 'Kamis = Tono. Karena Rina bukan Senin/Selasa dan bukan Kamis, maka Rina = Rabu. Sinta tepat sebelum Rina berarti Sinta = Selasa. Tersisa hari Senin untuk Wati.',
  },
  {
    id: 's6-q3',
    subtesId: 6,
    prompt:
      'Aturan pemilihan mata pelajaran pilihan: Jika murid memilih Fisika, ia wajib memilih Matematika Lanjut. Jika memilih Biologi, ia tidak boleh memilih Ekonomi. Jika Dika memilih Fisika dan Ekonomi, manakah simpulan yang PASTI benar?',
    options: [
      { text: 'Dika memilih Biologi.' },
      { text: 'Dika tidak memilih Matematika Lanjut.' },
      { text: 'Dika memilih Matematika Lanjut dan tidak memilih Biologi.' },
      { text: 'Dika hanya mengambil dua mata pelajaran.' },
      { text: 'Dika tidak menyukai pelajaran sains.' },
    ],
    correctIndex: 2,
    explanation: 'Karena memilih Fisika -> wajib Matematika Lanjut. Karena memilih Ekonomi -> tidak boleh memilih Biologi. Jadi Dika memilih Matematika Lanjut dan tidak memilih Biologi.',
  },
  {
    id: 's6-q4',
    subtesId: 6,
    prompt:
      'Empat teman (Fajar, Gita, Hadi, Indah) duduk mengelilingi meja persegi (masing-masing di satu sisi). Fajar duduk berhadapan dengan Hadi. Jika Gita duduk di sebelah kanan Fajar, siapakah yang duduk di sebelah kiri Fajar?',
    options: [
      { text: 'Gita' },
      { text: 'Hadi' },
      { text: 'Indah' },
      { text: 'Fajar' },
      { text: 'Hadi atau Gita' },
    ],
    correctIndex: 2,
    explanation: 'Meja memiliki 4 sisi: di depan Fajar ada Hadi, di kanan Fajar ada Gita, sehingga satu-satunya sisi tersisa di sebelah kiri Fajar ditempati Indah.',
  },

  // ================= SUBTES 7: SPASIAL KLASIFIKASI FIGURAL =================
  {
    id: 's7-q1',
    subtesId: 7,
    prompt: 'Pilihlah SATU gambar yang memiliki pola berbeda dari empat gambar lainnya:',
    options: [
      { text: 'A', diagramId: 'fig-cls-q1-a' },
      { text: 'B', diagramId: 'fig-cls-q1-b' },
      { text: 'C', diagramId: 'fig-cls-q1-c' },
      { text: 'D', diagramId: 'fig-cls-q1-d' },
      { text: 'E', diagramId: 'fig-cls-q1-e' },
    ],
    correctIndex: 2,
    explanation: 'Pada opsi A, B, D, dan E, jumlah titik di dalam poligon sama dengan jumlah sisi poligon (segitiga 3 titik, segiempat 4 titik, segilima 5 titik, segienam 6 titik). Opsi C adalah segiempat tetapi hanya memiliki 3 titik.',
  },
  {
    id: 's7-q2',
    subtesId: 7,
    prompt: 'Pilihlah SATU gambar yang memiliki arah pergerakan berbeda:',
    options: [
      { text: 'A', diagramId: 'fig-cls-q2-a' },
      { text: 'B', diagramId: 'fig-cls-q2-b' },
      { text: 'C', diagramId: 'fig-cls-q2-c' },
      { text: 'D', diagramId: 'fig-cls-q2-d' },
      { text: 'E', diagramId: 'fig-cls-q2-e' },
    ],
    correctIndex: 3,
    explanation: 'Pada gambar A, B, C, dan E, panah bergerak mengelilingi persegi searah jarum jam. Pada gambar D, arah panah berlawanan jarum jam.',
  },
  {
    id: 's7-q3',
    subtesId: 7,
    prompt: 'Pilihlah SATU gambar yang memiliki proporsi arsiran berbeda:',
    options: [
      { text: 'A', diagramId: 'fig-cls-q3-a' },
      { text: 'B', diagramId: 'fig-cls-q3-b' },
      { text: 'C', diagramId: 'fig-cls-q3-c' },
      { text: 'D', diagramId: 'fig-cls-q3-d' },
      { text: 'E', diagramId: 'fig-cls-q3-e' },
    ],
    correctIndex: 1,
    explanation: 'Gambar A, C, D, dan E mengarsir tepat 1/4 bagian bidang, sedangkan gambar B mengarsir 1/2 bagian bidang.',
  },
  {
    id: 's7-q4',
    subtesId: 7,
    prompt: 'Pilihlah SATU gambar yang bukan merupakan hasil rotasi dari empat gambar lainnya:',
    options: [
      { text: 'A', diagramId: 'fig-cls-q4-a' },
      { text: 'B', diagramId: 'fig-cls-q4-b' },
      { text: 'C', diagramId: 'fig-cls-q4-c' },
      { text: 'D', diagramId: 'fig-cls-q4-d' },
      { text: 'E', diagramId: 'fig-cls-q4-e' },
    ],
    correctIndex: 4,
    explanation: 'Gambar A, B, C, dan D adalah bentuk yang sama dan hanya diputar 90°, 180°, dan 270°. Gambar E merupakan hasil pencerminan (refleksi).',
  },

  // ================= SUBTES 8: SPASIAL ANALOGI FIGURAL =================
  {
    id: 's8-q1',
    subtesId: 8,
    diagramId: 'fig-ana-q1-prompt',
    prompt: 'Amati perubahan dari gambar pertama ke kedua. Gambar manakah yang tepat menggantikan tanda tanya (?)?',
    options: [
      { text: 'A', diagramId: 'fig-ana-q1-opt-a' },
      { text: 'B', diagramId: 'fig-ana-q1-opt-b' },
      { text: 'C', diagramId: 'fig-ana-q1-opt-c' },
      { text: 'D', diagramId: 'fig-ana-q1-opt-d' },
      { text: 'E', diagramId: 'fig-ana-q1-opt-e' },
    ],
    correctIndex: 1,
    explanation: 'Aturannya: bentuk luar dan bentuk dalam bertukar ukuran/posisi, dan bentuk yang pindah ke dalam diarsir penuh. Lingkaran besar + belah ketupat kecil menjadi belah ketupat besar + lingkaran kecil penuh (Opsi B).',
  },
  {
    id: 's8-q2',
    subtesId: 8,
    diagramId: 'fig-ana-q2-prompt',
    prompt: 'Tentukan gambar yang memiliki hubungan transformasi yang sama dengan pasangan pertama:',
    options: [
      { text: 'A', diagramId: 'fig-ana-q2-opt-a' },
      { text: 'B', diagramId: 'fig-ana-q2-opt-b' },
      { text: 'C', diagramId: 'fig-ana-q2-opt-c' },
      { text: 'D', diagramId: 'fig-ana-q2-opt-d' },
      { text: 'E', diagramId: 'fig-ana-q2-opt-e' },
    ],
    correctIndex: 3,
    explanation: 'Jumlah sisi poligon bertambah 1 (segitiga menjadi segiempat) dan titik di tengah dihilangkan. Maka segilima dengan titik berubah menjadi segienam kosong (Opsi D).',
  },
  {
    id: 's8-q3',
    subtesId: 8,
    diagramId: 'fig-ana-q3-prompt',
    prompt: 'Tentukan gambar hasil transformasi yang sesuai untuk menggantikan tanda tanya (?):',
    options: [
      { text: 'A', diagramId: 'fig-ana-q3-opt-a' },
      { text: 'B', diagramId: 'fig-ana-q3-opt-b' },
      { text: 'C', diagramId: 'fig-ana-q3-opt-c' },
      { text: 'D', diagramId: 'fig-ana-q3-opt-d' },
      { text: 'E', diagramId: 'fig-ana-q3-opt-e' },
    ],
    correctIndex: 2,
    explanation: 'Anak panah diputar 90° searah jarum jam dan bentuk kecil berpindah ke sisi seberang tangkai panah tanpa berubah isi. Dari 45° menjadi 135° dengan persegi penuh di sisi seberang (Opsi C).',
  },
  {
    id: 's8-q4',
    subtesId: 8,
    diagramId: 'fig-ana-q4-prompt',
    prompt: 'Pilihlah gambar yang tepat untuk melengkapi analogi figural di atas:',
    options: [
      { text: 'A', diagramId: 'fig-ana-q4-opt-a' },
      { text: 'B', diagramId: 'fig-ana-q4-opt-b' },
      { text: 'C', diagramId: 'fig-ana-q4-opt-c' },
      { text: 'D', diagramId: 'fig-ana-q4-opt-d' },
      { text: 'E', diagramId: 'fig-ana-q4-opt-e' },
    ],
    correctIndex: 0,
    explanation: 'Garis tepi putus-putus berubah menjadi garis penuh, dan arsiran berpindah dari sisi kiri ke sisi kanan (Opsi A).',
  },

  // ================= SUBTES 9: SPASIAL ROTASI 3D =================
  {
    id: 's9-q1',
    subtesId: 9,
    diagramId: 'rot3d-q1-prompt',
    prompt: 'Kubus di atas diputar 90° searah jarum jam jika dilihat dari atas (panah hijau). Tampilan kubus setelah diputar adalah ...',
    options: [
      { text: 'A', diagramId: 'rot3d-q1-opt-a' },
      { text: 'B', diagramId: 'rot3d-q1-opt-b' },
      { text: 'C', diagramId: 'rot3d-q1-opt-c' },
      { text: 'D', diagramId: 'rot3d-q1-opt-d' },
      { text: 'E', diagramId: 'rot3d-q1-opt-e' },
    ],
    correctIndex: 2,
    explanation: 'Saat kubus diputar 90° searah jarum jam dari atas, sisi atas (+) tetap di atas, sedangkan sisi kanan-depan (▲) bergeser ke posisi kiri-depan (Opsi C).',
  },
  {
    id: 's9-q2',
    subtesId: 9,
    diagramId: 'rot3d-q2-prompt',
    prompt: 'Jika jaring-jaring kubus di atas dilipat membentuk kubus 3D dengan simbol menghadap keluar, kubus manakah yang MUNGKIN terbentuk?',
    options: [
      { text: 'A', diagramId: 'rot3d-q2-opt-a' },
      { text: 'B', diagramId: 'rot3d-q2-opt-b' },
      { text: 'C', diagramId: 'rot3d-q2-opt-c' },
      { text: 'D', diagramId: 'rot3d-q2-opt-d' },
      { text: 'E', diagramId: 'rot3d-q2-opt-e' },
    ],
    correctIndex: 1,
    explanation: 'Pasangan sisi berhadapan pada jaring-jaring adalah (● dengan ✚), (■ dengan ▲), dan (◆ dengan ★). Sisi yang berhadapan tidak mungkin tampak bersebelahan secara bersamaan. Hanya Opsi B (●, ■, ◆) yang valid.',
  },
  {
    id: 's9-q3',
    subtesId: 9,
    diagramId: 'rot3d-q3-prompt',
    prompt: 'Berapakah jumlah total kubus satuan yang menyusun bangun ruang bertingkat tersebut (termasuk kubus yang tersembunyi di bagian bawah/belakang)?',
    options: [
      { text: '10 kubus' },
      { text: '12 kubus' },
      { text: '14 kubus' },
      { text: '15 kubus' },
      { text: '16 kubus' },
    ],
    correctIndex: 2,
    explanation: 'Lapisan dasar berukuran 3×3 = 9 kubus, lapisan tengah 2×2 = 4 kubus, dan lapisan puncak = 1 kubus. Total = 9 + 4 + 1 = 14 kubus satuan.',
  },
  {
    id: 's9-q4',
    subtesId: 9,
    diagramId: 'rot3d-q4-prompt',
    prompt: 'Bangun 3D berbentuk huruf L tersebut diputar 90° mengelilingi sumbu vertikal. Manakah gambar yang menunjukkan bangun yang SAMA?',
    options: [
      { text: 'A', diagramId: 'rot3d-q4-opt-a' },
      { text: 'B', diagramId: 'rot3d-q4-opt-b' },
      { text: 'C', diagramId: 'rot3d-q4-opt-c' },
      { text: 'D', diagramId: 'rot3d-q4-opt-d' },
      { text: 'E', diagramId: 'rot3d-q4-opt-e' },
    ],
    correctIndex: 3,
    explanation: 'Bangun asal terdiri dari menara vertikal 3 kubus dan 1 kubus dasar menjorok ke samping. Diputar 90° horizontal tetap memiliki menara 3 kubus dengan 1 cabang dasar di arah sumbu tegak lurus lainnya (Opsi D).',
  },

  // ================= SUBTES 10: SPASIAL POLA =================
  {
    id: 's10-q1',
    subtesId: 10,
    diagramId: 'pat-q1-prompt',
    prompt: 'Perhatikan pola pada matriks 3×3 di atas. Gambar manakah yang tepat untuk mengisi kotak bertanda tanya (?)?',
    options: [
      { text: 'A', diagramId: 'pat-q1-opt-a' },
      { text: 'B', diagramId: 'pat-q1-opt-b' },
      { text: 'C', diagramId: 'pat-q1-opt-c' },
      { text: 'D', diagramId: 'pat-q1-opt-d' },
      { text: 'E', diagramId: 'pat-q1-opt-e' },
    ],
    correctIndex: 0,
    explanation: 'Setiap baris dan kolom memuat tepat 1 Lingkaran, 1 Segitiga, dan 1 Persegi, serta masing-masing 1 isi Kosong, 1 bertitik tengah, dan 1 Penuh. Baris ke-3 kekurangan Segitiga isi Penuh (Opsi A).',
  },
  {
    id: 's10-q2',
    subtesId: 10,
    diagramId: 'pat-q2-prompt',
    prompt: 'Berdasarkan urutan pola di atas, gambar ke-4 yang paling tepat adalah ...',
    options: [
      { text: 'A', diagramId: 'pat-q2-opt-a' },
      { text: 'B', diagramId: 'pat-q2-opt-b' },
      { text: 'C', diagramId: 'pat-q2-opt-c' },
      { text: 'D', diagramId: 'pat-q2-opt-d' },
      { text: 'E', diagramId: 'pat-q2-opt-e' },
    ],
    correctIndex: 2,
    explanation: 'Titik hitam berpindah sudut searah jarum jam: kiri-atas → kanan-atas → kanan-bawah → kiri-bawah. Garis diagonal bergantian arah pada tiap langkah, sehingga langkah ke-4 berdiagonal kanan-atas ke kiri-bawah (Opsi C).',
  },
  {
    id: 's10-q3',
    subtesId: 10,
    diagramId: 'pat-q3-prompt',
    prompt: 'Pada setiap baris matriks di atas, kotak ketiga dibentuk dari penggabungan kotak pertama dan kedua. Kotak ketiga pada baris terakhir adalah ...',
    options: [
      { text: 'A', diagramId: 'pat-q3-opt-a' },
      { text: 'B', diagramId: 'pat-q3-opt-b' },
      { text: 'C', diagramId: 'pat-q3-opt-c' },
      { text: 'D', diagramId: 'pat-q3-opt-d' },
      { text: 'E', diagramId: 'pat-q3-opt-e' },
    ],
    correctIndex: 1,
    explanation: 'Penggabungan belah ketupat (kotak 1) dan garis miring kiri-bawah ke kanan-atas (kotak 2) menghasilkan Opsi B.',
  },
  {
    id: 's10-q4',
    subtesId: 10,
    diagramId: 'pat-q4-prompt',
    prompt: 'Amati perubahan jumlah ruas garis pada deret di atas. Gambar keempat yang melengkapi pola adalah ...',
    options: [
      { text: 'A', diagramId: 'pat-q4-opt-a' },
      { text: 'B', diagramId: 'pat-q4-opt-b' },
      { text: 'C', diagramId: 'pat-q4-opt-c' },
      { text: 'D', diagramId: 'pat-q4-opt-d' },
      { text: 'E', diagramId: 'pat-q4-opt-e' },
    ],
    correctIndex: 3,
    explanation: 'Jumlah ruas garis bertambah satu setiap langkah: 1 garis → 2 garis → 3 garis (segitiga) → 4 garis tertutup (persegi pada Opsi D).',
  },

  // ================= SUBTES 11: MEKANIK MEKANIKAL =================
  {
    id: 's11-q1',
    subtesId: 11,
    diagramId: 'mech-q1',
    prompt: 'Jika roda gigi A (24 gigi) berputar searah jarum jam, bagaimanakah arah putaran dan kecepatan roda gigi C (36 gigi)?',
    options: [
      { text: 'Searah jarum jam, dengan kecepatan 2/3 kali kecepatan A' },
      { text: 'Berlawanan jarum jam, dengan kecepatan 2/3 kali kecepatan A' },
      { text: 'Searah jarum jam, dengan kecepatan 3/2 kali kecepatan A' },
      { text: 'Berlawanan jarum jam, dengan kecepatan sama dengan A' },
      { text: 'Searah jarum jam, dengan kecepatan 1/2 kali kecepatan A' },
    ],
    correctIndex: 0,
    explanation: 'Roda gigi bersinggungan berputar berlawanan arah: A searah jarum jam → B berlawanan → C searah jarum jam. Rasio kecepatan C terhadap A = 24 / 36 = 2/3 kali.',
  },
  {
    id: 's11-q2',
    subtesId: 11,
    diagramId: 'mech-q2',
    prompt: 'Sistem katrol ideal di atas terdiri dari 1 katrol tetap dan 1 katrol bergerak. Berapakah gaya tarik minimal F untuk mengangkat beban 120 N?',
    options: [
      { text: '30 N' },
      { text: '40 N' },
      { text: '60 N' },
      { text: '80 N' },
      { text: '120 N' },
    ],
    correctIndex: 2,
    explanation: 'Beban ditopang oleh 2 segmen tali pada katrol bergerak, sehingga keuntungan mekanis = 2. Gaya minimal F = 120 N / 2 = 60 N.',
  },
  {
    id: 's11-q3',
    subtesId: 11,
    diagramId: 'mech-q3',
    prompt: 'Agar tuas di atas berada dalam keadaan seimbang horizontal (massa batang diabaikan), berapakah besar beban W yang diperlukan?',
    options: [
      { text: '30 N' },
      { text: '40 N' },
      { text: '50 N' },
      { text: '60 N' },
      { text: '80 N' },
    ],
    correctIndex: 3,
    explanation: 'Syarat kesetimbangan momen gaya: F₁ × L₁ = F₂ × L₂ → 40 N × 3 m = W × 2 m → 120 = 2W → W = 60 N.',
  },
  {
    id: 's11-q4',
    subtesId: 11,
    diagramId: 'mech-q4',
    prompt: 'Pada tangki air dengan tiga lubang P, Q, dan R seperti gambar, manakah pernyataan yang paling tepat mengenai tekanan dan pancaran air?',
    options: [
      { text: 'Lubang P memancar paling jauh karena paling dekat permukaan udara.' },
      { text: 'Lubang Q memiliki tekanan hidrostatis paling besar.' },
      { text: 'Lubang R memancar paling jauh karena memiliki tekanan hidrostatis terbesar.' },
      { text: 'Ketiga lubang memancar pada jarak yang sama.' },
      { text: 'Air pada lubang R tidak keluar karena tertutup tekanan bawah.' },
    ],
    correctIndex: 2,
    explanation: 'Tekanan hidrostatis sebanding dengan kedalaman (P = ρ·g·h). Lubang R berada paling dalam sehingga tekanannya terbesar dan memancar paling jauh.',
  },

  // ================= SUBTES 12: PENGGUNAAN BAHASA MELENGKAPI KALIMAT =================
  {
    id: 's12-q1',
    subtesId: 12,
    prompt: 'Pengawas mengimbau peserta agar mematuhi tata tertib asesmen _____ pelaksanaan di kelas berlangsung kondusif dan adil.',
    options: [
      { text: 'sedangkan' },
      { text: 'supaya' },
      { text: 'melainkan' },
      { text: 'meskipun' },
      { text: 'padahal' },
    ],
    correctIndex: 1,
    explanation: 'Konjungsi tujuan yang tepat untuk menghubungkan imbauan dan tujuan pelaksanaan yang kondusif adalah "supaya" (atau agar).',
  },
  {
    id: 's12-q2',
    subtesId: 12,
    prompt: 'Penulisan kata baku yang tepat untuk melengkapi kalimat: "Operator sekolah sedang melakukan _____ data peserta melalui laman Verval-PD."',
    options: [
      { text: 'sinkronisasi' },
      { text: 'singkronisasi' },
      { text: 'sinkronasasi' },
      { text: 'syinkronisasi' },
      { text: 'sinkronisiasi' },
    ],
    correctIndex: 0,
    explanation: 'Menurut KBBI dan EYD V, bentuk baku dari kata serapan tersebut adalah "sinkronisasi" (bukan singkronisasi).',
  },
  {
    id: 's12-q3',
    subtesId: 12,
    prompt: '_____ terjadi gangguan jaringan secara tiba-tiba, sistem aplikasi akan menghentikan penghitung waktu secara otomatis.',
    options: [
      { text: 'Oleh karena' },
      { text: 'Apabila' },
      { text: 'Sebabnya' },
      { text: 'Melainkan' },
      { text: 'Tetapi' },
    ],
    correctIndex: 1,
    explanation: 'Kalimat tersebut menyatakan syarat atau kondisi kejadian, sehingga konjungsi pengandaian/syarat yang tepat adalah "Apabila".',
  },
  {
    id: 's12-q4',
    subtesId: 12,
    prompt: 'Lengkapi kalimat agar menjadi efektif: "Para peserta _____ memasuki ruang kelas masing-masing setelah bel tanda ujian berbunyi."',
    options: [
      { text: 'segera' },
      { text: 'langsung segera' },
      { text: 'dengan cepat sekali' },
      { text: 'semuanya pada' },
      { text: 'saling bersama' },
    ],
    correctIndex: 0,
    explanation: 'Kata "segera" ringkas, jelas, dan tidak menimbulkan pleonasme (kemubaziran kata seperti "langsung segera" atau "semuanya pada").',
  },

  // ================= SUBTES 13: KLERIKAL AKURASI =================
  {
    id: 's13-q1',
    subtesId: 13,
    prompt: 'Manakah kode yang SAMA PERSIS dengan kode acuan berikut?\n\nAcuan: ABM-2026-XI-0891K',
    options: [
      { text: 'ABM-2026-IX-0891K' },
      { text: 'ABM-2026-XI-0819K' },
      { text: 'ABM-2026-XI-0891K' },
      { text: 'ABM-2026-XI-O891K' },
      { text: 'ABM-2026-XI-0891k' },
    ],
    correctIndex: 2,
    explanation: 'Perhatikan perbedaan detail: Opsi A tertukar IX, Opsi B tertukar 819, Opsi D memakai huruf O bukan angka 0, Opsi E huruf k kecil. Opsi C sama persis.',
  },
  {
    id: 's13-q2',
    subtesId: 13,
    prompt: 'Hitung berapa pasang kode berikut yang IDENTIK (sama persis antara kiri dan kanan):\n\n1) 2026-BPPP-741  |  2026-BPPP-741\n2) SMA1-KRSN-092  |  SMA1-KRSN-029\n3) 0087451290     |  0087451290\n4) NISN-XI-MA04   |  NISN-XI-MA04',
    options: [
      { text: '1 pasang' },
      { text: '2 pasang' },
      { text: '3 pasang' },
      { text: '4 pasang' },
      { text: 'Tidak ada yang identik' },
    ],
    correctIndex: 2,
    explanation: 'Pasangan (1), (3), dan (4) identik, sedangkan pasangan (2) berbeda pada angka akhir 092 vs 029. Total ada 3 pasang identik.',
  },
  {
    id: 's13-q3',
    subtesId: 13,
    prompt: 'Temukan SATU kode di bawah ini yang BERBEDA dari acuan:\n\nAcuan: VPD-7728-SMK-B',
    options: [
      { text: 'VPD-7728-SMK-B' },
      { text: 'VPD-7728-SMK-B' },
      { text: 'VPD-7278-SMK-B' },
      { text: 'VPD-7728-SMK-B' },
      { text: 'VPD-7728-SMK-B' },
    ],
    correctIndex: 2,
    explanation: 'Opsi C tertulis "7278" yang seharusnya "7728". Keempat opsi lainnya identik dengan acuan.',
  },
  {
    id: 's13-q4',
    subtesId: 13,
    prompt: 'Manakah penulisan alamat dan kode pos yang SAMA PERSIS dengan acuan?\n\nAcuan: Jl. Jend. Sudirman Kav. 45, 10210',
    options: [
      { text: 'Jl. Jend. Sudirman Kav. 45, 10210' },
      { text: 'Jl. Jend Sudirman Kav. 45, 10210' },
      { text: 'Jl. Jend. Sudirman Kav. 54, 10210' },
      { text: 'Jl. Jend. Sudirman Kav. 45, 10120' },
      { text: 'Jl. Jend. Soedirman Kav. 45, 10210' },
    ],
    correctIndex: 0,
    explanation: 'Hanya Opsi A yang persis sama tanda baca titik, angka kavling 45, ejaan Sudirman, dan kode pos 10210.',
  },

  // ================= SUBTES 14: KLERIKAL MEMORY =================
  {
    id: 's14-q1',
    subtesId: 14,
    memoryItems: [
      { label: 'Ruang Anggrek', value: 'Token: A492' },
      { label: 'Ruang Melati', value: 'Token: M715' },
      { label: 'Ruang Kenanga', value: 'Token: K308' },
      { label: 'Ruang Teratai', value: 'Token: T864' },
    ],
    memorySeconds: 10,
    prompt: 'Berdasarkan kartu informasi yang baru saja Anda hafalkan, berapakah Token untuk Ruang Kenanga?',
    options: [
      { text: 'K380' },
      { text: 'K308' },
      { text: 'M715' },
      { text: 'K803' },
      { text: 'T308' },
    ],
    correctIndex: 1,
    explanation: 'Pada daftar kartu memori: Ruang Kenanga memiliki pasangan Token K308.',
  },
  {
    id: 's14-q2',
    subtesId: 14,
    memoryItems: [
      { label: 'Kode Verbal', value: 'V-114' },
      { label: 'Kode Spasial', value: 'S-290' },
      { label: 'Kode Mekanik', value: 'M-532' },
      { label: 'Kode Klerikal', value: 'C-847' },
    ],
    memorySeconds: 10,
    prompt: 'Pasangan kode yang tepat untuk Kode Mekanik dan Kode Spasial secara berurutan adalah ...',
    options: [
      { text: 'M-523 dan S-290' },
      { text: 'M-532 dan S-209' },
      { text: 'M-532 dan S-290' },
      { text: 'M-352 dan S-290' },
      { text: 'C-847 dan S-290' },
    ],
    correctIndex: 2,
    explanation: 'Sesuai kartu memori: Kode Mekanik = M-532 dan Kode Spasial = S-290.',
  },
  {
    id: 's14-q3',
    subtesId: 14,
    memoryItems: [
      { label: 'Dina (XI-A)', value: 'NISN 00912' },
      { label: 'Rafi (XI-B)', value: 'NISN 00945' },
      { label: 'Sari (XI-C)', value: 'NISN 00978' },
      { label: 'Bima (XI-D)', value: 'NISN 00991' },
    ],
    memorySeconds: 10,
    prompt: 'Siapakah murid yang memiliki akhiran NISN 00978 dan dari kelas manakah ia berasal?',
    options: [
      { text: 'Dina (XI-A)' },
      { text: 'Rafi (XI-B)' },
      { text: 'Sari (XI-C)' },
      { text: 'Bima (XI-D)' },
      { text: 'Sari (XI-B)' },
    ],
    correctIndex: 2,
    explanation: 'Berdasarkan daftar peserta yang ditampilkan: Sari (XI-C) memiliki nomor 00978.',
  },
  {
    id: 's14-q4',
    subtesId: 14,
    memoryItems: [
      { label: 'Tahap I', value: '23 Nov 2026' },
      { label: 'Tahap II', value: '30 Nov 2026' },
      { label: 'Uji Coba', value: '17 Nov 2026' },
      { label: 'Susulan', value: '07 Des 2026' },
    ],
    memorySeconds: 10,
    prompt: 'Pada tanggal berapakah jadwal Uji Coba yang tertera pada kartu memori tadi?',
    options: [
      { text: '15 Nov 2026' },
      { text: '17 Nov 2026' },
      { text: '23 Nov 2026' },
      { text: '27 Nov 2026' },
      { text: '30 Nov 2026' },
    ],
    correctIndex: 1,
    explanation: 'Pada kartu memori tertera Uji Coba: 17 Nov 2026.',
  },
];
