import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Doa, fetchAllDoa, searchDoa } from '../services/doaService';

// Search Icon
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

// Back Icon
const BackIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
);

// Hands Praying Icon
const HandsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
    </svg>
);

// Chevron Right Icon
const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

// Clear Icon
const ClearIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// Loading Spinner
const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center py-12">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500">Memuat doa...</p>
    </div>
);

// Error State
const ErrorState: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
    <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
        </div>
        <p className="text-slate-600 text-center mb-4">Gagal memuat data doa. Pastikan koneksi internet Anda aktif.</p>
        <button
            onClick={onRetry}
            className="px-6 py-2 bg-primary-500 text-white rounded-full font-medium hover:bg-primary-600 transition-colors"
        >
            Coba Lagi
        </button>
    </div>
);

// Chevron Down Icon
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

// Doa Detail View
const DoaDetailView: React.FC<{
    doa: Doa;
    onBack: () => void;
}> = ({ doa, onBack }) => {
    const [isDalilExpanded, setIsDalilExpanded] = useState(false);

    // Function to clean dalil text by removing URLs
    const cleanDalilText = (text: string): string => {
        if (!text) return '';
        // Remove URLs (http, https, www patterns)
        return text
            .replace(/https?:\/\/[^\s]+/g, '') // Remove http:// and https:// URLs
            .replace(/www\.[^\s]+/g, '')       // Remove www. URLs
            .replace(/Sumber:\s*$/gm, '')      // Remove "Sumber:" if it's left alone on a line
            .replace(/\n{3,}/g, '\n\n')        // Clean up multiple newlines
            .trim();
    };

    // Check if dalil text is long enough to need truncation
    const dalilText = cleanDalilText(doa.tentang || '');
    const isLongDalil = dalilText.length > 150;

    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Header */}
            <div className="flex-none bg-gradient-to-r from-teal-600 to-emerald-500 z-20 px-4 py-4 shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 -ml-2 rounded-full hover:bg-white/20 text-white transition-colors"
                    >
                        <BackIcon className="w-5 h-5" />
                    </button>
                    <div className="flex-1 min-w-0">
                        <h2 className="font-bold text-white text-lg truncate">{doa.nama}</h2>
                        <p className="text-xs text-white/70 truncate">{doa.grup}</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-4">
                {/* Grup Badge */}
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-700">
                        {doa.grup}
                    </span>
                </div>

                {/* Nama Doa */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                    <h3 className="text-lg font-bold text-slate-800">{doa.nama}</h3>
                </div>

                {/* Arabic Text */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border border-slate-100 p-5">
                    <p className="font-arabic text-2xl text-slate-800 leading-loose text-right" dir="rtl">
                        {doa.ar}
                    </p>
                </div>

                {/* Translation / Arti */}
                <div className="bg-blue-50 rounded-2xl border border-blue-100 p-4">
                    <p className="text-xs font-semibold text-blue-600 mb-2">Arti:</p>
                    <p className="text-sm text-blue-800 leading-relaxed">
                        {doa.idn}
                    </p>
                </div>

                {/* Tentang / Dalil - Collapsible */}
                {dalilText && (
                    <div className="bg-emerald-50 rounded-2xl border border-emerald-100 overflow-hidden">
                        <button
                            onClick={() => setIsDalilExpanded(!isDalilExpanded)}
                            className="w-full p-4 text-left"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                    <p className="text-xs font-semibold text-emerald-600 mb-2">Tentang / Dalil:</p>
                                    <p className={`text-sm text-emerald-800 leading-relaxed whitespace-pre-line ${!isDalilExpanded && isLongDalil ? 'line-clamp-3' : ''}`}>
                                        {dalilText}
                                    </p>
                                </div>
                                {isLongDalil && (
                                    <div className={`flex-shrink-0 text-emerald-500 transition-transform duration-200 ${isDalilExpanded ? 'rotate-180' : ''}`}>
                                        <ChevronDownIcon className="w-5 h-5" />
                                    </div>
                                )}
                            </div>
                        </button>
                        {isLongDalil && !isDalilExpanded && (
                            <div className="px-4 pb-3 -mt-1">
                                <span className="text-xs text-emerald-600 font-medium">Ketuk untuk baca selengkapnya...</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Tags */}
                {doa.tag && doa.tag.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {doa.tag.map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-600"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


// Doa List Item
const DoaListItem: React.FC<{
    doa: Doa;
    onClick: () => void;
}> = ({ doa, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-start gap-3 hover:shadow-md hover:border-slate-200 transition-all active:scale-[0.99] group text-left"
        >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                {doa.id}
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-800 text-base truncate group-hover:text-teal-600 transition-colors">
                    {doa.nama}
                </h3>
                <p className="text-xs text-slate-400 truncate mt-0.5">{doa.grup}</p>
            </div>
            <div className="text-slate-300 group-hover:text-teal-400 transition-colors self-center">
                <ChevronRightIcon className="w-5 h-5" />
            </div>
        </button>
    );
};

// Main DoaView Component
export const DoaView: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [allDoa, setAllDoa] = useState<Doa[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const selectedDoa = useMemo(() => {
        if (!id || allDoa.length === 0) return null;
        return allDoa.find(doa => doa.id.toString() === id) || null;
    }, [id, allDoa]);

    const loadDoa = async () => {
        setLoading(true);
        setError(false);
        try {
            const data = await fetchAllDoa();
            setAllDoa(data);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDoa();
    }, []);

    // Filter doa based on search query
    const filteredDoa = useMemo(() => {
        return searchDoa(allDoa, searchQuery);
    }, [allDoa, searchQuery]);

    // If a doa is selected, show detail view
    if (selectedDoa) {
        return (
            <DoaDetailView
                doa={selectedDoa}
                onBack={() => navigate('/dzikir-doa')}
            />
        );
    }

    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Header */}
            <div className="flex-none bg-gradient-to-r from-teal-600 to-emerald-500 z-20 px-6 py-4 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                    <HandsIcon className="w-7 h-7 text-white" />
                    <h1 className="text-2xl font-bold text-white">Doa</h1>
                </div>
                <p className="text-white/70 text-sm mb-4">Kumpulan doa-doa harian</p>

                {/* Search Bar */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari doa..."
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/95 backdrop-blur text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-sm"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
                        >
                            <ClearIcon className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
                {loading && <LoadingSpinner />}

                {error && !loading && <ErrorState onRetry={loadDoa} />}

                {!loading && !error && (
                    <>
                        {/* Results Count */}
                        <div className="mb-3 flex items-center justify-between">
                            <p className="text-sm text-slate-500">
                                {searchQuery
                                    ? `${filteredDoa.length} hasil untuk "${searchQuery}"`
                                    : `${allDoa.length} doa tersedia`
                                }
                            </p>
                        </div>

                        {/* Doa List */}
                        {filteredDoa.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                    <SearchIcon className="w-8 h-8 text-slate-400" />
                                </div>
                                <p className="text-slate-500 text-center">Tidak ada doa yang ditemukan</p>
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="mt-3 text-teal-600 font-medium hover:underline"
                                >
                                    Hapus pencarian
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {filteredDoa.map((doa) => (
                                    <DoaListItem
                                        key={doa.id}
                                        doa={doa}
                                        onClick={() => navigate(`/doa/${doa.id}`)}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
