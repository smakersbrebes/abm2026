import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileText,
  Laptop,
  Play,
  Search,
  Smartphone,
  Wifi,
  X,
} from 'lucide-react';
import {
  DOC_SECTIONS,
  DocCategory,
  SCHEDULE_STAGES,
  ScheduleStage,
  SEARCH_INDEX,
  SUBTES_LIST,
} from '../data/abmGuideData';

interface DocViewProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onStartPractice: (subtesId?: number) => void;
}

type RoleTab = 'pusat' | 'koordinasi' | 'disdik' | 'kanwil' | 'satdik' | 'semua';

export const DocView: React.FC<DocViewProps> = ({
  searchQuery,
  onSearchChange,
  onStartPractice,
}) => {
  const [activeCategory, setActiveCategory] = useState<DocCategory>('all');
  const [activeSectionId, setActiveSectionId] = useState<string>('kata-pengantar');
  const [scheduleFilter, setScheduleFilter] = useState<'all' | ScheduleStage['phase']>('all');
  const [roleTab, setRoleTab] = useState<RoleTab>('satdik');
  const [deviceCheck, setDeviceCheck] = useState<Record<string, boolean>>({
    appInstalled: false,
    batteryFull: false,
    internetReady: false,
    storageOk: false,
    touchSpeakerOk: false,
  });

  // Detect basic client device info for Lampiran 3 readiness checker
  const detectedEnv = useMemo(() => {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    let osLabel = 'Perangkat Desktop / Lainnya';
    let osStatus: 'ok' | 'info' = 'info';

    if (isAndroid) {
      const match = ua.match(/Android\s([0-9.]+)/);
      const ver = match ? parseFloat(match[1]) : null;
      osLabel = ver ? `Android ${ver}` : 'Android';
      osStatus = ver === null || ver >= 7 ? 'ok' : 'info';
    } else if (isIOS) {
      const match = ua.match(/OS\s([0-9_]+)/);
      const verStr = match ? match[1].replace(/_/g, '.') : null;
      const verNum = verStr ? parseFloat(verStr) : null;
      osLabel = verStr ? `iOS ${verStr}` : 'iOS';
      osStatus = verNum === null || verNum >= 16.4 ? 'ok' : 'info';
    }

    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    const isTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    return { osLabel, osStatus, isOnline, isTouch, isMobile: isAndroid || isIOS };
  }, []);

  const filteredToc = useMemo(() => {
    if (activeCategory === 'all') return DOC_SECTIONS;
    return DOC_SECTIONS.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const terms = q.split(/\s+/).filter(Boolean);
    return SEARCH_INDEX.filter((entry) => {
      const haystack = `${entry.sectionLabel} ${entry.title} ${entry.content}`.toLowerCase();
      return terms.every((t) => haystack.includes(t));
    });
  }, [searchQuery]);

  const filteredSchedule = useMemo(() => {
    if (scheduleFilter === 'all') return SCHEDULE_STAGES;
    return SCHEDULE_STAGES.filter((s) => s.phase === scheduleFilter);
  }, [scheduleFilter]);

  const jumpToSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const highlightText = (text: string, query: string) => {
    const q = query.trim();
    if (!q) return text;
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, idx) =>
      regex.test(part) ? (
        <mark
          key={idx}
          className="bg-amber-200/80 dark:bg-amber-500/30 text-slate-900 dark:text-amber-200 rounded px-0.5"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const readinessCompleted = Object.values(deviceCheck).filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Hero / SMAN 1 Kersana School Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 mb-8">
        {/* School Campus Background */}
        <img
          src={`${import.meta.env.BASE_URL}assets/aistudio/background_fbf6dcfa.jpg`}
          alt="Lingkungan Gedung SMA Negeri 1 Kersana Kabupaten Brebes"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Measured Contrast Scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-900/82 to-slate-900/65"
        />

        <div className="relative z-10 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 flex flex-col justify-between space-y-5">
            <div className="space-y-3.5">
              {/* Official Logo Strip */}
              <div className="inline-flex items-center bg-white/95 rounded-xl px-3.5 py-2 shadow-sm max-w-full">
                <img
                  src={`${import.meta.env.BASE_URL}assets/aistudio/Header_f54afaf9.png`}
                  alt="Logo Tut Wuri Handayani, Provinsi Jawa Tengah, SMA Negeri 1 Kersana, Sekolah Berintegritas, dan Adiwiyata"
                  referrerPolicy="no-referrer"
                  className="h-9 sm:h-12 w-auto object-contain"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-teal-300 font-medium">
                <span>SMA Negeri 1 Kersana · Kabupaten Brebes</span>
                <span aria-hidden="true">·</span>
                <span>BPPP &amp; Pusmendik Kemendikdasmen</span>
                <span aria-hidden="true">·</span>
                <span>Kelas XI Tahun 2026</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white text-balance">
                Pedoman Pelaksanaan Asesmen Bakat Murid (ABM) 2026
              </h1>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                Portal dokumentasi teknis dan simulasi latihan ABM Tahun 2026 khusus bagi murid kelas XI, Operator ABM, serta Pengawas di lingkungan <strong>SMA Negeri 1 Kersana</strong>. Memuat alur peserta, jadwal nasional, syarat perangkat seluler, hingga latihan interaktif 14 subtes.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onStartPractice()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4" />
                Coba Simulasi 14 Subtes
              </button>
              <a
                href={`${import.meta.env.BASE_URL}assets/aistudio/PEDOMAN_PELAKSANAAN_ABM_2026_Revisi_1dd73a01.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/25 bg-slate-950/50 hover:bg-slate-950/75 text-sm font-medium text-white transition-colors"
              >
                <FileText className="w-4 h-4" />
                Lihat PDF Asli
                <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
              </a>
            </div>
          </div>

          {/* 4 Key Document Specs */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-950/70 border border-white/15 backdrop-blur-sm p-4 flex flex-col justify-between">
              <span className="text-xs text-slate-300">Jumlah Subtes</span>
              <span className="text-2xl font-bold font-mono tabular-nums text-white mt-1">
                14
              </span>
              <span className="text-xs text-slate-300 mt-1">7 Rumpun Bakat</span>
            </div>
            <div className="rounded-xl bg-slate-950/70 border border-white/15 backdrop-blur-sm p-4 flex flex-col justify-between">
              <span className="text-xs text-slate-300">Total Soal &amp; Durasi</span>
              <span className="text-2xl font-bold font-mono tabular-nums text-teal-300 mt-1">
                160 / 122m
              </span>
              <span className="text-xs text-slate-300 mt-1">08.00–16.00 WIB</span>
            </div>
            <div className="rounded-xl bg-slate-950/70 border border-white/15 backdrop-blur-sm p-4 flex flex-col justify-between">
              <span className="text-xs text-slate-300">Moda Asesmen</span>
              <span className="text-lg font-bold text-white mt-1">
                Seluler Daring
              </span>
              <span className="text-xs text-slate-300 mt-1">Android 7+ / iOS 16.4+</span>
            </div>
            <div className="rounded-xl bg-slate-950/70 border border-white/15 backdrop-blur-sm p-4 flex flex-col justify-between">
              <span className="text-xs text-slate-300">Biaya Kepesertaan</span>
              <span className="text-lg font-bold text-emerald-300 mt-1">
                Gratis (Rp0)
              </span>
              <span className="text-xs text-slate-300 mt-1">Peserta Kelas XI</span>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Search Results Panel (Visible when user searches) */}
      {searchQuery.trim() !== '' && (
        <section
          aria-label="Hasil pencarian instan"
          className="mb-8 rounded-2xl border border-teal-200 dark:border-teal-800 bg-white dark:bg-slate-900 p-5 sm:p-6"
        >
          <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <Search className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>
                Hasil Pencarian untuk &ldquo;{searchQuery}&rdquo; ({searchResults.length} ditemukan)
              </span>
            </div>
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              Bersihkan
            </button>
          </div>

          {searchResults.length === 0 ? (
            <p className="py-6 text-sm text-center text-slate-500 dark:text-slate-400">
              Tidak ada bagian pedoman yang cocok dengan kata kunci tersebut. Coba kata kunci seperti &ldquo;NISN&rdquo;, &ldquo;jadwal&rdquo;, &ldquo;Android&rdquo;, &ldquo;koneksi&rdquo;, atau &ldquo;subtes&rdquo;.
            </p>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800 mt-2">
              {searchResults.map((res) => (
                <button
                  key={res.id}
                  type="button"
                  onClick={() => jumpToSection(res.sectionId)}
                  className="w-full text-left py-3.5 px-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-teal-700 dark:text-teal-400">
                      {res.sectionLabel}
                    </div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {highlightText(res.title, searchQuery)}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {highlightText(res.content, searchQuery)}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Main 2-Column Documentation Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sticky Sidebar Navigation */}
        <aside className="lg:col-span-3 lg:sticky lg:top-20 space-y-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Daftar Isi Pedoman
              </h2>
              <BookOpen className="w-4 h-4 text-slate-400" />
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-1">
              {[
                { id: 'all', label: 'Semua' },
                { id: 'umum', label: 'Umum' },
                { id: 'peserta', label: 'Peserta' },
                { id: 'jadwal', label: 'Pelaksanaan' },
                { id: 'lampiran', label: 'Lampiran' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id as DocCategory)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-teal-700 text-white dark:bg-teal-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <nav aria-label="Navigasi bab pedoman" className="space-y-0.5 pt-1">
              {filteredToc.map((sec) => {
                const isActive = activeSectionId === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => jumpToSection(sec.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    <span className="truncate">{sec.shortTitle}</span>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Right Documentation Content Stream */}
        <div className="lg:col-span-9 space-y-10">
          {/* KATA PENGANTAR */}
          <article
            id="kata-pengantar"
            className="scroll-mt-24 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-4"
          >
            <div className="text-xs font-mono text-teal-700 dark:text-teal-400">
              Kata Pengantar · Halaman i
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50">
              Kata Pengantar Resmi BPPP Kemendikdasmen
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                Dalam rangka mendukung layanan pengujian pendidikan yang mudah diakses dan memberikan informasi mengenai potensi murid, Balai Pengelolaan Pengujian Pendidikan (BPPP) bersama Pusat Asesmen Pendidikan (Pusmendik) menyelenggarakan Asesmen Bakat Murid (ABM) Tahun 2026 bagi murid kelas XI pada jenjang SMA, SMK, dan MA.
              </p>
              <p>
                ABM dirancang untuk memberikan pemahaman kepada murid terkait potensi yang dimiliki sehingga memudahkan mereka merencanakan masa depan. Pelaksanaan ABM Tahun 2026 berfokus pada pengukuran bakat murid yang diselenggarakan secara daring menggunakan perangkat seluler masing-masing peserta dengan tetap memperhatikan mutu instrumen, keterbacaan butir pada perangkat, keamanan data, kesiapan sistem, integritas, serta dukungan satuan pendidikan dan pemerintah daerah.
              </p>
              <p>
                Pedoman ini disusun sebagai acuan bagi penyelenggara pusat, unsur pendukung pusat, Dinas Pendidikan Provinsi, Kantor Wilayah Kementerian Agama Provinsi, satuan pendidikan, Operator ABM, pengawas, hingga murid agar pelaksanaan ABM Tahun 2026 berjalan secara tertib, sederhana, aman, dan akuntabel.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap justify-between gap-2">
              <span>Jakarta, Oktober 2026</span>
              <span>Kepala BPPP: Fransisca Nur&rsquo;aini Krisna, S.Si., Apt., M.P.P.</span>
            </div>
          </article>

          {/* BAB I PENDAHULUAN */}
          <article
            id="bab-1"
            className="scroll-mt-24 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6"
          >
            <div>
              <div className="text-xs font-mono text-teal-700 dark:text-teal-400">
                Bab I · Halaman 1–3
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 mt-1">
                Pendahuluan
              </h2>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                A. Latar Belakang
              </h3>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                Asesmen Bakat Murid (ABM) merupakan asesmen yang mengukur potensi murid pada bidang-bidang khusus, meliputi kemampuan <strong>verbal, kuantitatif, penalaran, figural/spasial, mekanikal, penggunaan bahasa, dan klerikal</strong> sesuai instrumen Pusat Asesmen Pendidikan (Pusmendik).
              </p>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                ABM berbeda dengan tes prestasi yang mengukur penguasaan pengetahuan akademik. Hasil ABM memberi gambaran profil bakat murid sebagai bahan pertimbangan pengembangan diri, proses pembelajaran, serta perencanaan pendidikan lanjutan — namun bukan satu-satunya dasar dalam menentukan pilihan akademik, program studi, atau pekerjaan. Pada tahun 2026, ABM dialihkan ke perangkat seluler untuk memperluas akses layanan dengan tetap menjaga mutu pengukuran.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2.5">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  B. Tujuan Pedoman
                </h3>
                <ol className="list-decimal list-outside ml-4 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                  <li>Memberikan acuan pelaksanaan ABM Tahun 2026.</li>
                  <li>Menjelaskan tugas dan tanggung jawab pihak yang terlibat.</li>
                  <li>Mengatur pendataan, persiapan, dan pelaksanaan asesmen.</li>
                  <li>Mengatur mekanisme penanganan kendala, pemantauan, dan pelaporan.</li>
                  <li>Memastikan layanan dilaksanakan secara tertib, aman, dan mudah dipahami.</li>
                </ol>
              </div>

              <div className="space-y-2.5">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  D. Prinsip Pelaksanaan
                </h3>
                <ol className="list-decimal list-outside ml-4 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                  <li>Mudah diakses oleh murid.</li>
                  <li>Menggunakan data murid yang bersumber dari Dapodik dan EMIS.</li>
                  <li>Pelaksanaan diatur satuan pendidikan dalam rentang jadwal nasional.</li>
                  <li>Peserta memakai perangkat seluler masing-masing (dapat difasilitasi sekolah bila perlu).</li>
                  <li>Pelaksanaan tetap berada dalam pengawasan satuan pendidikan.</li>
                  <li>Hasil asesmen ditampilkan setelah peserta menyelesaikan asesmen.</li>
                  <li>Pelaksanaan dikendalikan sesuai kapasitas sistem.</li>
                </ol>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1.5">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  C. Sasaran
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Murid aktif kelas XI pada SMA, SMK, dan MA yang tercatat di Dapodik atau EMIS. Keikutsertaan murid <strong>tidak bersifat wajib</strong>.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1.5">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  E. Ruang Lingkup
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Dilaksanakan secara nasional melalui aplikasi seluler daring. Peserta mengikuti asesmen <strong>satu kali</strong> pada hari yang ditetapkan sekolah menggunakan ruang kelas dan jaringan sekolah atau paket data pribadi.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1.5">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  F. Pembiayaan
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Murid dan satuan pendidikan <strong>tidak dikenakan biaya apapun</strong> oleh BPPP. Biaya operasional di tingkat sekolah dikelola mandiri oleh masing-masing satuan pendidikan.
                </p>
              </div>
            </div>
          </article>

          {/* BAB II DATA PESERTA */}
          <article
            id="bab-2"
            className="scroll-mt-24 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6"
          >
            <div>
              <div className="text-xs font-mono text-teal-700 dark:text-teal-400">
                Bab II · Halaman 4–5
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 mt-1">
                Data Peserta
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  A. Persyaratan Peserta
                </h3>
                <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li>Merupakan murid aktif kelas XI pada SMA, SMK, atau MA.</li>
                  <li>Memiliki <strong>NISN valid</strong> dan tercatat aktif pada <strong>Dapodik</strong> (SMA &amp; SMK) atau <strong>EMIS</strong> (MA &amp; MAK).</li>
                </ul>
              </div>

              <div className="space-y-2.5">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  B. Sumber &amp; Sinkronisasi Data
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Data berasal dari Dapodik dan EMIS yang telah diverifikasi dan divalidasi pada <strong>Verval-PD</strong> (Pusdatin Kemendikdasmen). Pemutakhiran dilakukan melalui Dapodik/EMIS, lalu data tervalidasi di Verval-PD disinkronkan secara periodik ke sistem ABM.
                </p>
              </div>
            </div>

            {/* Visual Flow: Penanganan Ketidaksesuaian Data */}
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                C. Alur Penanganan Ketidaksesuaian Data
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {[
                  {
                    step: '01',
                    title: 'Cek NISN & NPSN',
                    desc: 'Peserta memeriksa kesesuaian data diri di aplikasi ABM menggunakan NISN dan NPSN.',
                  },
                  {
                    step: '02',
                    title: 'Lapor Operator ABM',
                    desc: 'Jika tidak ditemukan atau salah, segera lapor kepada Operator ABM Sekolah/Madrasah.',
                  },
                  {
                    step: '03',
                    title: 'Sinkronisasi Periodik',
                    desc: 'Setelah diperbaiki di Dapodik/EMIS & Verval-PD, data disinkronkan ulang ke sistem ABM.',
                  },
                  {
                    step: '04',
                    title: 'Dukungan Wilayah',
                    desc: 'Disdik Provinsi atau Kanwil Kemenag Provinsi membantu kasus yang butuh dukungan wilayah.',
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-4 space-y-1.5"
                  >
                    <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400">
                      Langkah {item.step}
                    </span>
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* BAB III TUGAS PENYELENGGARA */}
          <article
            id="bab-3"
            className="scroll-mt-24 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-5"
          >
            <div>
              <div className="text-xs font-mono text-teal-700 dark:text-teal-400">
                Bab III · Halaman 6–8
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 mt-1">
                Tugas dan Tanggung Jawab Penyelenggara
              </h2>
            </div>

            {/* Interactive Role Selector */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
              {[
                { id: 'satdik', label: 'Satuan Pendidikan' },
                { id: 'pusat', label: 'Panitia Pusat' },
                { id: 'koordinasi', label: 'Koordinasi Pusat' },
                { id: 'disdik', label: 'Disdik Provinsi' },
                { id: 'kanwil', label: 'Kanwil Kemenag' },
                { id: 'semua', label: 'Tampilkan Semua' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setRoleTab(t.id as RoleTab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    roleTab === t.id
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {(roleTab === 'pusat' || roleTab === 'semua') && (
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    A. Panitia Penyelenggara Pusat (Pusmendik &amp; BPPP)
                  </h3>
                  <ol className="list-decimal list-outside ml-4 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                    <li>Menyusun kebijakan, pedoman pelaksanaan, panduan aplikasi, jadwal, dan kebutuhan ABM nasional.</li>
                    <li>Menyiapkan substansi asesmen, sistem layanan, data operasional, pemantauan, bantuan teknis, dan penyajian hasil.</li>
                    <li>Koordinasi lintas sektor dengan Direktorat SMA, Direktorat SMK, Kanwil Kemenag Provinsi, dan Disdik Provinsi.</li>
                    <li>Memastikan kesiapan substansi, aplikasi, data, infrastruktur, dan layanan bantuan selama pelaksanaan.</li>
                    <li>Mengendalikan pelaksanaan serta menangani permasalahan situasional strategis di tingkat pusat.</li>
                    <li>Melaksanakan monitoring dan evaluasi penyelenggaraan ABM secara nasional.</li>
                  </ol>
                </div>
              )}

              {(roleTab === 'koordinasi' || roleTab === 'semua') && (
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    B. Unsur Penguatan Koordinasi Pusat (Dit. SMA, Dit. SMK &amp; Unit Kemenag)
                  </h3>
                  <ol className="list-decimal list-outside ml-4 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                    <li>Memperkuat koordinasi dan komunikasi dengan Disdik Provinsi, Kanwil Kemenag Provinsi, dan satuan pendidikan serta memfasilitasi sosialisasi kebijakan, jadwal, dan tata cara pelaksanaan.</li>
                    <li>Mendorong optimalisasi kesiapan dan partisipasi satuan pendidikan agar selaras dengan target sasaran layanan.</li>
                  </ol>
                </div>
              )}

              {(roleTab === 'disdik' || roleTab === 'semua') && (
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    C. Dinas Pendidikan Provinsi (Jenjang SMA &amp; SMK)
                  </h3>
                  <ol className="list-decimal list-outside ml-4 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                    <li>Melaksanakan sosialisasi kepada satuan pendidikan jenjang SMA/SMK dan berkoordinasi dengan Cabang Dinas/UPT terkait.</li>
                    <li>Menetapkan penanggung jawab, koordinator, dan personel pendukung tingkat provinsi.</li>
                    <li>Memantau progres kesiapan dan pelaksanaan asesmen melalui dasbor wilayah.</li>
                    <li>Menindaklanjuti permasalahan satuan pendidikan serta melakukan eskalasi ke tingkat pusat bila belum terselesaikan di provinsi.</li>
                  </ol>
                </div>
              )}

              {(roleTab === 'kanwil' || roleTab === 'semua') && (
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    D. Kantor Wilayah Kementerian Agama Provinsi (Jenjang MA)
                  </h3>
                  <ol className="list-decimal list-outside ml-4 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                    <li>Melaksanakan sosialisasi kepada satuan pendidikan jenjang MA serta berkoordinasi dengan Kemenag kabupaten/kota.</li>
                    <li>Menetapkan penanggung jawab, koordinator, dan personel pendukung di wilayah kewenangannya.</li>
                    <li>Memantau progres kesiapan dan pelaksanaan asesmen jenjang MA melalui dasbor wilayah.</li>
                    <li>Menindaklanjuti kendala jenjang MA dan melakukan eskalasi ke tingkat pusat bila diperlukan.</li>
                  </ol>
                </div>
              )}

              {(roleTab === 'satdik' || roleTab === 'semua') && (
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    E. Satuan Pendidikan (10 Tugas Utama)
                  </h3>
                  <ol className="list-decimal list-outside ml-4 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                    <li>Berkoordinasi dengan Disdik/Kanwil Kemenag Provinsi dan menyosialisasikan informasi ABM ke murid serta orang tua/wali.</li>
                    <li>Memeriksa dan memvalidasi daftar peserta pada dasbor ABM serta memantau pengumuman laman resmi ABM.</li>
                    <li>Menetapkan jadwal pelaksanaan bagi peserta sesuai rentang jadwal nasional.</li>
                    <li>Menugaskan Operator ABM dan Pengawas ABM sesuai proporsi dan kebutuhan pelaksanaan.</li>
                    <li>Menyiapkan ruang kelas atau fasilitas ruang lain yang kondusif.</li>
                    <li>Memastikan kesiapan perangkat peserta dan menyediakan akses internet/Wi-Fi apabila diperlukan dan memungkinkan.</li>
                    <li>Memantau progres serta status penyelesaian asesmen peserta secara langsung di dasbor ABM.</li>
                    <li>Melakukan penanganan awal kendala data, akun, perangkat, dan jaringan serta eskalasi ke Disdik/Kanwil bila perlu.</li>
                    <li>Mengunduh rekapitulasi hasil peserta ABM melalui dasbor sekolah dengan tetap menjaga kerahasiaan data.</li>
                    <li>Melaksanakan ABM berintegritas, mendokumentasikan kejadian khusus, dan meneruskan kendala teknis yang tidak terselesaikan di sekolah.</li>
                  </ol>
                </div>
              )}
            </div>
          </article>

          {/* BAB IV PERSIAPAN DAN PELAKSANAAN ABM */}
          <article
            id="bab-4"
            className="scroll-mt-24 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-7"
          >
            <div>
              <div className="text-xs font-mono text-teal-700 dark:text-teal-400">
                Bab IV · Halaman 9–13
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 mt-1">
                Persiapan dan Pelaksanaan ABM
              </h2>
            </div>

            {/* A. Tahapan dan Jadwal */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  A. Tahapan dan Waktu Pelaksanaan (10 Tahapan Nasional)
                </h3>
                <div className="flex flex-wrap gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                  {[
                    { id: 'all', label: 'Semua' },
                    { id: 'persiapan', label: 'Persiapan' },
                    { id: 'ujicoba', label: 'Uji Coba' },
                    { id: 'pelaksanaan', label: 'Utama' },
                    { id: 'susulan', label: 'Susulan' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setScheduleFilter(f.id as typeof scheduleFilter)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                        scheduleFilter === f.id
                          ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <tr>
                      <th className="py-3 px-4 w-12">No</th>
                      <th className="py-3 px-4">Kegiatan</th>
                      <th className="py-3 px-4 whitespace-nowrap">Tanggal</th>
                      <th className="py-3 px-4">Pelaksana / Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
                    {filteredSchedule.map((row) => (
                      <tr key={row.no} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30">
                        <td className="py-3 px-4 font-mono tabular-nums text-slate-500">
                          {row.no}
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">
                          {row.kegiatan}
                        </td>
                        <td className="py-3 px-4 font-mono tabular-nums text-teal-700 dark:text-teal-400 whitespace-nowrap">
                          {row.tanggal}
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                          {row.keterangan}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-700 dark:text-slate-300">
                <strong>Waktu Pelaksanaan Harian:</strong> Asesmen terdiri dari <strong>14 subtes</strong> dengan total durasi pengerjaan <strong>122 menit</strong>, dilaksanakan dalam rentang pukul <strong>08.00 s.d 16.00 waktu setempat</strong>. Sekolah harus memastikan peserta memulai dalam rentang waktu yang mencukupi untuk menuntaskan keseluruhan 122 menit.
              </div>
            </div>

            {/* B & C */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  B. Penetapan Hari Pelaksanaan
                </h3>
                <ol className="list-decimal list-outside ml-4 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                  <li>
                    Operator mengakses dasbor ABM:{' '}
                    <a
                      href="https://dashboard-abm.bppp.kemendikdasmen.go.id/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-700 dark:text-teal-400 underline break-all"
                    >
                      dashboard-abm.bppp.kemendikdasmen.go.id
                    </a>
                    .
                  </li>
                  <li>Memeriksa kesesuaian jumlah dan status data murid sekolah.</li>
                  <li>Menentukan/memilih hari pelaksanaan dalam rentang jadwal nasional lalu menyimpan pilihan.</li>
                  <li>Menginformasikan jadwal kepada peserta (tidak wajib ruang lab komputer; sistem membatasi kuota serentak sesuai kapasitas infrastruktur).</li>
                </ol>
              </div>

              <div className="space-y-2.5">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  C. Persiapan Peserta, Perangkat &amp; Jaringan
                </h3>
                <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                  <li>Aplikasi resmi ABM berbasis Android/iOS terpasang dan berjalan lancar.</li>
                  <li>Daya baterai perangkat mencukupi untuk seluruh rangkaian asesmen.</li>
                  <li>Koneksi internet stabil dan berfungsi dengan baik.</li>
                  <li>Sekolah menyiapkan ruang kelas yang kondusif.</li>
                  <li>Sekolah dapat menyediakan akses Wi-Fi cadangan bila diperlukan.</li>
                </ul>
              </div>
            </div>

            {/* D, E, F */}
            <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                D–F. Pelaksanaan, Gangguan Koneksi &amp; Penyelesaian
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Saat Pelaksanaan (Peran Pengawas &amp; Operator)
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Operator memantau status peserta di dasbor. Pengawas membacakan tata tertib, memverifikasi akun (login NISN &amp; NPSN), mencegah kerja sama atau pendokumentasian soal, serta memastikan peserta mengerjakan seluruh subtes berurutan sesuai alokasi waktu.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Jika Koneksi Putus / Perangkat Rusak Fisik
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Sistem <strong>menghentikan sementara penghitung waktu (timer) secara otomatis</strong> dan jawaban tersimpan aman. Segera lapor Pengawas/Operator; lanjutkan setelah koneksi stabil atau ganti perangkat cadangan sekolah jika perangkat rusak fisik. Setelah seluruh subtes selesai, tekan <strong>Selesai</strong> untuk melihat hasil, dan Operator mengunduh rekap dari dasbor.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* BAB V KENDALA & PEMANTAUAN */}
          <article
            id="bab-5"
            className="scroll-mt-24 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-5"
          >
            <div>
              <div className="text-xs font-mono text-teal-700 dark:text-teal-400">
                Bab V · Halaman 14
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 mt-1">
                Penanganan Kendala dan Pemantauan
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  A. Penanganan Kendala Berjenjang
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Penanganan dimulai dari satuan pendidikan dan diteruskan ke tingkat kewenangan lebih tinggi (Disdik/Kanwil Kemenag Provinsi hingga Pusat) bila belum terselesaikan. Peserta yang mengalami kendala sistem, status pengerjaan, atau gangguan layanan nasional dapat dijadwalkan ulang oleh sekolah ke tahapan <strong>ABM Susulan</strong>.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  B. 5 Indikator Pemantauan Dasbor
                </h3>
                <ol className="list-decimal list-outside ml-4 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                  <li>Peserta yang terdaftar di dalam sistem.</li>
                  <li>Peserta yang telah ditetapkan jadwal/hari pelaksanaannya.</li>
                  <li>Peserta yang sedang dalam proses mengerjakan asesmen.</li>
                  <li>Peserta yang telah menyelesaikan seluruh rangkaian asesmen.</li>
                  <li>Peserta yang berpotensi mengikuti tahapan ABM susulan.</li>
                </ol>
              </div>
            </div>
          </article>

          {/* BAB VI PENUTUP & DISCLAIMER */}
          <article
            id="bab-6"
            className="scroll-mt-24 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-4"
          >
            <div className="text-xs font-mono text-teal-700 dark:text-teal-400">
              Bab VI · Halaman 15
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50">
              Penutup
            </h2>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              Pedoman ini menjadi acuan operasional utama pelaksanaan ABM Tahun 2026 bagi pemangku kepentingan di tingkat pusat, daerah, hingga satuan pendidikan dengan mengedepankan mutu asesmen, kerahasiaan data, serta akuntabilitas. Penyesuaian teknis lapangan ditetapkan kemudian oleh Panitia Penyelenggara Pusat melalui ketentuan resmi lainnya.
            </p>
            <div className="rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/30 p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                <strong>DISCLAIMER:</strong> Hasil Asesmen Bakat Murid ini hanya bermakna bila peserta serius dalam menjawab pertanyaan.
              </p>
            </div>
          </article>

          {/* LAMPIRAN 1: TATA TERTIB PESERTA */}
          <article
            id="lampiran-1"
            className="scroll-mt-24 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-5"
          >
            <div>
              <div className="text-xs font-mono text-teal-700 dark:text-teal-400">
                Lampiran 1 · Halaman 16
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 mt-1">
                Tata Tertib Peserta
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/70 bg-emerald-50/40 dark:bg-emerald-950/20 p-5 space-y-3">
                <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                  Peserta Diwajibkan (6 Poin)
                </h3>
                <ol className="list-decimal list-outside ml-4 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <li>Mengikuti pelaksanaan ABM sesuai jadwal yang ditetapkan satuan pendidikan.</li>
                  <li>Membawa perangkat seluler yang memenuhi spesifikasi teknis dan persyaratan.</li>
                  <li>Memastikan kapasitas daya baterai perangkat cukup selama asesmen berlangsung.</li>
                  <li>Mematuhi arahan pengawas ABM serta pedoman pengerjaan pada aplikasi.</li>
                  <li>Menjaga ketenangan dan ketertiban selama proses pelaksanaan asesmen.</li>
                  <li>Melaporkan segala kendala teknis maupun operasional kepada Pengawas/Operator ABM.</li>
                </ol>
              </div>

              <div className="rounded-xl border border-rose-200 dark:border-rose-900/70 bg-rose-50/40 dark:bg-rose-950/20 p-5 space-y-3">
                <h3 className="text-sm font-bold text-rose-800 dark:text-rose-300">
                  Peserta Dilarang (7 Poin)
                </h3>
                <ol className="list-decimal list-outside ml-4 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <li>Menggunakan akun milik peserta lain atau memberikan akses akun pribadi ke pihak lain.</li>
                  <li>Meminta maupun memberikan bantuan jawaban kepada siapa pun.</li>
                  <li>Melakukan kerja sama dalam bentuk apa pun dengan peserta lain selama pengerjaan soal.</li>
                  <li>Menggunakan alat bantu selain kertas buram dan alat tulis yang tercantum pada petunjuk subtes.</li>
                  <li>Membuka aplikasi komunikasi, pencarian, peramban (browser), atau sumber informasi lainnya.</li>
                  <li>Merekam, memotret, tangkapan layar (screenshot), menyalin, dan/atau menyebarluaskan butir soal.</li>
                  <li>Melakukan tindakan yang dengan sengaja merusak atau mengganggu kinerja aplikasi maupun sistem ABM.</li>
                </ol>
              </div>
            </div>
          </article>

          {/* LAMPIRAN 2: PETUNJUK PENGERJAAN */}
          <article
            id="lampiran-2"
            className="scroll-mt-24 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-5"
          >
            <div>
              <div className="text-xs font-mono text-teal-700 dark:text-teal-400">
                Lampiran 2 · Halaman 17
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 mt-1">
                Petunjuk Pengerjaan (10 Langkah Teknis)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Masuk (login) ke aplikasi menggunakan NISN dan NPSN.',
                'Memeriksa dan memastikan data identitas diri yang tampil sudah sesuai.',
                'Memasukkan token yang diberikan oleh Operator ABM atau Pengawas ABM.',
                'Membaca dan memahami petunjuk pengerjaan pada setiap subtes sebelum memulai.',
                'Mengerjakan subtes secara berurutan sesuai alokasi waktu yang ditentukan sistem.',
                'Peserta tidak dapat kembali ke subtes sebelumnya apabila sistem telah beralih ke subtes berikutnya.',
                'Jika koneksi terputus, timer berhenti sementara otomatis; lanjutkan setelah koneksi normal atau login ulang.',
                'Meninjau kelengkapan dan status jawaban sebelum menekan tombol “Selesai” selama waktu masih tersedia.',
                'Setelah seluruh subtes selesai, hasil ABM langsung ditampilkan pada layar aplikasi.',
                'Peserta tidak diperkenankan mengulang asesmen dalam kondisi apapun setelah status dinyatakan selesai.',
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                >
                  <span className="font-mono font-bold text-teal-700 dark:text-teal-400 shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </article>

          {/* LAMPIRAN 3: PERSYARATAN PERANGKAT & INTERACTIVE CHECKER */}
          <article
            id="lampiran-3"
            className="scroll-mt-24 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6"
          >
            <div>
              <div className="text-xs font-mono text-teal-700 dark:text-teal-400">
                Lampiran 3 · Halaman 18
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 mt-1">
                Persyaratan Perangkat dan Koneksi
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <ol className="list-decimal list-outside ml-4 space-y-2.5">
                  <li>
                    <strong>Spesifikasi Minimum OS:</strong>
                    <ul className="list-disc ml-5 mt-1 space-y-1 text-slate-600 dark:text-slate-400">
                      <li><strong>Android:</strong> Minimal Android versi <strong>7.0</strong> atau lebih baru.</li>
                      <li><strong>iOS:</strong> Minimal iOS versi <strong>16.4</strong> atau lebih baru.</li>
                    </ul>
                  </li>
                  <li>Perangkat seluler (smartphone atau tablet) yang kompatibel menjalankan aplikasi resmi ABM.</li>
                  <li>Layar sentuh (touchscreen), pengeras suara (speaker), serta perangkat keras dasar beroperasi optimal.</li>
                  <li>Ruang penyimpanan (storage) dan kapasitas memori memadai untuk mengunduh, memasang, dan menjalankan aplikasi.</li>
                  <li>Kapasitas daya baterai terisi penuh atau mencukupi sepanjang rangkaian waktu asesmen (122 menit).</li>
                  <li>Terhubung dengan jaringan koneksi internet stabil dan memiliki kuota data memadai.</li>
                </ol>
              </div>

              {/* Interactive Device Readiness Checker */}
              <div className="lg:col-span-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-5 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Cek Kesiapan Perangkat Anda
                  </h3>
                  {detectedEnv.isMobile ? (
                    <Smartphone className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  ) : (
                    <Laptop className="w-4 h-4 text-slate-500" />
                  )}
                </div>

                <div className="space-y-1.5 text-xs bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Sistem Terdeteksi:</span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                      {detectedEnv.osLabel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Status Jaringan:</span>
                    <span className="inline-flex items-center gap-1 font-medium text-emerald-700 dark:text-emerald-400">
                      <Wifi className="w-3.5 h-3.5" />
                      {detectedEnv.isOnline ? 'Terhubung (Online)' : 'Offline'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Layar Sentuh:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {detectedEnv.isTouch ? 'Didukung' : 'Gunakan ponsel saat hari-H'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    { key: 'appInstalled', label: 'Aplikasi resmi ABM sudah terpasang' },
                    { key: 'batteryFull', label: 'Baterai terisi penuh (≥80%)' },
                    { key: 'internetReady', label: 'Koneksi Wi-Fi / kuota stabil siap' },
                    { key: 'storageOk', label: 'Memori & storage cukup lega' },
                    { key: 'touchSpeakerOk', label: 'Touchscreen & speaker berfungsi baik' },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={deviceCheck[item.key]}
                        onChange={(e) =>
                          setDeviceCheck((prev) => ({
                            ...prev,
                            [item.key]: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 accent-teal-700 rounded"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Checklist Kesiapan:</span>
                  <span className="font-mono tabular-nums font-bold text-teal-700 dark:text-teal-400 inline-flex items-center gap-1">
                    {readinessCompleted === 5 && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {readinessCompleted}/5 Siap
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* LAMPIRAN 4: INFORMASI 14 SUBTES */}
          <article
            id="lampiran-4"
            className="scroll-mt-24 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-teal-700 dark:text-teal-400">
                  Lampiran 4 · Halaman 19
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 mt-1">
                  Informasi 14 Subtes ABM Tahun 2026
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Klik tombol &ldquo;Latihan&rdquo; pada subtes manapun untuk langsung mencoba simulasi soal tanpa login.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onStartPractice()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0"
              >
                Simulasi Semua (14 Subtes)
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <tr>
                    <th className="py-3 px-4 whitespace-nowrap">Urutan</th>
                    <th className="py-3 px-4">Nama Subtes</th>
                    <th className="py-3 px-4">Rumpun</th>
                    <th className="py-3 px-4 text-right whitespace-nowrap">Jumlah Soal</th>
                    <th className="py-3 px-4 text-right whitespace-nowrap">Waktu (Menit)</th>
                    <th className="py-3 px-4 text-right whitespace-nowrap">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
                  {SUBTES_LIST.map((sub) => (
                    <tr
                      key={sub.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono text-slate-500 whitespace-nowrap">
                        {sub.code}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">
                        <div>{sub.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5 hidden sm:block">
                          {sub.description}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {sub.cluster}
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums font-medium text-slate-800 dark:text-slate-200">
                        {sub.officialQuestions}
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums font-medium text-slate-800 dark:text-slate-200">
                        {sub.officialMinutes}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onStartPractice(sub.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Latihan
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 dark:bg-slate-800/70 font-bold text-slate-900 dark:text-slate-100">
                    <td className="py-3 px-4" colSpan={3}>
                      Total Keseluruhan (14 Subtes)
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">160</td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">122</td>
                    <td className="py-3 px-4" />
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
