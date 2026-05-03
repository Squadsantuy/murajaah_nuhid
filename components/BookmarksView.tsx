import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookmarks } from '../hooks/useBookmarks';

export const BookmarksView: React.FC = () => {
    const navigate = useNavigate();
    const { bookmarks, removeBookmark } = useBookmarks();

    const handleGoToAyat = (surahNo: number, ayatNo: number) => {
        navigate(`/surat/${surahNo}`, { state: { targetAyat: ayatNo } });
    };

    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Header */}
            <div className="flex-none bg-white z-20 px-6 py-4 shadow-sm border-b border-slate-100 flex items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </button>
                <div>
                    <h1 className="text-xl font-bold text-slate-800">Bacaan Terakhir</h1>
                    <p className="text-slate-400 text-xs">Lanjutkan bacaan terakhir Anda</p>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6 pb-24">
                {bookmarks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                            </svg>
                        </div>
                        <p>Belum ada bacaan yang ditandai</p>
                        <p className="text-xs mt-1">Gunakan ikon bookmark untuk menandai posisi terakhir</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookmarks.map((bookmark) => (
                            <div
                                key={bookmark.id}
                                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group animate-in fade-in slide-in-from-bottom-2 duration-300"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100 shadow-sm">
                                            {bookmark.surahName} • {bookmark.ayatNo}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeBookmark(bookmark.id)}
                                        className="p-2 text-slate-300 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                                        title="Hapus Bookmark"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div
                                    className="cursor-pointer"
                                    onClick={() => handleGoToAyat(bookmark.surahNo, bookmark.ayatNo)}
                                >
                                    <p className="font-arabic text-xl leading-relaxed text-slate-800 text-right mb-3" dir="rtl">
                                        {bookmark.arabicText}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-slate-400">
                                        <span>Disimpan pada {new Date(bookmark.timestamp).toLocaleDateString('id-ID')}</span>
                                        <div className="flex items-center gap-1 text-primary-600 font-medium group-hover:translate-x-1 transition-transform">
                                            Buka Surat
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
