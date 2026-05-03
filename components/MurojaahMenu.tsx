import React from 'react';
import { QuizMode, QuizType } from '../types';

type MenuMode = QuizMode | 'HAFALAN' | 'TEBAK_AYAT';

interface MurojaahMenuProps {
  onSelectMode: (mode: MenuMode) => void;
}

export const MurojaahMenu: React.FC<MurojaahMenuProps> = ({ onSelectMode }) => {
  const menuItems: { mode: MenuMode; title: string; subtitle: string; icon: React.ReactNode; iconBg: string }[] = [
    {
      mode: 'HAFALAN',
      title: 'Murajaah Hafalan Surat',
      subtitle: 'Baca dan ulang hafalan surat',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      iconBg: 'bg-primary-100',
    },
    {
      mode: 'TEBAK_AYAT',
      title: 'Murajaah Tebak Ayat',
      subtitle: 'Dengarkan audio & tebak suratnya (Juz 30)',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-violet-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
        </svg>
      ),
      iconBg: 'bg-violet-100',
    },
    {
      mode: 'RANDOM' as QuizMode,
      title: 'Murajaah Random',
      subtitle: 'Semua jenis pertanyaan acak',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-fuchsia-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
        </svg>
      ),
      iconBg: 'bg-fuchsia-100',
    },
    {
      mode: QuizType.NUMBER,
      title: 'Murajaah Nomor',
      subtitle: 'Tebak urutan nomor surat',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
        </svg>
      ),
      iconBg: 'bg-indigo-100',
    },
    {
      mode: QuizType.MEANING,
      title: 'Murajaah Arti',
      subtitle: 'Tebak arti nama surat',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-emerald-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
      iconBg: 'bg-emerald-100',
    },
    {
      mode: QuizType.AYAH_COUNT,
      title: 'Murajaah Jumlah Ayat',
      subtitle: 'Tebak jumlah ayat',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-amber-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>
      ),
      iconBg: 'bg-amber-100',
    },
    {
      mode: QuizType.JUZ,
      title: 'Murajaah Juz',
      subtitle: 'Tebak juz berapa',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-rose-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      iconBg: 'bg-rose-100',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-white">Murajaah</h1>
        <p className="text-white/70 mt-1">Pilih kategori untuk memulai latihan hafalan.</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 pb-24 space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.title}
            id={`menu-${String(item.mode).toLowerCase()}`}
            onClick={() => onSelectMode(item.mode)}
            className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md hover:border-slate-200 transition-all active:scale-[0.98] group text-left"
          >
            <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${item.iconBg}`}>
              {item.icon}
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-lg">{item.title}</h3>
              <p className="text-sm text-slate-400 group-hover:text-slate-500 transition-colors">{item.subtitle}</p>
            </div>
            <div className="ml-auto text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};