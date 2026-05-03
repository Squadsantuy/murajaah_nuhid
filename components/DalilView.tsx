import React, { useState } from 'react';
import { DALIL_DATA, SURAH_DATA } from '../constants';
import { DalilTopic } from '../types';

export const DalilView: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<DalilTopic | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Helper to find surah details
  const getSurahDetails = (surahNumber: number) => {
    return SURAH_DATA.find(s => s.number === surahNumber);
  };

  const filteredTopics = DALIL_DATA.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedTopic) {
    return (
      <div className="flex flex-col h-full bg-slate-50">
        {/* Header Detail */}
        <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-4 py-4 shadow-sm flex items-center gap-4">
          <button
            onClick={() => setSelectedTopic(null)}
            className="p-2 -ml-2 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div>
            <h2 className="font-bold text-white text-lg">Dalil {selectedTopic.title}</h2>
            <p className="text-xs text-white/70">Kumpulan Ayat Al-Quran</p>
          </div>
        </div>

        {/* List of Verses */}
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-3">
          {selectedTopic.verses.map((verse, index) => {
            const surah = getSurahDetails(verse.surahNumber);

            return (
              <div key={index} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm ${selectedTopic.color}`}>
                      {verse.surahNumber}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">
                        {surah ? surah.latin : `Surat #${verse.surahNumber}`}
                      </h3>
                      <p className="text-xs text-slate-500">Ayat {verse.ayah}</p>
                    </div>
                  </div>
                  {surah && (
                    <span className="font-arabic text-xl text-primary-600">{surah.name}</span>
                  )}
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    "{verse.description}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Main Menu View
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-white">Kamus Dalil</h1>
        <p className="text-white/70 mt-1">Temukan ayat Al-Quran berdasarkan tema.</p>

        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Cari tema dalil..."
            className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/60 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 pb-24 space-y-4">
        {filteredTopics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopic(topic)}
            className="w-full bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md hover:border-slate-200 transition-all active:scale-[0.98] group text-left"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm text-white ${topic.color}`}>
              {/* Simple Book/Lamp Icon for all, or custom */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 text-lg">{topic.title}</h3>
              <p className="text-sm text-slate-400 group-hover:text-slate-500 transition-colors line-clamp-1">
                {topic.description}
              </p>
            </div>
            <div className="text-slate-300">
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