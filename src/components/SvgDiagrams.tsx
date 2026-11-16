import React from 'react';

interface SvgDiagramProps {
  id: string;
  className?: string;
}

const Shape: React.FC<{
  type: 'triangle' | 'square' | 'pentagon' | 'hexagon' | 'circle' | 'diamond';
  cx?: number;
  cy?: number;
  r?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  dashed?: boolean;
}> = ({ type, cx = 50, cy = 50, r = 28, fill = 'none', stroke = 'currentColor', strokeWidth = 2.5, dashed = false }) => {
  const dash = dashed ? '4 3' : undefined;
  if (type === 'circle') {
    return <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeDasharray={dash} />;
  }
  if (type === 'square') {
    return (
      <rect
        x={cx - r}
        y={cy - r}
        width={r * 2}
        height={r * 2}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={dash}
      />
    );
  }
  if (type === 'diamond') {
    const pts = `${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`;
    return <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeDasharray={dash} />;
  }
  const sides = type === 'triangle' ? 3 : type === 'pentagon' ? 5 : 6;
  const points = Array.from({ length: sides }, (_, i) => {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(' ');
  return <polygon points={points} fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeDasharray={dash} strokeLinejoin="round" />;
};

export const SvgDiagram: React.FC<SvgDiagramProps> = ({ id, className = '' }) => {
  // ---------------- SUBTES 5: KUANTITATIF GRAFIK & TABEL ----------------
  if (id === 'chart-produksi') {
    const years = [
      { label: '2023', padi: 40, jagung: 30 },
      { label: '2024', padi: 50, jagung: 45 },
      { label: '2025', padi: 60, jagung: 40 },
    ];
    return (
      <svg viewBox="0 0 420 220" className={`w-full max-w-md h-auto text-slate-800 dark:text-slate-100 ${className}`} role="img" aria-label="Grafik hasil panen padi dan jagung 2023 sampai 2025">
        <text x="210" y="18" textAnchor="middle" className="fill-current text-[12px] font-semibold">
          Hasil Panen Desa Makmur (Ton)
        </text>
        {/* Grid lines */}
        {[0, 20, 40, 60].map((val) => {
          const y = 175 - (val / 70) * 130;
          return (
            <g key={val}>
              <line x1="52" y1={y} x2="390" y2={y} stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 3" />
              <text x="44" y={y + 4} textAnchor="end" className="fill-slate-500 dark:fill-slate-400 text-[10px] font-mono">
                {val}
              </text>
            </g>
          );
        })}
        <line x1="52" y1="35" x2="52" y2="175" stroke="currentColor" strokeOpacity="0.35" />
        <line x1="52" y1="175" x2="390" y2="175" stroke="currentColor" strokeOpacity="0.35" />

        {years.map((item, idx) => {
          const groupX = 95 + idx * 105;
          const padiH = (item.padi / 70) * 130;
          const jagungH = (item.jagung / 70) * 130;
          return (
            <g key={item.label}>
              <rect x={groupX} y={175 - padiH} width="26" height={padiH} rx="3" className="fill-teal-600 dark:fill-teal-400" />
              <text x={groupX + 13} y={170 - padiH} textAnchor="middle" className="fill-current text-[10px] font-mono font-semibold">
                {item.padi}
              </text>
              <rect x={groupX + 32} y={175 - jagungH} width="26" height={jagungH} rx="3" className="fill-amber-500 dark:fill-amber-400" />
              <text x={groupX + 45} y={170 - jagungH} textAnchor="middle" className="fill-current text-[10px] font-mono font-semibold">
                {item.jagung}
              </text>
              <text x={groupX + 29} y="193" textAnchor="middle" className="fill-current text-[11px] font-medium">
                {item.label}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(135, 205)">
          <rect x="0" y="0" width="10" height="10" rx="2" className="fill-teal-600 dark:fill-teal-400" />
          <text x="15" y="9" className="fill-current text-[10px]">Padi</text>
          <rect x="65" y="0" width="10" height="10" rx="2" className="fill-amber-500 dark:fill-amber-400" />
          <text x="80" y="9" className="fill-current text-[10px]">Jagung</text>
        </g>
      </svg>
    );
  }

  if (id === 'chart-pengunjung') {
    const days = [
      { day: 'Sen', val: 120 },
      { day: 'Sel', val: 150 },
      { day: 'Rab', val: 110 },
      { day: 'Kam', val: 180 },
      { day: 'Jum', val: 140 },
    ];
    const pts = days
      .map((d, i) => {
        const x = 75 + i * 75;
        const y = 175 - ((d.val - 80) / 120) * 125;
        return `${x},${y}`;
      })
      .join(' ');
    return (
      <svg viewBox="0 0 420 215" className={`w-full max-w-md h-auto text-slate-800 dark:text-slate-100 ${className}`} role="img" aria-label="Grafik garis pengunjung perpustakaan Senin hingga Jumat">
        <text x="210" y="18" textAnchor="middle" className="fill-current text-[12px] font-semibold">
          Jumlah Pengunjung Perpustakaan (Orang)
        </text>
        {[80, 110, 140, 170, 200].map((val) => {
          const y = 175 - ((val - 80) / 120) * 125;
          return (
            <g key={val}>
              <line x1="52" y1={y} x2="395" y2={y} stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 3" />
              <text x="45" y={y + 4} textAnchor="end" className="fill-slate-500 dark:fill-slate-400 text-[10px] font-mono">
                {val}
              </text>
            </g>
          );
        })}
        <line x1="52" y1="40" x2="52" y2="175" stroke="currentColor" strokeOpacity="0.35" />
        <line x1="52" y1="175" x2="395" y2="175" stroke="currentColor" strokeOpacity="0.35" />
        <polyline fill="none" stroke="currentColor" strokeWidth="2.5" className="text-teal-600 dark:text-teal-400" points={pts} />
        {days.map((d, i) => {
          const x = 75 + i * 75;
          const y = 175 - ((d.val - 80) / 120) * 125;
          return (
            <g key={d.day}>
              <circle cx={x} cy={y} r="4.5" className="fill-teal-600 dark:fill-teal-400 stroke-white dark:stroke-slate-900" strokeWidth="2" />
              <text x={x} y={y - 10} textAnchor="middle" className="fill-current text-[10px] font-mono font-semibold">
                {d.val}
              </text>
              <text x={x} y="194" textAnchor="middle" className="fill-current text-[11px]">
                {d.day}
              </text>
            </g>
          );
        })}
      </svg>
    );
  }

  // ---------------- SUBTES 7: KLASIFIKASI FIGURAL ----------------
  // Q1: Jumlah titik di dalam = jumlah sisi poligon (A: segitiga+3, B: segiempat+4, C: segiempat+3 [BEDA], D: segilima+5, E: segienam+6)
  if (id.startsWith('fig-cls-q1-')) {
    const key = id.slice(-1);
    const configs: Record<string, { shape: 'triangle' | 'square' | 'pentagon' | 'hexagon'; dots: number }> = {
      a: { shape: 'triangle', dots: 3 },
      b: { shape: 'square', dots: 4 },
      c: { shape: 'square', dots: 3 },
      d: { shape: 'pentagon', dots: 5 },
      e: { shape: 'hexagon', dots: 6 },
    };
    const cfg = configs[key];
    const dotPos: [number, number][] = [
      [42, 44],
      [58, 44],
      [50, 56],
      [42, 58],
      [58, 58],
      [50, 38],
    ];
    return (
      <svg viewBox="0 0 100 100" className={`w-20 h-20 text-slate-800 dark:text-slate-100 ${className}`}>
        <Shape type={cfg.shape} cx={50} cy={50} r={34} />
        {dotPos.slice(0, cfg.dots).map(([dx, dy], idx) => (
          <circle key={idx} cx={dx} cy={dy} r="3.2" fill="currentColor" />
        ))}
      </svg>
    );
  }

  // Q2: Panah berputar searah jarum jam mengelilingi persegi (D berlawanan arah)
  if (id.startsWith('fig-cls-q2-')) {
    const key = id.slice(-1);
    const rotMap: Record<string, { deg: number; ccw?: boolean }> = {
      a: { deg: 0 },
      b: { deg: 90 },
      c: { deg: 180 },
      d: { deg: 90, ccw: true },
      e: { deg: 270 },
    };
    const cfg = rotMap[key];
    return (
      <svg viewBox="0 0 100 100" className={`w-20 h-20 text-slate-800 dark:text-slate-100 ${className}`}>
        <rect x="26" y="26" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <g transform={`rotate(${cfg.deg} 50 50)`}>
          {cfg.ccw ? (
            <>
              <path d="M 70 15 L 30 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M 38 9 L 28 15 L 38 21" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </>
          ) : (
            <>
              <path d="M 30 15 L 70 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M 62 9 L 72 15 L 62 21" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </>
          )}
        </g>
      </svg>
    );
  }

  // Q3: 4 gambar memiliki arsiran tepat 1/4 bagian; B memiliki 1/2 bagian
  if (id.startsWith('fig-cls-q3-')) {
    const key = id.slice(-1);
    return (
      <svg viewBox="0 0 100 100" className={`w-20 h-20 text-slate-800 dark:text-slate-100 ${className}`}>
        {key === 'a' && (
          <>
            <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <path d="M50,50 L50,16 A34,34 0 0,1 84,50 Z" fill="currentColor" fillOpacity="0.75" />
            <line x1="50" y1="16" x2="50" y2="84" stroke="currentColor" strokeWidth="2" />
            <line x1="16" y1="50" x2="84" y2="50" stroke="currentColor" strokeWidth="2" />
          </>
        )}
        {key === 'b' && (
          <>
            <rect x="18" y="18" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <rect x="18" y="18" width="32" height="64" fill="currentColor" fillOpacity="0.75" />
            <line x1="50" y1="18" x2="50" y2="82" stroke="currentColor" strokeWidth="2" />
            <line x1="18" y1="50" x2="82" y2="50" stroke="currentColor" strokeWidth="2" />
          </>
        )}
        {key === 'c' && (
          <>
            <rect x="18" y="18" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <rect x="50" y="50" width="32" height="32" fill="currentColor" fillOpacity="0.75" />
            <line x1="50" y1="18" x2="50" y2="82" stroke="currentColor" strokeWidth="2" />
            <line x1="18" y1="50" x2="82" y2="50" stroke="currentColor" strokeWidth="2" />
          </>
        )}
        {key === 'd' && (
          <>
            <polygon points="50,14 86,50 50,86 14,50" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <polygon points="50,50 50,14 86,50" fill="currentColor" fillOpacity="0.75" />
            <line x1="50" y1="14" x2="50" y2="86" stroke="currentColor" strokeWidth="2" />
            <line x1="14" y1="50" x2="86" y2="50" stroke="currentColor" strokeWidth="2" />
          </>
        )}
        {key === 'e' && (
          <>
            <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <path d="M50,50 L16,50 A34,34 0 0,1 50,16 Z" fill="currentColor" fillOpacity="0.75" />
            <line x1="50" y1="16" x2="50" y2="84" stroke="currentColor" strokeWidth="2" />
            <line x1="16" y1="50" x2="84" y2="50" stroke="currentColor" strokeWidth="2" />
          </>
        )}
      </svg>
    );
  }

  // Q4: 4 gambar adalah rotasi huruf L asimetris + titik; E adalah pencerminan
  if (id.startsWith('fig-cls-q4-')) {
    const key = id.slice(-1);
    const rot: Record<string, number> = { a: 0, b: 90, c: 180, d: 270, e: 0 };
    const isMirror = key === 'e';
    return (
      <svg viewBox="0 0 100 100" className={`w-20 h-20 text-slate-800 dark:text-slate-100 ${className}`}>
        <g transform={isMirror ? 'translate(100,0) scale(-1,1)' : `rotate(${rot[key]} 50 50)`}>
          <path d="M 32 20 L 32 75 L 70 75" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="55" cy="45" r="7" fill="currentColor" />
        </g>
      </svg>
    );
  }

  // ---------------- SUBTES 8: ANALOGI FIGURAL ----------------
  // Q1: Luar-Dalam bertukar + bentuk dalam diarsir (Segitiga luar + Persegi dalam -> Persegi luar + Segitiga arsir) :: (Lingkaran + Belah ketupat -> Belah ketupat + Lingkaran arsir = B)
  if (id === 'fig-ana-q1-prompt') {
    return (
      <svg viewBox="0 0 380 96" className={`w-full max-w-md h-auto text-slate-800 dark:text-slate-100 ${className}`}>
        {/* A */}
        <Shape type="triangle" cx={48} cy={48} r={34} />
        <Shape type="square" cx={48} cy={54} r={10} />
        <text x="95" y="54" textAnchor="middle" className="fill-current text-lg font-bold">:</text>
        {/* B */}
        <Shape type="square" cx={142} cy={48} r={30} />
        <Shape type="triangle" cx={142} cy={50} r={13} fill="currentColor" />
        <text x="190" y="54" textAnchor="middle" className="fill-current text-lg font-bold">::</text>
        {/* C */}
        <Shape type="circle" cx={238} cy={48} r={32} />
        <Shape type="diamond" cx={238} cy={48} r={13} />
        <text x="285" y="54" textAnchor="middle" className="fill-current text-lg font-bold">:</text>
        {/* ? */}
        <rect x="304" y="16" width="60" height="64" rx="8" fill="none" stroke="currentColor" strokeDasharray="4 4" strokeOpacity="0.5" />
        <text x="334" y="55" textAnchor="middle" className="fill-current text-xl font-bold">?</text>
      </svg>
    );
  }
  if (id.startsWith('fig-ana-q1-opt-')) {
    const key = id.slice(-1);
    return (
      <svg viewBox="0 0 100 100" className={`w-20 h-20 text-slate-800 dark:text-slate-100 ${className}`}>
        {key === 'a' && (
          <>
            <Shape type="circle" cx={50} cy={50} r={32} />
            <Shape type="diamond" cx={50} cy={50} r={14} fill="currentColor" />
          </>
        )}
        {key === 'b' && (
          <>
            <Shape type="diamond" cx={50} cy={50} r={34} />
            <Shape type="circle" cx={50} cy={50} r={12} fill="currentColor" />
          </>
        )}
        {key === 'c' && (
          <>
            <Shape type="diamond" cx={50} cy={50} r={34} />
            <Shape type="circle" cx={50} cy={50} r={12} />
          </>
        )}
        {key === 'd' && (
          <>
            <Shape type="square" cx={50} cy={50} r={28} />
            <Shape type="circle" cx={50} cy={50} r={12} fill="currentColor" />
          </>
        )}
        {key === 'e' && (
          <>
            <Shape type="diamond" cx={50} cy={50} r={34} fill="currentColor" />
            <Shape type="circle" cx={50} cy={50} r={12} fill="white" stroke="none" />
          </>
        )}
      </svg>
    );
  }

  // Q2: Tambah 1 sisi poligon dan titik tengah hilang (Segitiga+titik -> Persegi kosong :: Segilima+titik -> Segienam kosong = D)
  if (id === 'fig-ana-q2-prompt') {
    return (
      <svg viewBox="0 0 380 96" className={`w-full max-w-md h-auto text-slate-800 dark:text-slate-100 ${className}`}>
        <Shape type="triangle" cx={48} cy={50} r={30} />
        <circle cx={48} cy={54} r="5" fill="currentColor" />
        <text x="95" y="54" textAnchor="middle" className="fill-current text-lg font-bold">:</text>
        <Shape type="square" cx={142} cy={48} r={26} />
        <text x="190" y="54" textAnchor="middle" className="fill-current text-lg font-bold">::</text>
        <Shape type="pentagon" cx={238} cy={48} r={30} />
        <circle cx={238} cy={48} r="5" fill="currentColor" />
        <text x="285" y="54" textAnchor="middle" className="fill-current text-lg font-bold">:</text>
        <rect x="304" y="16" width="60" height="64" rx="8" fill="none" stroke="currentColor" strokeDasharray="4 4" strokeOpacity="0.5" />
        <text x="334" y="55" textAnchor="middle" className="fill-current text-xl font-bold">?</text>
      </svg>
    );
  }
  if (id.startsWith('fig-ana-q2-opt-')) {
    const key = id.slice(-1);
    return (
      <svg viewBox="0 0 100 100" className={`w-20 h-20 text-slate-800 dark:text-slate-100 ${className}`}>
        {key === 'a' && (
          <>
            <Shape type="hexagon" cx={50} cy={50} r={32} />
            <circle cx={50} cy={50} r="6" fill="currentColor" />
          </>
        )}
        {key === 'b' && <Shape type="pentagon" cx={50} cy={50} r={32} />}
        {key === 'c' && <Shape type="square" cx={50} cy={50} r={28} />}
        {key === 'd' && <Shape type="hexagon" cx={50} cy={50} r={32} />}
        {key === 'e' && <Shape type="hexagon" cx={50} cy={50} r={32} fill="currentColor" />}
      </svg>
    );
  }

  // Q3: Rotasi 90 derajat searah jarum jam + arsiran berpindah ke sisi seberang -> Opsi C
  if (id === 'fig-ana-q3-prompt') {
    return (
      <svg viewBox="0 0 380 96" className={`w-full max-w-md h-auto text-slate-800 dark:text-slate-100 ${className}`}>
        {/* A: Vertical bar with top arrow */}
        <g transform="translate(48,48)">
          <line x1="0" y1="26" x2="0" y2="-22" stroke="currentColor" strokeWidth="3.5" />
          <polygon points="0,-30 -8,-16 8,-16" fill="currentColor" />
          <circle cx="-14" cy="10" r="6" fill="currentColor" />
        </g>
        <text x="95" y="54" textAnchor="middle" className="fill-current text-lg font-bold">:</text>
        {/* B: Rotated 90 deg CW + circle flipped side */}
        <g transform="translate(142,48) rotate(90)">
          <line x1="0" y1="26" x2="0" y2="-22" stroke="currentColor" strokeWidth="3.5" />
          <polygon points="0,-30 -8,-16 8,-16" fill="currentColor" />
          <circle cx="14" cy="10" r="6" fill="currentColor" />
        </g>
        <text x="190" y="54" textAnchor="middle" className="fill-current text-lg font-bold">::</text>
        {/* C: Diagonal / pointing top-right with square on left */}
        <g transform="translate(238,48) rotate(45)">
          <line x1="0" y1="26" x2="0" y2="-22" stroke="currentColor" strokeWidth="3.5" />
          <polygon points="0,-30 -8,-16 8,-16" fill="currentColor" />
          <rect x="-20" y="4" width="11" height="11" fill="currentColor" />
        </g>
        <text x="285" y="54" textAnchor="middle" className="fill-current text-lg font-bold">:</text>
        <rect x="304" y="16" width="60" height="64" rx="8" fill="none" stroke="currentColor" strokeDasharray="4 4" strokeOpacity="0.5" />
        <text x="334" y="55" textAnchor="middle" className="fill-current text-xl font-bold">?</text>
      </svg>
    );
  }
  if (id.startsWith('fig-ana-q3-opt-')) {
    const key = id.slice(-1);
    const map: Record<string, { rot: number; side: number; hollow?: boolean }> = {
      a: { rot: 135, side: -20 },
      b: { rot: -45, side: 9 },
      c: { rot: 135, side: 9 },
      d: { rot: 135, side: 9, hollow: true },
      e: { rot: 45, side: 9 },
    };
    const cfg = map[key];
    return (
      <svg viewBox="0 0 100 100" className={`w-20 h-20 text-slate-800 dark:text-slate-100 ${className}`}>
        <g transform={`translate(50,50) rotate(${cfg.rot})`}>
          <line x1="0" y1="28" x2="0" y2="-24" stroke="currentColor" strokeWidth="3.5" />
          <polygon points="0,-32 -8,-18 8,-18" fill="currentColor" />
          <rect x={cfg.side} y="4" width="11" height="11" fill={cfg.hollow ? 'none' : 'currentColor'} stroke="currentColor" strokeWidth="2" />
        </g>
      </svg>
    );
  }

  // Q4: Garis tepi putus-putus & belahan kiri diarsir -> belahan kanan diarsir garis penuh (Opsi A)
  if (id === 'fig-ana-q4-prompt') {
    return (
      <svg viewBox="0 0 380 96" className={`w-full max-w-md h-auto text-slate-800 dark:text-slate-100 ${className}`}>
        <g transform="translate(48,48)">
          <circle cx="0" cy="0" r="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 3" />
          <path d="M0,-28 A28,28 0 0,0 0,28 Z" fill="currentColor" fillOpacity="0.8" />
        </g>
        <text x="95" y="54" textAnchor="middle" className="fill-current text-lg font-bold">:</text>
        <g transform="translate(142,48)">
          <circle cx="0" cy="0" r="28" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M0,-28 A28,28 0 0,1 0,28 Z" fill="currentColor" fillOpacity="0.8" />
        </g>
        <text x="190" y="54" textAnchor="middle" className="fill-current text-lg font-bold">::</text>
        <g transform="translate(238,48)">
          <polygon points="0,-30 30,0 0,30 -30,0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 3" />
          <polygon points="0,-30 -30,0 0,30" fill="currentColor" fillOpacity="0.8" />
        </g>
        <text x="285" y="54" textAnchor="middle" className="fill-current text-lg font-bold">:</text>
        <rect x="304" y="16" width="60" height="64" rx="8" fill="none" stroke="currentColor" strokeDasharray="4 4" strokeOpacity="0.5" />
        <text x="334" y="55" textAnchor="middle" className="fill-current text-xl font-bold">?</text>
      </svg>
    );
  }
  if (id.startsWith('fig-ana-q4-opt-')) {
    const key = id.slice(-1);
    return (
      <svg viewBox="0 0 100 100" className={`w-20 h-20 text-slate-800 dark:text-slate-100 ${className}`}>
        {key === 'a' && (
          <>
            <polygon points="50,18 82,50 50,82 18,50" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <polygon points="50,18 82,50 50,82" fill="currentColor" fillOpacity="0.8" />
          </>
        )}
        {key === 'b' && (
          <>
            <polygon points="50,18 82,50 50,82 18,50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 3" />
            <polygon points="50,18 82,50 50,82" fill="currentColor" fillOpacity="0.8" />
          </>
        )}
        {key === 'c' && (
          <>
            <polygon points="50,18 82,50 50,82 18,50" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <polygon points="50,18 18,50 50,82" fill="currentColor" fillOpacity="0.8" />
          </>
        )}
        {key === 'd' && (
          <>
            <rect x="22" y="22" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <rect x="50" y="22" width="28" height="56" fill="currentColor" fillOpacity="0.8" />
          </>
        )}
        {key === 'e' && <polygon points="50,18 82,50 50,82 18,50" fill="currentColor" fillOpacity="0.8" />}
      </svg>
    );
  }

  // ---------------- SUBTES 9: SPASIAL ROTASI 3D ----------------
  // Q1: Kubus isometrik dengan simbol Top=Plus, Left=Lingkaran, Right=Segitiga. Diputar 90° searah jarum jam dilihat dari atas -> Segitiga pindah ke Left!
  if (id === 'rot3d-q1-prompt') {
    return (
      <svg viewBox="0 0 180 140" className={`w-44 h-36 text-slate-800 dark:text-slate-100 ${className}`}>
        {/* Isometric cube */}
        <polygon points="90,22 142,50 90,78 38,50" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="2.2" />
        <polygon points="38,50 90,78 90,128 38,100" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.2" />
        <polygon points="90,78 142,50 142,100 90,128" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2.2" />
        {/* Top Plus */}
        <path d="M 90 42 L 90 58 M 78 50 L 102 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        {/* Left Circle */}
        <ellipse cx="64" cy="89" rx="10" ry="12" fill="currentColor" />
        {/* Right Triangle */}
        <polygon points="116,74 128,97 104,97" fill="currentColor" />
        {/* Rotation Arrow */}
        <path d="M 65 14 Q 90 4 115 14" fill="none" stroke="currentColor" strokeWidth="2" className="text-teal-600 dark:text-teal-400" />
        <polygon points="118,16 111,9 110,18" className="fill-teal-600 dark:fill-teal-400" />
      </svg>
    );
  }
  if (id.startsWith('rot3d-q1-opt-')) {
    const key = id.slice(-1);
    const drawCube = (top: string, left: string, right: string) => (
      <svg viewBox="0 0 110 110" className={`w-22 h-22 text-slate-800 dark:text-slate-100 ${className}`}>
        <polygon points="55,14 95,35 55,56 15,35" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="2" />
        <polygon points="15,35 55,56 55,96 15,75" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2" />
        <polygon points="55,56 95,35 95,75 55,96" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
        {top === 'plus' && <path d="M 55 29 L 55 41 M 46 35 L 64 35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />}
        {top === 'circle' && <ellipse cx="55" cy="35" rx="9" ry="6" fill="currentColor" />}
        {left === 'tri' && <polygon points="35,55 44,72 26,72" fill="currentColor" />}
        {left === 'circle' && <circle cx="35" cy="66" r="8" fill="currentColor" />}
        {left === 'square' && <rect x="28" y="59" width="14" height="14" fill="currentColor" />}
        {right === 'square' && <rect x="68" y="59" width="14" height="14" fill="currentColor" />}
        {right === 'circle' && <circle cx="75" cy="66" r="8" fill="currentColor" />}
        {right === 'tri' && <polygon points="75,55 84,72 66,72" fill="currentColor" />}
        {right === 'plus' && <path d="M 75 57 L 75 73 M 67 65 L 83 65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />}
      </svg>
    );
    if (key === 'a') return drawCube('circle', 'tri', 'plus');
    if (key === 'b') return drawCube('plus', 'square', 'circle');
    if (key === 'c') return drawCube('plus', 'tri', 'square'); // Correct!
    if (key === 'd') return drawCube('plus', 'circle', 'tri');
    return drawCube('circle', 'square', 'tri');
  }

  // Q2: Jaring-jaring kubus (Plus (+) seberang Lingkaran, Persegi seberang Segitiga, Garis seberang Bintang) -> Kubus yang valid?
  if (id === 'rot3d-q2-prompt') {
    return (
      <svg viewBox="0 0 220 150" className={`w-56 h-36 text-slate-800 dark:text-slate-100 ${className}`}>
        {/* Cross net: 4 vertical, 2 horizontal */}
        {[
          { x: 85, y: 12, label: '●' },
          { x: 85, y: 47, label: '■' },
          { x: 85, y: 82, label: '✚' },
          { x: 85, y: 117, label: '▲' },
          { x: 50, y: 47, label: '◆' },
          { x: 120, y: 47, label: '★' },
        ].map((c, idx) => (
          <g key={idx}>
            <rect x={c.x} y={c.y} width="35" height="35" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="2" />
            <text x={c.x + 17.5} y={c.y + 23} textAnchor="middle" className="fill-current text-[16px]">
              {c.label}
            </text>
          </g>
        ))}
      </svg>
    );
  }
  if (id.startsWith('rot3d-q2-opt-')) {
    const key = id.slice(-1);
    // Opposites: (●, ✚), (■, ▲), (◆, ★).
    // Valid adjacent triplet: (●, ■, ◆) -> Option B!
    const faces: Record<string, [string, string, string]> = {
      a: ['●', '✚', '■'], // invalid: ● & ✚ opposite
      b: ['●', '■', '◆'], // valid!
      c: ['■', '▲', '★'], // invalid: ■ & ▲ opposite
      d: ['◆', '★', '●'], // invalid: ◆ & ★ opposite
      e: ['✚', '■', '▲'], // invalid: ■ & ▲ opposite
    };
    const [t, l, r] = faces[key];
    return (
      <svg viewBox="0 0 110 110" className={`w-22 h-22 text-slate-800 dark:text-slate-100 ${className}`}>
        <polygon points="55,14 95,35 55,56 15,35" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="2" />
        <polygon points="15,35 55,56 55,96 15,75" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2" />
        <polygon points="55,56 95,35 95,75 55,96" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
        <text x="55" y="40" textAnchor="middle" className="fill-current text-[14px]">{t}</text>
        <text x="35" y="70" textAnchor="middle" className="fill-current text-[14px]">{l}</text>
        <text x="75" y="70" textAnchor="middle" className="fill-current text-[14px]">{r}</text>
      </svg>
    );
  }

  // Q3: Menghitung kubus satuan pada susunan piramida bertingkat (lapisan bawah 3x3 = 9, tengah 2x2 = 4, atas 1 = 1 -> Total = 14)
  if (id === 'rot3d-q3-prompt') {
    const isoCube = (gx: number, gy: number, gz: number, key: string) => {
      const s = 20;
      const ox = 110 + (gx - gy) * s * 0.866;
      const oy = 110 + (gx + gy) * s * 0.5 - gz * s;
      return (
        <g key={key}>
          <polygon points={`${ox},${oy - s} ${ox + s * 0.866},${oy - s * 0.5} ${ox},${oy} ${ox - s * 0.866},${oy - s * 0.5}`} className="fill-slate-100 dark:fill-slate-700" stroke="currentColor" strokeWidth="1.5" />
          <polygon points={`${ox - s * 0.866},${oy - s * 0.5} ${ox},${oy} ${ox},${oy + s} ${ox - s * 0.866},${oy + s * 0.5}`} className="fill-slate-200 dark:fill-slate-800" stroke="currentColor" strokeWidth="1.5" />
          <polygon points={`${ox},${oy} ${ox + s * 0.866},${oy - s * 0.5} ${ox + s * 0.866},${oy + s * 0.5} ${ox},${oy + s}`} className="fill-slate-300 dark:fill-slate-600" stroke="currentColor" strokeWidth="1.5" />
        </g>
      );
    };
    const cubes: React.ReactNode[] = [];
    for (let x = 0; x < 3; x++) for (let y = 0; y < 3; y++) cubes.push(isoCube(x, y, 0, `0-${x}-${y}`));
    for (let x = 0; x < 2; x++) for (let y = 0; y < 2; y++) cubes.push(isoCube(x, y, 1, `1-${x}-${y}`));
    cubes.push(isoCube(0, 0, 2, '2-0-0'));
    return (
      <svg viewBox="0 0 220 175" className={`w-56 h-44 text-slate-800 dark:text-slate-100 ${className}`}>
        {cubes}
      </svg>
    );
  }

  // Q4: Balok L-3D dengan 4 kubus satuan (3 tegak di kiri + 1 ke kanan di dasar) diputar 180° vertikal? Tidak, 90° ke kanan sehingga berdiri di kanan -> Option D
  if (id === 'rot3d-q4-prompt') {
    const drawL = (cubesPos: [number, number, number][], w = 130, h = 110) => {
      const s = 17;
      return (
        <svg viewBox={`0 0 ${w} ${h}`} className={`w-32 h-28 text-slate-800 dark:text-slate-100 ${className}`}>
          {cubesPos.map(([gx, gy, gz], idx) => {
            const ox = w / 2 + (gx - gy) * s * 0.866;
            const oy = h * 0.68 + (gx + gy) * s * 0.5 - gz * s;
            return (
              <g key={idx}>
                <polygon points={`${ox},${oy - s} ${ox + s * 0.866},${oy - s * 0.5} ${ox},${oy} ${ox - s * 0.866},${oy - s * 0.5}`} className="fill-teal-100 dark:fill-teal-900/60" stroke="currentColor" strokeWidth="1.5" />
                <polygon points={`${ox - s * 0.866},${oy - s * 0.5} ${ox},${oy} ${ox},${oy + s} ${ox - s * 0.866},${oy + s * 0.5}`} className="fill-teal-200 dark:fill-teal-800/70" stroke="currentColor" strokeWidth="1.5" />
                <polygon points={`${ox},${oy} ${ox + s * 0.866},${oy - s * 0.5} ${ox + s * 0.866},${oy + s * 0.5} ${ox},${oy + s}`} className="fill-teal-300 dark:fill-teal-700/80" stroke="currentColor" strokeWidth="1.5" />
              </g>
            );
          })}
        </svg>
      );
    };
    return drawL([[0, 0, 0], [1, 0, 0], [0, 0, 1], [0, 0, 2]]);
  }
  if (id.startsWith('rot3d-q4-opt-')) {
    const key = id.slice(-1);
    const drawOpt = (cubesPos: [number, number, number][]) => {
      const s = 14;
      return (
        <svg viewBox="0 0 100 90" className={`w-20 h-20 text-slate-800 dark:text-slate-100 ${className}`}>
          {cubesPos.map(([gx, gy, gz], idx) => {
            const ox = 50 + (gx - gy) * s * 0.866;
            const oy = 60 + (gx + gy) * s * 0.5 - gz * s;
            return (
              <g key={idx}>
                <polygon points={`${ox},${oy - s} ${ox + s * 0.866},${oy - s * 0.5} ${ox},${oy} ${ox - s * 0.866},${oy - s * 0.5}`} className="fill-teal-100 dark:fill-teal-900/60" stroke="currentColor" strokeWidth="1.4" />
                <polygon points={`${ox - s * 0.866},${oy - s * 0.5} ${ox},${oy} ${ox},${oy + s} ${ox - s * 0.866},${oy + s * 0.5}`} className="fill-teal-200 dark:fill-teal-800/70" stroke="currentColor" strokeWidth="1.4" />
                <polygon points={`${ox},${oy} ${ox + s * 0.866},${oy - s * 0.5} ${ox + s * 0.866},${oy + s * 0.5} ${ox},${oy + s}`} className="fill-teal-300 dark:fill-teal-700/80" stroke="currentColor" strokeWidth="1.4" />
              </g>
            );
          })}
        </svg>
      );
    };
    // Original: 3 vertical at (0,0,0..2) + 1 at (1,0,0). Rotate 90 deg CW around vertical axis -> (x,y) -> (y,-x): 3 vertical at (0,0,0..2) + 1 at (0,1,0) -> Option D!
    if (key === 'a') return drawOpt([[0, 0, 0], [1, 0, 0], [2, 0, 0], [0, 0, 1]]);
    if (key === 'b') return drawOpt([[0, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1]]);
    if (key === 'c') return drawOpt([[0, 0, 0], [1, 0, 0], [1, 0, 1], [1, 0, 2]]);
    if (key === 'd') return drawOpt([[0, 0, 0], [0, 1, 0], [0, 0, 1], [0, 0, 2]]); // Correct!
    return drawOpt([[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]]);
  }

  // ---------------- SUBTES 10: SPASIAL POLA ----------------
  // Q1: Matriks 3x3 bentuk (Circle, Triangle, Square) + isi (Kosong, Arsir Garis/Setengah, Penuh) -> Kanan bawah: Segitiga Penuh (Opsi A)
  if (id === 'pat-q1-prompt') {
    const cells: { shape: 'circle' | 'triangle' | 'square'; fillMode: 'empty' | 'half' | 'full' }[] = [
      { shape: 'circle', fillMode: 'empty' },
      { shape: 'triangle', fillMode: 'half' },
      { shape: 'square', fillMode: 'full' },
      { shape: 'triangle', fillMode: 'full' },
      { shape: 'square', fillMode: 'empty' },
      { shape: 'circle', fillMode: 'half' },
      { shape: 'square', fillMode: 'half' },
      { shape: 'circle', fillMode: 'full' },
    ];
    return (
      <svg viewBox="0 0 180 180" className={`w-48 h-48 text-slate-800 dark:text-slate-100 ${className}`}>
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => {
            const idx = r * 3 + c;
            const x = c * 60;
            const y = r * 60;
            const item = cells[idx];
            return (
              <g key={idx}>
                <rect x={x + 2} y={y + 2} width="56" height="56" rx="4" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
                {item ? (
                  <>
                    <Shape
                      type={item.shape}
                      cx={x + 30}
                      cy={y + 30}
                      r={16}
                      fill={item.fillMode === 'full' ? 'currentColor' : 'none'}
                    />
                    {item.fillMode === 'half' && (
                      <circle cx={x + 30} cy={y + 30} r="5" fill="currentColor" />
                    )}
                  </>
                ) : (
                  <text x={x + 30} y={y + 36} textAnchor="middle" className="fill-current text-lg font-bold">
                    ?
                  </text>
                )}
              </g>
            );
          })
        )}
      </svg>
    );
  }
  if (id.startsWith('pat-q1-opt-')) {
    const key = id.slice(-1);
    return (
      <svg viewBox="0 0 100 100" className={`w-20 h-20 text-slate-800 dark:text-slate-100 ${className}`}>
        {key === 'a' && <Shape type="triangle" cx={50} cy={52} r={26} fill="currentColor" />}
        {key === 'b' && <Shape type="triangle" cx={50} cy={52} r={26} />}
        {key === 'c' && (
          <>
            <Shape type="triangle" cx={50} cy={52} r={26} />
            <circle cx={50} cy={54} r="6" fill="currentColor" />
          </>
        )}
        {key === 'd' && <Shape type="square" cx={50} cy={50} r={24} fill="currentColor" />}
        {key === 'e' && <Shape type="circle" cx={50} cy={50} r={26} fill="currentColor" />}
      </svg>
    );
  }

  // Q2: Deret 4 langkah: titik berpindah searah jarum jam (Kiri Atas -> Kanan Atas -> Kanan Bawah -> ? = Kiri Bawah, Opsi C)
  if (id === 'pat-q2-prompt') {
    const steps: { dot: [number, number]; diag: 'tl-br' | 'tr-bl' }[] = [
      { dot: [20, 20], diag: 'tl-br' },
      { dot: [60, 20], diag: 'tr-bl' },
      { dot: [60, 60], diag: 'tl-br' },
    ];
    return (
      <svg viewBox="0 0 360 90" className={`w-full max-w-md h-auto text-slate-800 dark:text-slate-100 ${className}`}>
        {steps.map((s, idx) => (
          <g key={idx} transform={`translate(${10 + idx * 90}, 5)`}>
            <rect x="8" y="8" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="2" />
            {s.diag === 'tl-br' ? (
              <line x1="8" y1="8" x2="72" y2="72" stroke="currentColor" strokeWidth="2" strokeOpacity="0.45" />
            ) : (
              <line x1="72" y1="8" x2="8" y2="72" stroke="currentColor" strokeWidth="2" strokeOpacity="0.45" />
            )}
            <circle cx={s.dot[0]} cy={s.dot[1]} r="6.5" fill="currentColor" />
          </g>
        ))}
        <g transform="translate(280, 5)">
          <rect x="8" y="8" width="64" height="64" fill="none" stroke="currentColor" strokeDasharray="4 4" strokeOpacity="0.6" strokeWidth="2" />
          <text x="40" y="47" textAnchor="middle" className="fill-current text-xl font-bold">?</text>
        </g>
      </svg>
    );
  }
  if (id.startsWith('pat-q2-opt-')) {
    const key = id.slice(-1);
    const map: Record<string, { dot: [number, number]; diag: 'tl-br' | 'tr-bl' }> = {
      a: { dot: [25, 75], diag: 'tl-br' },
      b: { dot: [25, 25], diag: 'tr-bl' },
      c: { dot: [25, 75], diag: 'tr-bl' }, // Correct!
      d: { dot: [75, 75], diag: 'tr-bl' },
      e: { dot: [75, 25], diag: 'tl-br' },
    };
    const cfg = map[key];
    return (
      <svg viewBox="0 0 100 100" className={`w-20 h-20 text-slate-800 dark:text-slate-100 ${className}`}>
        <rect x="14" y="14" width="72" height="72" fill="none" stroke="currentColor" strokeWidth="2.5" />
        {cfg.diag === 'tl-br' ? (
          <line x1="14" y1="14" x2="86" y2="86" stroke="currentColor" strokeWidth="2" strokeOpacity="0.45" />
        ) : (
          <line x1="86" y1="14" x2="14" y2="86" stroke="currentColor" strokeWidth="2" strokeOpacity="0.45" />
        )}
        <circle cx={cfg.dot[0]} cy={cfg.dot[1]} r="7" fill="currentColor" />
      </svg>
    );
  }

  // Q3: Matriks 3x3 penggabungan Kolom 1 + Kolom 2 = Kolom 3 -> Opsi B
  if (id === 'pat-q3-prompt') {
    return (
      <svg viewBox="0 0 180 180" className={`w-48 h-48 text-slate-800 dark:text-slate-100 ${className}`}>
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect key={`${r}-${c}`} x={c * 60 + 2} y={r * 60 + 2} width="56" height="56" rx="4" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
          ))
        )}
        {/* Row 1: Horiz + Vert = Plus */}
        <line x1="14" y1="30" x2="46" y2="30" stroke="currentColor" strokeWidth="3" />
        <line x1="90" y1="14" x2="90" y2="46" stroke="currentColor" strokeWidth="3" />
        <path d="M 134 30 L 166 30 M 150 14 L 150 46" stroke="currentColor" strokeWidth="3" />
        {/* Row 2: Circle + Dot = Circle with Dot */}
        <circle cx="30" cy="90" r="16" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="90" cy="90" r="5" fill="currentColor" />
        <circle cx="150" cy="90" r="16" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="150" cy="90" r="5" fill="currentColor" />
        {/* Row 3: Diamond + Diag = ? */}
        <Shape type="diamond" cx={30} cy={150} r={16} />
        <line x1="76" y1="164" x2="104" y2="136" stroke="currentColor" strokeWidth="3" />
        <text x="150" y="156" textAnchor="middle" className="fill-current text-lg font-bold">?</text>
      </svg>
    );
  }
  if (id.startsWith('pat-q3-opt-')) {
    const key = id.slice(-1);
    return (
      <svg viewBox="0 0 100 100" className={`w-20 h-20 text-slate-800 dark:text-slate-100 ${className}`}>
        {key === 'a' && (
          <>
            <Shape type="diamond" cx={50} cy={50} r={28} />
            <line x1="26" y1="26" x2="74" y2="74" stroke="currentColor" strokeWidth="3" />
          </>
        )}
        {key === 'b' && (
          <>
            <Shape type="diamond" cx={50} cy={50} r={28} />
            <line x1="26" y1="74" x2="74" y2="26" stroke="currentColor" strokeWidth="3" />
          </>
        )}
        {key === 'c' && (
          <>
            <Shape type="square" cx={50} cy={50} r={24} />
            <line x1="26" y1="74" x2="74" y2="26" stroke="currentColor" strokeWidth="3" />
          </>
        )}
        {key === 'd' && (
          <>
            <Shape type="diamond" cx={50} cy={50} r={28} />
            <circle cx="50" cy="50" r="6" fill="currentColor" />
          </>
        )}
        {key === 'e' && <line x1="24" y1="76" x2="76" y2="24" stroke="currentColor" strokeWidth="3" />}
      </svg>
    );
  }

  // Q4: Penambahan jumlah garis/sisi tiap langkah (1, 2, 3 -> 4 = Segiempat, Opsi D)
  if (id === 'pat-q4-prompt') {
    return (
      <svg viewBox="0 0 360 90" className={`w-full max-w-md h-auto text-slate-800 dark:text-slate-100 ${className}`}>
        {/* 1 line */}
        <g transform="translate(10, 5)">
          <line x1="20" y1="60" x2="60" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </g>
        {/* 2 lines (angle) */}
        <g transform="translate(100, 5)">
          <polyline points="20,60 40,20 60,60" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {/* 3 lines (triangle) */}
        <g transform="translate(190, 5)">
          <polygon points="40,16 64,62 16,62" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        </g>
        {/* ? */}
        <g transform="translate(280, 5)">
          <rect x="8" y="8" width="64" height="64" rx="8" fill="none" stroke="currentColor" strokeDasharray="4 4" strokeOpacity="0.6" strokeWidth="2" />
          <text x="40" y="47" textAnchor="middle" className="fill-current text-xl font-bold">?</text>
        </g>
      </svg>
    );
  }
  if (id.startsWith('pat-q4-opt-')) {
    const key = id.slice(-1);
    return (
      <svg viewBox="0 0 100 100" className={`w-20 h-20 text-slate-800 dark:text-slate-100 ${className}`}>
        {key === 'a' && <Shape type="circle" cx={50} cy={50} r={26} />}
        {key === 'b' && <Shape type="pentagon" cx={50} cy={50} r={28} />}
        {key === 'c' && <Shape type="triangle" cx={50} cy={52} r={28} />}
        {key === 'd' && <Shape type="square" cx={50} cy={50} r={24} />}
        {key === 'e' && <Shape type="hexagon" cx={50} cy={50} r={28} />}
      </svg>
    );
  }

  // ---------------- SUBTES 11: MEKANIKAL ----------------
  if (id === 'mech-q1') {
    return (
      <svg viewBox="0 0 380 150" className={`w-full max-w-md h-auto text-slate-800 dark:text-slate-100 ${className}`} role="img" aria-label="Tiga roda gigi bersinggungan A, B, dan C">
        {/* Gear A (r=38) */}
        <circle cx="80" cy="78" r="38" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="3" strokeDasharray="8 4" />
        <circle cx="80" cy="78" r="28" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="80" y="75" textAnchor="middle" className="fill-current text-xs font-bold">A</text>
        <text x="80" y="90" textAnchor="middle" className="fill-current text-[10px] font-mono">24 gigi</text>
        <path d="M 62 32 Q 80 20 98 32" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-teal-600 dark:text-teal-400" />
        <polygon points="101,34 95,26 92,35" className="fill-teal-600 dark:fill-teal-400" />

        {/* Gear B (r=20) */}
        <circle cx="144" cy="78" r="20" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="3" strokeDasharray="6 3" />
        <text x="144" y="75" textAnchor="middle" className="fill-current text-xs font-bold">B</text>
        <text x="144" y="89" textAnchor="middle" className="fill-current text-[9px] font-mono">12</text>

        {/* Gear C (r=52) */}
        <circle cx="226" cy="78" r="52" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="3" strokeDasharray="9 4" />
        <circle cx="226" cy="78" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="226" y="75" textAnchor="middle" className="fill-current text-xs font-bold">C</text>
        <text x="226" y="90" textAnchor="middle" className="fill-current text-[10px] font-mono">36 gigi</text>
        <text x="320" y="75" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 text-[11px]">Arah &amp; laju C?</text>
      </svg>
    );
  }

  if (id === 'mech-q2') {
    return (
      <svg viewBox="0 0 280 185" className={`w-64 h-auto text-slate-800 dark:text-slate-100 ${className}`} role="img" aria-label="Sistem katrol tetap dan katrol bergerak mengangkat beban 120 N">
        {/* Support ceiling */}
        <line x1="60" y1="18" x2="210" y2="18" stroke="currentColor" strokeWidth="4" />
        {/* Fixed pulley */}
        <line x1="110" y1="18" x2="110" y2="45" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="110" cy="45" r="16" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2.5" />
        {/* Movable pulley */}
        <circle cx="155" cy="110" r="16" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2.5" />
        {/* Rope */}
        <line x1="171" y1="18" x2="171" y2="110" stroke="currentColor" strokeWidth="2" />
        <line x1="139" y1="110" x2="126" y2="45" stroke="currentColor" strokeWidth="2" />
        <line x1="94" y1="45" x2="94" y2="115" stroke="currentColor" strokeWidth="2" className="text-teal-600 dark:text-teal-400" />
        <polygon points="94,125 89,113 99,113" className="fill-teal-600 dark:fill-teal-400" />
        <text x="72" y="122" className="fill-teal-600 dark:fill-teal-400 text-sm font-bold font-mono">F = ?</text>
        {/* Load */}
        <line x1="155" y1="126" x2="155" y2="140" stroke="currentColor" strokeWidth="2.5" />
        <rect x="132" y="140" width="46" height="30" rx="3" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
        <text x="155" y="159" textAnchor="middle" className="fill-current text-xs font-mono font-bold">120 N</text>
      </svg>
    );
  }

  if (id === 'mech-q3') {
    return (
      <svg viewBox="0 0 360 140" className={`w-full max-w-md h-auto text-slate-800 dark:text-slate-100 ${className}`} role="img" aria-label="Tuas seimbang dengan titik tumpu">
        {/* Lever beam */}
        <line x1="40" y1="68" x2="310" y2="68" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        {/* Fulcrum at x=202 (left=162px ~ 3m, right=108px ~ 2m) */}
        <polygon points="202,71 187,100 217,100" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
        <line x1="172" y1="100" x2="232" y2="100" stroke="currentColor" strokeWidth="2.5" />
        {/* Left weight */}
        <rect x="44" y="34" width="40" height="32" rx="3" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
        <text x="64" y="54" textAnchor="middle" className="fill-current text-xs font-mono font-bold">40 N</text>
        {/* Right weight */}
        <rect x="266" y="34" width="40" height="32" rx="3" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
        <text x="286" y="54" textAnchor="middle" className="fill-current text-xs font-mono font-bold">W = ?</text>
        {/* Dimensions */}
        <line x1="64" y1="115" x2="202" y2="115" stroke="currentColor" strokeOpacity="0.5" strokeDasharray="3 3" />
        <text x="133" y="129" textAnchor="middle" className="fill-current text-xs font-mono">3 m</text>
        <line x1="202" y1="115" x2="286" y2="115" stroke="currentColor" strokeOpacity="0.5" strokeDasharray="3 3" />
        <text x="244" y="129" textAnchor="middle" className="fill-current text-xs font-mono">2 m</text>
      </svg>
    );
  }

  if (id === 'mech-q4') {
    return (
      <svg viewBox="0 0 320 155" className={`w-72 h-auto text-slate-800 dark:text-slate-100 ${className}`} role="img" aria-label="Tangki air dengan tiga lubang P, Q, dan R pada kedalaman berbeda">
        {/* Water tank */}
        <rect x="75" y="20" width="90" height="115" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <rect x="77" y="36" width="86" height="97" className="fill-sky-500/20 dark:fill-sky-400/20" />
        <line x1="77" y1="36" x2="163" y2="36" stroke="currentColor" strokeWidth="1.5" className="text-sky-600 dark:text-sky-400" />
        {/* Holes P, Q, R */}
        <circle cx="165" cy="54" r="3.5" fill="currentColor" />
        <text x="150" y="58" className="fill-current text-xs font-bold">P</text>
        <path d="M 167 54 Q 195 62 208 135" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="text-sky-600 dark:text-sky-400" />

        <circle cx="165" cy="86" r="3.5" fill="currentColor" />
        <text x="150" y="90" className="fill-current text-xs font-bold">Q</text>
        <path d="M 167 86 Q 220 92 248 135" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="text-sky-600 dark:text-sky-400" />

        <circle cx="165" cy="116" r="3.5" fill="currentColor" />
        <text x="150" y="120" className="fill-current text-xs font-bold">R</text>
        <path d="M 167 116 Q 245 120 278 135" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="text-sky-600 dark:text-sky-400" />

        <line x1="40" y1="135" x2="295" y2="135" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  return null;
};
