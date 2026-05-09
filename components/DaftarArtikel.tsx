import React from 'react';
import { useNavigate } from 'react-router-dom';
import artikelData from '../data/artikel.json'; // Sesuaikan path file json kamu

export const ArticleListView: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Header - Mengikuti desain InfoView */}
            <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-6 py-6 shadow-sm">
                <h1 className="text-2xl font-bold text-white">Daftar Artikel</h1>
                <p className="text-white/70 mt-1">Kumpulan bacaan bermanfaat untuk Murajaah</p>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
                <div className="space-y-4">
                    {artikelData.map((artikel, index) => (
      <div
    key={index}
    onClick={() => window.location.href = artikel.link} // Berpindah ke file .html
    className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-primary-200 transition-all active:scale-[0.98]"
>

                            <div className="flex items-center gap-4">
                                {/* Icon Box - Serupa dengan desain Features Card */}
                                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                    </svg>
                                </div>
                                
                                <div>
                                    <h3 className="text-slate-800 font-bold text-md leading-tight group-hover:text-primary-700 transition-colors">
                                        {artikel.judul}
                                    </h3>
                                    <p className="text-slate-400 text-xs mt-1">Baca selengkapnya...</p>
                                </div>
                            </div>

                            {/* Arrow Indicator - Serupa dengan Bookmark Card */}
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors text-slate-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-10 text-center">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">
                        Artikel MurajaahQu
                    </p>
                </div>
            </div>
        </div>
    );
};
