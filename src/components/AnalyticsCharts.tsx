import React, { useState } from 'react';

export interface SubtesScoreItem {
  subtesId: number;
  name: string;
  shortName: string;
  cluster: string;
  correct: number;
  total: number;
  percentage: number;
}

export interface ClusterScoreItem {
  cluster: string;
  correct: number;
  total: number;
  percentage: number;
}

interface AnalyticsChartsProps {
  subtesScores: SubtesScoreItem[];
  clusterScores: ClusterScoreItem[];
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ subtesScores, clusterScores }) => {
  const [hoveredSubtes, setHoveredSubtes] = useState<SubtesScoreItem | null>(null);

  const avgPct =
    subtesScores.length > 0
      ? Math.round(subtesScores.reduce((acc, s) => acc + s.percentage, 0) / subtesScores.length)
      : 0;

  // Radar chart geometry for 7 clusters
  const radarSize = 300;
  const cx = radarSize / 2;
  const cy = radarSize / 2;
  const radius = 92;
  const n = clusterScores.length;

  const getPoint = (index: number, pct: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    const r = (Math.max(pct, 6) / 100) * radius;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      labelX: cx + (radius + 26) * Math.cos(angle),
      labelY: cy + (radius + 26) * Math.sin(angle),
    };
  };

  const radarPolygon = clusterScores
    .map((c, i) => {
      const p = getPoint(i, c.percentage);
      return `${p.x},${p.y}`;
    })
    .join(' ');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 1. Radar Chart: 7 Rumpun Bakat */}
      <div className="lg:col-span-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Profil 7 Rumpun Bakat ABM
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Distribusi persentase ketepatan berdasarkan aspek yang diukur pada pedoman.
          </p>
        </div>

        <div className="my-4 flex justify-center">
          <svg
            viewBox={`0 0 ${radarSize} ${radarSize}`}
            className="w-full max-w-[300px] h-auto text-slate-700 dark:text-slate-300"
            role="img"
            aria-label="Grafik radar 7 rumpun bakat ABM"
          >
            {/* Concentric rings */}
            {[25, 50, 75, 100].map((ring) => {
              const pts = clusterScores
                .map((_, i) => {
                  const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
                  const r = (ring / 100) * radius;
                  return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
                })
                .join(' ');
              return (
                <polygon
                  key={ring}
                  points={pts}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.14"
                  strokeWidth="1"
                />
              );
            })}

            {/* Axes */}
            {clusterScores.map((c, i) => {
              const p = getPoint(i, 100);
              const shortLabel = c.cluster === 'Penggunaan Bahasa' ? 'Bahasa' : c.cluster;
              return (
                <g key={c.cluster}>
                  <line
                    x1={cx}
                    y1={cy}
                    x2={p.x}
                    y2={p.y}
                    stroke="currentColor"
                    strokeOpacity="0.18"
                    strokeWidth="1"
                  />
                  <text
                    x={p.labelX}
                    y={p.labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-slate-700 dark:fill-slate-300 text-[10px] font-medium"
                  >
                    {shortLabel}
                  </text>
                </g>
              );
            })}

            {/* Data polygon */}
            {n >= 3 && (
              <polygon
                points={radarPolygon}
                className="fill-teal-500/20 stroke-teal-600 dark:fill-teal-400/20 dark:stroke-teal-400"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
            )}

            {/* Data points */}
            {clusterScores.map((c, i) => {
              const p = getPoint(i, c.percentage);
              return (
                <circle
                  key={c.cluster}
                  cx={p.x}
                  cy={p.y}
                  r="4"
                  className="fill-teal-600 dark:fill-teal-400 stroke-white dark:stroke-slate-900"
                  strokeWidth="1.5"
                />
              );
            })}
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          {clusterScores.map((c) => (
            <div key={c.cluster} className="flex items-center justify-between gap-2 py-1">
              <span className="text-slate-600 dark:text-slate-400 truncate">
                {c.cluster === 'Penggunaan Bahasa' ? 'Bahasa' : c.cluster}
              </span>
              <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-slate-100">
                {c.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Bar Chart: Skor per Subtes */}
      <div className="lg:col-span-7 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-between">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Grafik Analitik Ketepatan per Subtes
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Arahkan kursor atau ketuk batang grafik untuk melihat detail jumlah benar tiap subtes.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500 dark:text-slate-400">Rata-rata Subtes</span>
            <div className="font-mono tabular-nums text-lg font-bold text-teal-700 dark:text-teal-400">
              {avgPct}%
            </div>
          </div>
        </div>

        {/* Hover / Active detail banner */}
        <div className="mt-3 min-h-[38px] px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 flex items-center justify-between text-xs">
          {hoveredSubtes ? (
            <>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                Subtes {hoveredSubtes.subtesId}: {hoveredSubtes.name}
              </span>
              <span className="font-mono tabular-nums font-semibold text-teal-700 dark:text-teal-400">
                {hoveredSubtes.correct}/{hoveredSubtes.total} benar ({hoveredSubtes.percentage}%)
              </span>
            </>
          ) : (
            <span className="text-slate-500 dark:text-slate-400">
              Menampilkan {subtesScores.length} subtes yang dikerjakan · Garis putus-putus menandakan rata-rata ({avgPct}%).
            </span>
          )}
        </div>

        {/* Responsive Horizontal Bar List / Vertical SVG depending on count */}
        <div className="mt-4 overflow-x-auto">
          <div className="min-w-[460px]">
            <svg
              viewBox="0 0 560 225"
              className="w-full h-auto text-slate-700 dark:text-slate-300"
              role="img"
              aria-label="Grafik batang skor subtes ABM"
            >
              {/* Y Grid */}
              {[0, 25, 50, 75, 100].map((val) => {
                const y = 175 - (val / 100) * 145;
                return (
                  <g key={val}>
                    <line
                      x1="40"
                      y1={y}
                      x2="545"
                      y2={y}
                      stroke="currentColor"
                      strokeOpacity="0.12"
                    />
                    <text
                      x="32"
                      y={y + 3}
                      textAnchor="end"
                      className="fill-slate-400 dark:fill-slate-500 text-[10px] font-mono"
                    >
                      {val}%
                    </text>
                  </g>
                );
              })}

              {/* Average dashed line */}
              {subtesScores.length > 0 && (
                <line
                  x1="40"
                  y1={175 - (avgPct / 100) * 145}
                  x2="545"
                  y2={175 - (avgPct / 100) * 145}
                  className="stroke-amber-500 dark:stroke-amber-400"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              )}

              {/* Bars */}
              {subtesScores.map((s, idx) => {
                const slotW = 500 / Math.max(subtesScores.length, 1);
                const barW = Math.min(26, slotW * 0.62);
                const x = 44 + idx * slotW + (slotW - barW) / 2;
                const barH = Math.max(4, (s.percentage / 100) * 145);
                const y = 175 - barH;
                const isActive = hoveredSubtes?.subtesId === s.subtesId;
                const barColorClass =
                  s.percentage >= 75
                    ? 'fill-teal-600 dark:fill-teal-400'
                    : s.percentage >= 50
                    ? 'fill-sky-600 dark:fill-sky-400'
                    : 'fill-amber-500 dark:fill-amber-400';

                return (
                  <g
                    key={s.subtesId}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredSubtes(s)}
                    onClick={() => setHoveredSubtes(s)}
                  >
                    <rect
                      x={x}
                      y={y}
                      width={barW}
                      height={barH}
                      rx="3"
                      className={`${barColorClass} transition-opacity ${
                        isActive ? 'opacity-100' : 'opacity-85 hover:opacity-100'
                      }`}
                    />
                    <text
                      x={x + barW / 2}
                      y={y - 6}
                      textAnchor="middle"
                      className="fill-current text-[9px] font-mono font-semibold"
                    >
                      {s.percentage}
                    </text>
                    <text
                      x={x + barW / 2}
                      y="194"
                      textAnchor="middle"
                      className="fill-slate-600 dark:fill-slate-400 text-[10px] font-mono font-medium"
                    >
                      S{s.subtesId}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Accessible legend with text labels (no color-only signaling) */}
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-teal-600 dark:bg-teal-400" />
            <span>Tinggi (&ge;75%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-sky-600 dark:bg-sky-400" />
            <span>Cukup (50–74%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-amber-500 dark:bg-amber-400" />
            <span>Perlu Penguatan (&lt;50%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
