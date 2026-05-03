import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSuratList, useSuratDetail } from '../hooks/useQuran';
import { JuzFilterModal } from './JuzFilterModal';

interface HafalanViewProps {
    onBack: () => void;
}

// Complete mapping of surah numbers to all juz they contain
const SURAH_JUZ_MAPPING: Record<number, number[]> = {
    1: [1], 2: [1, 2, 3], 3: [3, 4], 4: [4, 5, 6], 5: [6, 7], 6: [7, 8], 7: [8, 9], 8: [9, 10],
    9: [10, 11], 10: [11], 11: [11, 12], 12: [12, 13], 13: [13], 14: [13], 15: [14], 16: [14],
    17: [15], 18: [15, 16], 19: [16], 20: [16], 21: [17], 22: [17], 23: [18], 24: [18],
    25: [18, 19], 26: [19], 27: [19, 20], 28: [20], 29: [20, 21], 30: [21], 31: [21], 32: [21],
    33: [21, 22], 34: [22], 35: [22], 36: [22, 23], 37: [23], 38: [23], 39: [23, 24], 40: [24],
    41: [24, 25], 42: [25], 43: [25], 44: [25], 45: [25], 46: [26], 47: [26], 48: [26],
    49: [26], 50: [26], 51: [26, 27], 52: [27], 53: [27], 54: [27], 55: [27], 56: [27], 57: [27],
    58: [28], 59: [28], 60: [28], 61: [28], 62: [28], 63: [28], 64: [28], 65: [28], 66: [28],
    67: [29], 68: [29], 69: [29], 70: [29], 71: [29], 72: [29], 73: [29], 74: [29], 75: [29],
    76: [29], 77: [29], 78: [30], 79: [30], 80: [30], 81: [30], 82: [30], 83: [30], 84: [30],
    85: [30], 86: [30], 87: [30], 88: [30], 89: [30], 90: [30], 91: [30], 92: [30], 93: [30],
    94: [30], 95: [30], 96: [30], 97: [30], 98: [30], 99: [30], 100: [30], 101: [30], 102: [30],
    103: [30], 104: [30], 105: [30], 106: [30], 107: [30], 108: [30], 109: [30], 110: [30],
    111: [30], 112: [30], 113: [30], 114: [30],
};

const isSurahInJuz = (surahNumber: number, juz: number): boolean => {
    const juzList = SURAH_JUZ_MAPPING[surahNumber];
    return juzList ? juzList.includes(juz) : false;
};

// Helper function to get first word of Arabic text
const getFirstWord = (text: string): string => {
    const words = text.split(' ');
    return words[0] || '';
};

// Helper function to get remaining words after first
const getRemainingWords = (text: string): string => {
    const words = text.split(' ');
    if (words.length <= 1) return '';
    return words.slice(1).join(' ');
};

// ==================== Surah Detail View with API ====================
const SurahDetailView: React.FC<{
    suratNomor: number;
    onBack: () => void;
}> = ({ suratNomor, onBack }) => {
    const { surat, loading, error } = useSuratDetail(suratNomor);
    const [revealedVerses, setRevealedVerses] = useState<Set<number>>(new Set());

    // Reset state when surat changes
    useEffect(() => {
        setRevealedVerses(new Set());
    }, [suratNomor]);

    const toggleVerse = (verseNumber: number) => {
        const newRevealed = new Set(revealedVerses);
        if (newRevealed.has(verseNumber)) {
            newRevealed.delete(verseNumber);
        } else {
            newRevealed.add(verseNumber);
        }
        setRevealedVerses(newRevealed);
    };

    // Loading state - tampilkan loading jika sedang loading ATAU surat belum ada (dan tidak ada error)
    if (loading || (!surat && !error)) {
        return (
            <div className="flex flex-col h-full bg-slate-50">
                <div className="flex-none bg-gradient-to-r from-teal-600 to-cyan-500 z-20 px-4 py-4 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="p-2 -ml-2 rounded-full hover:bg-white/20 text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <div className="flex-1">
                            <h2 className="font-bold text-white text-lg">Memuat...</h2>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                </div>
            </div>
        );
    }

    // DEBUG: Log error ke console, tidak tampilkan UI error
    if (error) {
        console.log('SurahDetailView Error:', error);
    }

    // Jika surat masih null, tetap tampilkan loading
    if (!surat) {
        return (
            <div className="flex flex-col h-full bg-slate-50">
                <div className="flex-none bg-gradient-to-r from-teal-600 to-cyan-500 z-20 px-4 py-4 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="p-2 -ml-2 rounded-full hover:bg-white/20 text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <div className="flex-1">
                            <h2 className="font-bold text-white text-lg">Memuat...</h2>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Header */}
            <div className="flex-none bg-gradient-to-r from-teal-600 to-cyan-500 z-20 px-4 py-4 shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 -ml-2 rounded-full hover:bg-white/20 text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <div className="flex-1">
                        <h2 className="font-bold text-white text-lg">{surat.namaLatin}</h2>
                        <p className="text-xs text-white/70">{surat.jumlahAyat} Ayat • {surat.tempatTurun}</p>
                    </div>
                    <span className="font-arabic text-2xl text-white" dir="rtl">{surat.nama}</span>
                </div>
            </div>

            {/* Verses */}
            <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
                {/* Bismillah for non-Fatihah and non-At-Taubah */}
                {surat.nomor !== 1 && surat.nomor !== 9 && (
                    <div className="text-center py-4 mb-4">
                        <p className="font-arabic text-2xl text-primary-600" dir="rtl">
                            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                        </p>
                    </div>
                )}

                <div className="space-y-3">
                    {surat.ayat.map((ayat) => {
                        const isRevealed = revealedVerses.has(ayat.nomorAyat);
                        const firstWord = getFirstWord(ayat.teksArab);
                        const remainingWords = getRemainingWords(ayat.teksArab);
                        const hasRemaining = remainingWords.length > 0;

                        return (
                            <button
                                key={ayat.nomorAyat}
                                onClick={() => toggleVerse(ayat.nomorAyat)}
                                className={`w-full text-right bg-white rounded-2xl p-4 shadow-sm border transition-all duration-300 ${isRevealed
                                    ? 'border-primary-200 bg-primary-50/50'
                                    : 'border-slate-100 hover:border-primary-100'
                                    }`}
                                dir="rtl"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex-1">
                                        <p className="font-arabic text-2xl leading-loose text-slate-800">
                                            {/* First word - always visible */}
                                            <span>{firstWord}</span>

                                            {/* Remaining words - blurred or visible */}
                                            {hasRemaining && (
                                                <>
                                                    <span> </span>
                                                    <span
                                                        className={`transition-all duration-300 ${isRevealed
                                                            ? 'blur-none opacity-100'
                                                            : 'blur-sm opacity-50 select-none'
                                                            }`}
                                                    >
                                                        {remainingWords}
                                                    </span>
                                                </>
                                            )}
                                        </p>
                                    </div>

                                    {/* Verse Number */}
                                    <span className={`flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold font-sans transition-colors ${isRevealed
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-primary-100 text-primary-600'
                                        }`} dir="ltr">
                                        {ayat.nomorAyat}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// ==================== Main HafalanView Component ====================
export const HafalanView: React.FC<HafalanViewProps> = ({ onBack }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const selectedSuratNomor = id ? parseInt(id, 10) : null;

    const { suratList, loading, error } = useSuratList();
    const [selectedJuz, setSelectedJuz] = useState<number | null>(null);
    const [isJuzModalOpen, setIsJuzModalOpen] = useState(false);

    // Filter surahs based on Juz
    const filteredSurahs = suratList.filter(surat => {
        return selectedJuz === null || isSurahInJuz(surat.nomor, selectedJuz);
    });

    // Surah Detail View
    if (selectedSuratNomor !== null) {
        return (
            <SurahDetailView
                suratNomor={selectedSuratNomor}
                onBack={() => navigate('/murajaah/hafalan')}
            />
        );
    }

    // Loading state - juga tampilkan loading jika data masih kosong dan tidak ada error
    if (loading || (suratList.length === 0 && !error)) {
        return (
            <div className="flex flex-col h-full bg-slate-50">
                <div className="flex-none bg-gradient-to-r from-teal-600 to-cyan-500 z-20 px-4 py-4 shadow-sm flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 -ml-2 rounded-full hover:bg-white/20 text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <div>
                        <h2 className="font-bold text-white text-lg">Murajaah Hafalan</h2>
                        <p className="text-xs text-white/70">Memuat daftar surat...</p>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto mb-3"></div>
                        <p className="text-slate-500">Mengambil data dari API...</p>
                    </div>
                </div>
            </div>
        );
    }

    // DEBUG: Log error ke console, tidak tampilkan UI error
    if (error) {
        console.log('HafalanView List Error:', error);
    }

    // Surah List View
    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Header */}
            <div className="flex-none bg-gradient-to-r from-teal-600 to-cyan-500 z-20 px-4 py-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="p-2 -ml-2 rounded-full hover:bg-white/20 text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <div>
                            <h2 className="font-bold text-white text-lg">Murajaah Hafalan</h2>
                            <p className="text-xs text-white/70">
                                {selectedJuz === null ? '114 Surat Al-Quran' : `Juz ${selectedJuz} • ${filteredSurahs.length} Surat`}
                            </p>
                        </div>
                    </div>
                    {/* Filter Button */}
                    <button
                        onClick={() => setIsJuzModalOpen(true)}
                        className="p-2 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Juz Filter Modal */}
            <JuzFilterModal
                isOpen={isJuzModalOpen}
                onClose={() => setIsJuzModalOpen(false)}
                currentSelectedJuz={selectedJuz}
                onSave={setSelectedJuz}
            />

            {/* Surah List */}
            <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-3">
                {filteredSurahs.map((surat) => (
                    <button
                        key={surat.nomor}
                        onClick={() => navigate(`/murajaah/hafalan/${surat.nomor}`)}
                        className="w-full text-left group bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-primary-100 transition-all duration-200"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {/* Number Badge */}
                                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary-50 text-primary-600 font-semibold text-sm">
                                    {surat.nomor}
                                </div>

                                {/* Info */}
                                <div>
                                    <h3 className="font-semibold text-slate-800 text-base">{surat.namaLatin}</h3>
                                    <p className="text-xs text-slate-500">{surat.jumlahAyat} Ayat • {surat.tempatTurun}</p>
                                </div>
                            </div>

                            {/* Arabic Name */}
                            <div className="flex items-center gap-3">
                                <span className="font-arabic text-xl text-slate-700" dir="rtl">{surat.nama}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-300 group-hover:text-primary-500 transition-colors">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
