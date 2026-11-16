import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  PauseCircle,
  Play,
  RotateCcw,
  ShieldAlert,
  WifiOff,
  XCircle,
} from 'lucide-react';
import { SUBTES_LIST } from '../data/abmGuideData';
import { ABM_QUESTIONS, QuestionItem } from '../data/abmQuestions';
import { SvgDiagram } from './SvgDiagrams';
import { AnalyticsCharts, ClusterScoreItem, SubtesScoreItem } from './AnalyticsCharts';

interface PracticeSimulatorProps {
  initialSubtesId?: number | null;
  onClearInitialSubtes?: () => void;
  onBackToDocs: () => void;
}

type SimulatorPhase = 'setup' | 'running' | 'result';
type TimerMode = 'untimed' | 'timed';

interface SavedResult {
  participantName: string;
  completedAt: string;
  elapsedSeconds: number;
  selectedSubtesIds: number[];
  answers: Record<string, number>;
}

const STORAGE_KEY = 'abm-2026-last-result';

export const PracticeSimulator: React.FC<PracticeSimulatorProps> = ({
  initialSubtesId,
  onClearInitialSubtes,
  onBackToDocs,
}) => {
  const [phase, setPhase] = useState<SimulatorPhase>('setup');
  const [participantName, setParticipantName] = useState<string>('');
  const [selectedSubtesIds, setSelectedSubtesIds] = useState<number[]>(
    SUBTES_LIST.map((s) => s.id)
  );
  const [timerMode, setTimerMode] = useState<TimerMode>('timed');

  // Active test state
  const [activeSubtesIdx, setActiveSubtesIdx] = useState<number>(0);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [subtesSecondsLeft, setSubtesSecondsLeft] = useState<number>(0);
  const [totalElapsedSeconds, setTotalElapsedSeconds] = useState<number>(0);
  const [isConnectionPaused, setIsConnectionPaused] = useState<boolean>(false);

  // Memory phase state for Subtes 14 (keyed by question.id)
  const [memoryRevealed, setMemoryRevealed] = useState<Record<string, boolean>>({});
  const [memoryCountdown, setMemoryCountdown] = useState<number>(10);

  // Review filter on result screen
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | number>('all');

  // Load saved result availability
  const [savedResult, setSavedResult] = useState<SavedResult | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as SavedResult) : null;
    } catch {
      return null;
    }
  });

  // If triggered from Documentation "Coba Latihan Subtes Ini"
  useEffect(() => {
    if (initialSubtesId) {
      setSelectedSubtesIds([initialSubtesId]);
      setPhase('setup');
      onClearInitialSubtes?.();
    }
  }, [initialSubtesId, onClearInitialSubtes]);

  const orderedSubtes = useMemo(
    () => SUBTES_LIST.filter((s) => selectedSubtesIds.includes(s.id)),
    [selectedSubtesIds]
  );

  const currentSubtes = orderedSubtes[activeSubtesIdx];

  const currentSubtesQuestions = useMemo(
    () =>
      currentSubtes
        ? ABM_QUESTIONS.filter((q) => q.subtesId === currentSubtes.id)
        : [],
    [currentSubtes]
  );

  const currentQuestion: QuestionItem | undefined =
    currentSubtesQuestions[activeQuestionIdx];

  const activeQuestionsAll = useMemo(
    () =>
      orderedSubtes.flatMap((s) =>
        ABM_QUESTIONS.filter((q) => q.subtesId === s.id)
      ),
    [orderedSubtes]
  );

  // Proportional timer per subtest (2 minutes per subtest in simulation for brisk practice, or proportional)
  const getSubtesDurationSeconds = (subtesId: number) => {
    const info = SUBTES_LIST.find((s) => s.id === subtesId);
    // Keep simulation time proportional & practical (e.g., 3 minutes per subtest ~ 42 min full or official min * 30s)
    return info ? Math.max(120, info.officialMinutes * 20) : 180;
  };

  // Start simulation
  const handleStart = (customIds?: number[]) => {
    const idsToUse =
      customIds && customIds.length > 0
        ? customIds
        : selectedSubtesIds.length > 0
        ? [...selectedSubtesIds].sort((a, b) => a - b)
        : SUBTES_LIST.map((s) => s.id);

    setSelectedSubtesIds(idsToUse);
    setActiveSubtesIdx(0);
    setActiveQuestionIdx(0);
    setAnswers({});
    setTotalElapsedSeconds(0);
    setIsConnectionPaused(false);
    setMemoryRevealed({});
    setSubtesSecondsLeft(getSubtesDurationSeconds(idsToUse[0]));
    setPhase('running');
  };

  // Timer tick during running phase
  useEffect(() => {
    if (phase !== 'running' || isConnectionPaused) return;
    const id = window.setInterval(() => {
      setTotalElapsedSeconds((prev) => prev + 1);
      if (timerMode === 'timed') {
        setSubtesSecondsLeft((prev) => {
          if (prev <= 1) {
            // Auto advance to next subtest or finish
            if (activeSubtesIdx + 1 < orderedSubtes.length) {
              const nextSub = orderedSubtes[activeSubtesIdx + 1];
              setActiveSubtesIdx((i) => i + 1);
              setActiveQuestionIdx(0);
              return getSubtesDurationSeconds(nextSub.id);
            } else {
              finishSimulation();
              return 0;
            }
          }
          return prev - 1;
        });
      }
    }, 1000);
    return () => window.clearInterval(id);
  });

  // Memory card countdown for Subtes 14
  useEffect(() => {
    if (
      phase !== 'running' ||
      isConnectionPaused ||
      !currentQuestion?.memoryItems
    ) {
      return;
    }
    const alreadyHidden = memoryRevealed[currentQuestion.id] === false;
    if (alreadyHidden) return;

    setMemoryCountdown(currentQuestion.memorySeconds || 10);
    const interval = window.setInterval(() => {
      setMemoryCountdown((prev) => {
        if (prev <= 1) {
          setMemoryRevealed((m) => ({ ...m, [currentQuestion.id]: false }));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [phase, isConnectionPaused, currentQuestion?.id]);

  const finishSimulation = (overrideAnswers?: Record<string, number>) => {
    const finalAnswers = overrideAnswers ?? answers;
    const resultPayload: SavedResult = {
      participantName: participantName.trim() || 'Peserta Latihan',
      completedAt: new Date().toISOString(),
      elapsedSeconds: totalElapsedSeconds,
      selectedSubtesIds: [...selectedSubtesIds].sort((a, b) => a - b),
      answers: finalAnswers,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resultPayload));
    } catch {
      // ignore storage quota errors
    }
    setSavedResult(resultPayload);
    setReviewFilter('all');
    setPhase('result');
  };

  const handleLoadSavedResult = () => {
    if (!savedResult) return;
    setParticipantName(savedResult.participantName);
    setSelectedSubtesIds(savedResult.selectedSubtesIds);
    setAnswers(savedResult.answers);
    setTotalElapsedSeconds(savedResult.elapsedSeconds);
    setPhase('result');
  };

  const toggleSubtesSelection = (id: number) => {
    setSelectedSubtesIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id].sort((a, b) => a - b)
    );
  };

  const handleSelectAnswer = (questionId: string, optionIdx: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleNextStep = () => {
    if (activeQuestionIdx + 1 < currentSubtesQuestions.length) {
      setActiveQuestionIdx((q) => q + 1);
    } else if (activeSubtesIdx + 1 < orderedSubtes.length) {
      const nextIdx = activeSubtesIdx + 1;
      setActiveSubtesIdx(nextIdx);
      setActiveQuestionIdx(0);
      setSubtesSecondsLeft(getSubtesDurationSeconds(orderedSubtes[nextIdx].id));
    } else {
      finishSimulation();
    }
  };

  const handlePrevQuestion = () => {
    if (activeQuestionIdx > 0) {
      setActiveQuestionIdx((q) => q - 1);
    }
  };

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Compute analytics for result screen
  const analytics = useMemo(() => {
    const subtesScores: SubtesScoreItem[] = orderedSubtes.map((sub) => {
      const qs = ABM_QUESTIONS.filter((q) => q.subtesId === sub.id);
      const correct = qs.filter((q) => answers[q.id] === q.correctIndex).length;
      const total = qs.length;
      const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
      return {
        subtesId: sub.id,
        name: sub.name,
        shortName: `S${sub.id}`,
        cluster: sub.cluster,
        correct,
        total,
        percentage,
      };
    });

    const clusterOrder: SubtesScoreItem['cluster'][] = [
      'Verbal',
      'Kuantitatif',
      'Penalaran',
      'Spasial',
      'Mekanikal',
      'Penggunaan Bahasa',
      'Klerikal',
    ];

    const clusterScores: ClusterScoreItem[] = clusterOrder
      .map((cl) => {
        const items = subtesScores.filter((s) => s.cluster === cl);
        const correct = items.reduce((a, b) => a + b.correct, 0);
        const total = items.reduce((a, b) => a + b.total, 0);
        return {
          cluster: cl,
          correct,
          total,
          percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
        };
      })
      .filter((c) => c.total > 0);

    const totalCorrect = subtesScores.reduce((a, b) => a + b.correct, 0);
    const totalQuestions = subtesScores.reduce((a, b) => a + b.total, 0);
    const totalAnswered = activeQuestionsAll.filter((q) => answers[q.id] !== undefined).length;
    const overallScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    const topClusters = [...clusterScores]
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 2);

    return {
      subtesScores,
      clusterScores,
      totalCorrect,
      totalQuestions,
      totalAnswered,
      overallScore,
      topClusters,
    };
  }, [orderedSubtes, answers, activeQuestionsAll]);

  // ================= SETUP SCREEN =================
  if (phase === 'setup') {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Banner */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="relative p-6 sm:p-8 bg-slate-900">
            <img
              src={`${import.meta.env.BASE_URL}assets/aistudio/background_fbf6dcfa.jpg`}
              alt="SMA Negeri 1 Kersana"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-900/82 to-slate-900/68"
            />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center bg-white/95 rounded-xl px-3 py-1.5 shadow-sm max-w-full">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/Header_f54afaf9.png`}
                    alt="Logo SMA Negeri 1 Kersana dan Lembaga Pendidikan"
                    referrerPolicy="no-referrer"
                    className="h-8 sm:h-10 w-auto object-contain"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-teal-300 font-medium">
                  <span>SMA Negeri 1 Kersana</span>
                  <span aria-hidden="true">·</span>
                  <span>Simulasi Mandiri Tanpa Login</span>
                  <span aria-hidden="true">·</span>
                  <span>14 Subtes Lengkap</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
                  Latihan Asesmen Bakat Murid (ABM) 2026
                </h1>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  Uji kesiapan murid kelas XI SMA Negeri 1 Kersana dalam mengerjakan ke-14 subtes ABM secara berurutan atau per subtes tertentu. Setelah selesai, skor dan grafik analitik 7 rumpun bakat akan ditampilkan secara otomatis.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {savedResult && (
                  <button
                    type="button"
                    onClick={handleLoadSavedResult}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/25 bg-slate-950/50 hover:bg-slate-950/75 text-sm font-medium text-white transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Lihat Hasil Terakhir
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleStart()}
                  disabled={selectedSubtesIds.length === 0}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  Mulai Latihan ({selectedSubtesIds.length} Subtes)
                </button>
              </div>
            </div>
          </div>

          {/* Quick Options Row */}
          <div className="p-6 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label
                htmlFor="participant-name"
                className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5"
              >
                Nama Peserta / Kelas (Opsional, tanpa akun)
              </label>
              <input
                id="participant-name"
                type="text"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                placeholder="Contoh: Nadia (XI-1 SMAN 1 Kersana)"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <span className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                Mode Pengatur Waktu
              </span>
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setTimerMode('timed')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    timerMode === 'timed'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  Timer Terstruktur
                </button>
                <button
                  type="button"
                  onClick={() => setTimerMode('untimed')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    timerMode === 'untimed'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  Bebas (Tanpa Timer)
                </button>
              </div>
            </div>

            <div>
              <span className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                Preset Pilihan Subtes
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSubtesIds(SUBTES_LIST.map((s) => s.id))}
                  className="px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  Pilih Semua (14)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSubtesIds([])}
                  className="px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  Kosongkan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 14 Subtes Selection Grid */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Pilih Subtes Latihan (14 Subtes Resmi ABM 2026)
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
              Terpilih: {selectedSubtesIds.length}/14 subtes · {selectedSubtesIds.length * 4} butir soal latihan
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUBTES_LIST.map((sub) => {
              const isSelected = selectedSubtesIds.includes(sub.id);
              const qCount = ABM_QUESTIONS.filter((q) => q.subtesId === sub.id).length;
              return (
                <div
                  key={sub.id}
                  onClick={() => toggleSubtesSelection(sub.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleSubtesSelection(sub.id);
                    }
                  }}
                  className={`group rounded-xl border p-4 transition-colors cursor-pointer flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'border-teal-600 dark:border-teal-500 bg-teal-50/50 dark:bg-teal-950/30'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-medium text-teal-700 dark:text-teal-400">
                        Subtes {sub.id} · {sub.cluster}
                      </span>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        aria-label={`Pilih ${sub.name}`}
                        className="w-4 h-4 accent-teal-700 rounded cursor-pointer"
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {sub.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {sub.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-mono tabular-nums">
                      Latihan: {qCount} soal · Resmi: {sub.officialQuestions} soal / {sub.officialMinutes}m
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStart([sub.id]);
                      }}
                      className="text-teal-700 dark:text-teal-400 font-semibold hover:underline cursor-pointer whitespace-nowrap"
                    >
                      Coba Langsung
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ================= RUNNING EXAM SCREEN =================
  if (phase === 'running' && currentSubtes && currentQuestion) {
    const isMemoryQuestion = Boolean(currentQuestion.memoryItems);
    const isMemoryCardVisible =
      isMemoryQuestion && memoryRevealed[currentQuestion.id] !== false;
    const isLastQuestionInSubtes =
      activeQuestionIdx + 1 >= currentSubtesQuestions.length;
    const isLastSubtes = activeSubtesIdx + 1 >= orderedSubtes.length;

    const answeredInSubtes = currentSubtesQuestions.filter(
      (q) => answers[q.id] !== undefined
    ).length;

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        {/* Top Exam Status Bar */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
              Subtes {activeSubtesIdx + 1} dari {orderedSubtes.length} · Rumpun {currentSubtes.cluster}
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              {currentSubtes.code}: {currentSubtes.name}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsConnectionPaused((p) => !p)}
              title="Simulasi mekanisme Bab IV.E: timer berhenti otomatis jika koneksi terputus"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                isConnectionPaused
                  ? 'border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {isConnectionPaused ? (
                <>
                  <Play className="w-3.5 h-3.5" />
                  Lanjutkan Sesi
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5" />
                  Simulasi Jeda Koneksi
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono tabular-nums font-semibold text-slate-800 dark:text-slate-200">
              <Clock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              {timerMode === 'timed'
                ? formatDuration(subtesSecondsLeft)
                : formatDuration(totalElapsedSeconds)}
            </div>

            <button
              type="button"
              onClick={() => finishSimulation()}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Selesai
            </button>
          </div>
        </div>

        {/* Connection Paused Banner (Demonstrating Bab IV.E Rule) */}
        {isConnectionPaused ? (
          <div className="rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 p-6 text-center space-y-3">
            <PauseCircle className="w-10 h-10 mx-auto text-amber-600 dark:text-amber-400" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Penghitung Waktu Dijeda Sementara
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
              Sesuai Pedoman ABM Bab IV.E, apabila terjadi gangguan koneksi internet saat asesmen berlangsung, timer berhenti sementara secara otomatis dan seluruh jawaban Anda tetap tersimpan aman di sistem.
            </p>
            <button
              type="button"
              onClick={() => setIsConnectionPaused(false)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold cursor-pointer"
            >
              <Play className="w-4 h-4" />
              Sambung Kembali &amp; Lanjutkan
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Question Panel */}
            <div className="lg:col-span-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-mono tabular-nums font-medium">
                  Soal {activeQuestionIdx + 1} dari {currentSubtesQuestions.length}
                </span>
                <span>{currentSubtes.focusTip}</span>
              </div>

              {/* Memory Card Phase for Subtes 14 */}
              {isMemoryQuestion && isMemoryCardVisible ? (
                <div className="space-y-5 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                        Tahap Menghafal (Klerikal Memory)
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Hafalkan pasangan informasi berikut sebelum waktu berakhir.
                      </p>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 font-mono tabular-nums text-sm font-bold text-teal-700 dark:text-teal-300">
                      {memoryCountdown} dtk
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentQuestion.memoryItems?.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-4 flex items-center justify-between"
                      >
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {item.label}
                        </span>
                        <span className="font-mono font-bold text-sm text-teal-700 dark:text-teal-400">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setMemoryRevealed((m) => ({
                          ...m,
                          [currentQuestion.id]: false,
                        }))
                      }
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold cursor-pointer"
                    >
                      <EyeOff className="w-4 h-4" />
                      Saya Sudah Hafal, Tampilkan Pertanyaan
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Reading Passage */}
                  {currentQuestion.passage && (
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 p-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {currentQuestion.passage}
                    </div>
                  )}

                  {/* Data Table */}
                  {currentQuestion.tableData && (
                    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                          <tr>
                            {currentQuestion.tableData.headers.map((h) => (
                              <th key={h} className="px-3.5 py-2.5 font-semibold text-xs">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                          {currentQuestion.tableData.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="bg-white dark:bg-slate-900">
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`px-3.5 py-2 text-xs sm:text-sm ${
                                    typeof cell === 'number' ? 'font-mono tabular-nums' : 'font-medium'
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* SVG Diagram Prompt */}
                  {currentQuestion.diagramId && (
                    <div className="flex justify-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                      <SvgDiagram id={currentQuestion.diagramId} />
                    </div>
                  )}

                  {/* Question Prompt */}
                  <div className="text-base font-medium text-slate-900 dark:text-slate-100 whitespace-pre-line leading-relaxed">
                    {currentQuestion.prompt}
                  </div>

                  {/* Allow re-peek only in Untimed mode */}
                  {isMemoryQuestion && timerMode === 'untimed' && (
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          setMemoryRevealed((m) => ({
                            ...m,
                            [currentQuestion.id]: true,
                          }))
                        }
                        className="inline-flex items-center gap-1.5 text-xs text-teal-700 dark:text-teal-400 hover:underline cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Lihat Ulang Kartu Memori (Mode Santai)
                      </button>
                    </div>
                  )}

                  {/* Options */}
                  <div
                    className={
                      currentQuestion.options.some((o) => o.diagramId)
                        ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3'
                        : 'space-y-2.5'
                    }
                  >
                    {currentQuestion.options.map((opt, idx) => {
                      const letter = String.fromCharCode(65 + idx);
                      const isChosen = answers[currentQuestion.id] === idx;
                      const isVisual = Boolean(opt.diagramId);

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectAnswer(currentQuestion.id, idx)}
                          className={`w-full text-left rounded-xl border transition-colors cursor-pointer ${
                            isVisual
                              ? 'p-3 flex flex-col items-center justify-center gap-2'
                              : 'px-4 py-3 flex items-center gap-3'
                          } ${
                            isChosen
                              ? 'border-teal-600 dark:border-teal-400 bg-teal-50/70 dark:bg-teal-950/50 text-slate-900 dark:text-slate-50'
                              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span
                            className={`inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-mono font-bold shrink-0 ${
                              isChosen
                                ? 'bg-teal-700 text-white dark:bg-teal-500 dark:text-slate-950'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {letter}
                          </span>
                          {opt.diagramId ? (
                            <SvgDiagram id={opt.diagramId} />
                          ) : (
                            <span
                              className={`text-sm ${
                                currentSubtes.id === 13 ? 'font-mono tracking-wide' : ''
                              }`}
                            >
                              {opt.text}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Navigation Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handlePrevQuestion}
                  disabled={activeQuestionIdx === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Sebelumnya
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white text-xs sm:text-sm font-semibold cursor-pointer"
                >
                  {isLastQuestionInSubtes
                    ? isLastSubtes
                      ? 'Selesai & Lihat Analitik'
                      : `Lanjut ke Subtes ${orderedSubtes[activeSubtesIdx + 1].id}`
                    : 'Soal Berikutnya'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Sidebar: Question Navigator & Sequential Warning (Lampiran 2) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Navigasi Subtes {currentSubtes.id}
                  </span>
                  <span className="font-mono tabular-nums text-slate-500 dark:text-slate-400">
                    {answeredInSubtes}/{currentSubtesQuestions.length} terjawab
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {currentSubtesQuestions.map((q, idx) => {
                    const isCurrent = idx === activeQuestionIdx;
                    const isAnswered = answers[q.id] !== undefined;
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setActiveQuestionIdx(idx)}
                        className={`h-10 rounded-lg font-mono tabular-nums text-xs font-semibold border transition-colors cursor-pointer ${
                          isCurrent
                            ? 'border-teal-600 dark:border-teal-400 bg-teal-700 text-white dark:bg-teal-500 dark:text-slate-950'
                            : isAnswered
                            ? 'border-teal-300 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Sesuai Lampiran 2 Pedoman ABM, pengerjaan dilakukan berurutan dan peserta tidak dapat kembali ke subtes sebelumnya setelah berpindah subtes.
                </div>
              </div>

              {/* Overall Subtests Stepper */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
                <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Urutan Subtes Terpilih
                </h3>
                <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                  {orderedSubtes.map((sub, idx) => {
                    const status =
                      idx < activeSubtesIdx
                        ? 'Selesai'
                        : idx === activeSubtesIdx
                        ? 'Aktif'
                        : 'Berikutnya';
                    return (
                      <div
                        key={sub.id}
                        className={`flex items-center justify-between text-xs px-2.5 py-1.5 rounded-md ${
                          idx === activeSubtesIdx
                            ? 'bg-teal-50 dark:bg-teal-950/50 text-teal-800 dark:text-teal-300 font-semibold'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        <span className="truncate">
                          {sub.id}. {sub.name}
                        </span>
                        <span className="font-mono text-[11px] shrink-0 ml-2">
                          {status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ================= RESULT & ANALYTICS SCREEN =================
  const filteredReviewQuestions = activeQuestionsAll.filter((q) => {
    if (reviewFilter === 'wrong') return answers[q.id] !== q.correctIndex;
    if (typeof reviewFilter === 'number') return q.subtesId === reviewFilter;
    return true;
  });

  const performanceLabel =
    analytics.overallScore >= 80
      ? 'Sangat Baik'
      : analytics.overallScore >= 60
      ? 'Baik'
      : analytics.overallScore >= 40
      ? 'Cukup'
      : 'Perlu Latihan Lanjutan';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Score Summary Header */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>Hasil Simulasi ABM 2026</span>
              <span aria-hidden="true">·</span>
              <span>{participantName || 'Peserta Latihan'}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{orderedSubtes.length} Subtes</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50">
              Skor &amp; Analitik Profil Bakat Anda
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              {analytics.topClusters.length > 0
                ? `Kecenderungan skor tertinggi Anda saat ini berada pada rumpun ${analytics.topClusters
                    .map((c) => `${c.cluster} (${c.percentage}%)`)
                    .join(' dan ')}.`
                : 'Simulasi telah diselesaikan.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onBackToDocs}
              className="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              Kembali ke Pedoman
            </button>
            <button
              type="button"
              onClick={() => setPhase('setup')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white text-sm font-semibold cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Latihan Ulang
            </button>
          </div>
        </div>

        {/* 4 Key Metrics Strip */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div className="text-xs text-slate-500 dark:text-slate-400">Skor Akurasi Total</div>
            <div className="mt-1 text-2xl sm:text-3xl font-bold font-mono tabular-nums text-teal-700 dark:text-teal-400">
              {analytics.overallScore}
              <span className="text-sm font-normal text-slate-500 dark:text-slate-400"> / 100</span>
            </div>
            <div className="mt-1 text-xs font-medium text-slate-700 dark:text-slate-300">
              Kategori: {performanceLabel}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div className="text-xs text-slate-500 dark:text-slate-400">Jawaban Benar</div>
            <div className="mt-1 text-2xl sm:text-3xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
              {analytics.totalCorrect}
              <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                {' '}
                / {analytics.totalQuestions}
              </span>
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {analytics.totalAnswered} soal terisi
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div className="text-xs text-slate-500 dark:text-slate-400">Durasi Pengerjaan</div>
            <div className="mt-1 text-2xl sm:text-3xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
              {formatDuration(totalElapsedSeconds)}
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Menit : Detik
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div className="text-xs text-slate-500 dark:text-slate-400">Bakat Terkuat</div>
            <div className="mt-1 text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 truncate">
              {analytics.topClusters[0]?.cluster || '-'}
            </div>
            <div className="mt-1 text-xs font-mono tabular-nums text-teal-700 dark:text-teal-400">
              Ketepatan {analytics.topClusters[0]?.percentage ?? 0}%
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <AnalyticsCharts
        subtesScores={analytics.subtesScores}
        clusterScores={analytics.clusterScores}
      />

      {/* Official Disclaimer Box (Bab VI) */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900 p-4 flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
        <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Catatan Pedoman ABM (Bab I &amp; Bab VI): </span>
          Hasil Asesmen Bakat Murid hanya bermakna bila peserta serius dalam menjawab pertanyaan, serta bukan satu-satunya dasar dalam menentukan pilihan akademik, program studi, atau pekerjaan.
        </div>
      </div>

      {/* Detailed Answer Review & Explanations */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Pembahasan &amp; Kunci Jawaban
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Tinjau setiap butir soal beserta alasan jawabannya untuk evaluasi mandiri.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setReviewFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                reviewFilter === 'all'
                  ? 'bg-teal-700 text-white dark:bg-teal-600'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              Semua ({activeQuestionsAll.length})
            </button>
            <button
              type="button"
              onClick={() => setReviewFilter('wrong')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                reviewFilter === 'wrong'
                  ? 'bg-teal-700 text-white dark:bg-teal-600'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              Belum Tepat ({analytics.totalQuestions - analytics.totalCorrect})
            </button>
            <select
              value={typeof reviewFilter === 'number' ? reviewFilter : ''}
              onChange={(e) =>
                setReviewFilter(e.target.value ? Number(e.target.value) : 'all')
              }
              aria-label="Filter pembahasan berdasarkan subtes"
              className="px-3 py-1.5 rounded-lg text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              <option value="">Filter Subtes...</option>
              {orderedSubtes.map((s) => (
                <option key={s.id} value={s.id}>
                  Subtes {s.id}: {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredReviewQuestions.length === 0 ? (
            <p className="py-6 text-sm text-center text-slate-500 dark:text-slate-400">
              Tidak ada soal pada kategori filter ini — semua jawaban sudah tepat!
            </p>
          ) : (
            filteredReviewQuestions.map((q) => {
              const subInfo = SUBTES_LIST.find((s) => s.id === q.subtesId);
              const userChoice = answers[q.id];
              const isCorrect = userChoice === q.correctIndex;
              const correctOpt = q.options[q.correctIndex];
              const userOpt = userChoice !== undefined ? q.options[userChoice] : null;

              return (
                <div key={q.id} className="py-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                      Subtes {q.subtesId} · {subInfo?.name}
                    </span>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        Benar
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 dark:text-rose-400">
                        <XCircle className="w-4 h-4" />
                        {userChoice === undefined ? 'Tidak Dijawab' : 'Kurang Tepat'}
                      </span>
                    )}
                  </div>

                  {q.diagramId && (
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 inline-block">
                      <SvgDiagram id={q.diagramId} />
                    </div>
                  )}

                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 whitespace-pre-line">
                    {q.prompt}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <span className="text-slate-500 dark:text-slate-400 block mb-1">
                        Jawaban Anda:
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {userOpt
                          ? `${String.fromCharCode(65 + (userChoice ?? 0))}. ${userOpt.text}`
                          : 'Belum memilih'}
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
                      <span className="text-emerald-700 dark:text-emerald-400 block mb-1">
                        Kunci Jawaban:
                      </span>
                      <span className="font-semibold text-emerald-900 dark:text-emerald-200">
                        {String.fromCharCode(65 + q.correctIndex)}. {correctOpt.text}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Pembahasan:{' '}
                    </span>
                    {q.explanation}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
