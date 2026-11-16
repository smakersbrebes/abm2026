/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Menu, Moon, Search, Sun, X } from 'lucide-react';
import { DocView } from './components/DocView';
import { PracticeSimulator } from './components/PracticeSimulator';

type AppView = 'docs' | 'practice';

export default function App() {
  const [view, setView] = useState<AppView>('docs');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPracticeSubtes, setSelectedPracticeSubtes] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  // Sync dark mode class on <html>
  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('abm-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('abm-theme', 'light');
      }
      return next;
    });
  };

  // Keyboard shortcut Ctrl+K or '/' for instant search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setView('docs');
        setTimeout(() => searchInputRef.current?.focus(), 40);
      } else if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        setView('docs');
        setTimeout(() => searchInputRef.current?.focus(), 40);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateToDocSection = (sectionId: string) => {
    setView('docs');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const handleStartPractice = (subtesId?: number) => {
    setSelectedPracticeSubtes(subtesId ?? null);
    setView('practice');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-150">
      {/* Top Bar: 3-Zone Contract (Brand — 4 concise links — 1 primary CTA) */}
      <header className="sticky top-0 z-40 h-14 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setView('docs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 whitespace-nowrap shrink-0"
          >
            Pedoman ABM 2026
          </a>

          {/* Zone 2: 4 single-line navigation links */}
          <nav
            aria-label="Navigasi utama"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400"
          >
            <button
              type="button"
              onClick={() => navigateToDocSection('bab-1')}
              className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Panduan
            </button>
            <button
              type="button"
              onClick={() => navigateToDocSection('bab-4')}
              className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Jadwal
            </button>
            <button
              type="button"
              onClick={() => navigateToDocSection('lampiran-4')}
              className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              14 Subtes
            </button>
            <button
              type="button"
              onClick={() => navigateToDocSection('lampiran-1')}
              className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Lampiran
            </button>
          </nav>

          {/* Zone 3: 1 primary CTA + mobile menu toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() =>
                view === 'docs' ? handleStartPractice() : setView('docs')
              }
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {view === 'docs' ? 'Latihan ABM' : 'Buka Panduan'}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Buka menu navigasi"
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-1">
            {[
              { id: 'bab-1', label: 'Panduan Umum & Peserta' },
              { id: 'bab-4', label: 'Jadwal & Pelaksanaan' },
              { id: 'lampiran-4', label: 'Informasi 14 Subtes' },
              { id: 'lampiran-1', label: 'Tata Tertib & Perangkat' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateToDocSection(item.id)}
                className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Workspace Utility Bar (Instant Search, View Switch, Dark Mode) */}
      <div className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Instant Search Input */}
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (view !== 'docs') setView('docs');
              }}
              placeholder="Cari instan: jadwal, NISN, Android, koneksi, subtes... (Tekan /)"
              aria-label="Pencarian instan pedoman ABM 2026"
              className="w-full pl-10 pr-9 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Hapus kata pencarian"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Controls: Mode Switch & Dark Mode Toggle */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <div
              role="tablist"
              aria-label="Mode tampilan"
              className="inline-flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-800"
            >
              <button
                type="button"
                role="tab"
                aria-selected={view === 'docs'}
                onClick={() => setView('docs')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  view === 'docs'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Dokumentasi
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={view === 'practice'}
                onClick={() => setView('practice')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  view === 'practice'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Latihan 14 Subtes
              </button>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Mode Terang</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-600" />
                  <span>Mode Gelap</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main id="top" className="flex-1">
        {view === 'docs' ? (
          <DocView
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onStartPractice={handleStartPractice}
          />
        ) : (
          <PracticeSimulator
            initialSubtesId={selectedPracticeSubtes}
            onClearInitialSubtes={() => setSelectedPracticeSubtes(null)}
            onBackToDocs={() => setView('docs')}
          />
        )}
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            Referensi Resmi: Pedoman Pelaksanaan Asesmen Bakat Murid (ABM) Tahun 2026 — BPPP &amp; Pusmendik Kemendikdasmen.
          </div>
          <div className="flex items-center gap-5 shrink-0">
            <a
              href={`${import.meta.env.BASE_URL}assets/aistudio/PEDOMAN_PELAKSANAAN_ABM_2026_Revisi_1dd73a01.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-slate-200 underline"
            >
              Unduh PDF Pedoman
            </a>
            <button
              type="button"
              onClick={() => handleStartPractice()}
              className="hover:text-slate-900 dark:hover:text-slate-200 underline cursor-pointer"
            >
              Simulasi Latihan 14 Subtes
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
