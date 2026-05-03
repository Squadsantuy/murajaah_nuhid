import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DZIKIR_PAGI, DZIKIR_PETANG, DzikirData, DzikirItem } from '../dzikirData';

// Sun Icon for Pagi
const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
);

// Moon Icon for Petang
const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);

// Info Icon for collapse button
const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
);

// Back Icon
const BackIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
);

// Chevron Right Icon
const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

// Dzikir Card Component
const DzikirCard: React.FC<{ item: DzikirItem; index: number; colorClass: string }> = ({ item, index, colorClass }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Main Card Content */}
            <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm ${colorClass}`}>
                            {index + 1}
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-800 text-base">{item.title}</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                    {item.count}x
                                </span>
                                {item.note && (
                                    <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                                        {item.note}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Info Button */}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={`p-2 rounded-full transition-all ${isExpanded
                            ? 'bg-primary-100 text-primary-600'
                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                            }`}
                    >
                        <InfoIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Arabic Text */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 p-4 rounded-xl border border-slate-100">
                    <p className="font-arabic text-2xl text-slate-800 leading-loose text-right" dir="rtl">
                        {item.arabic}
                    </p>
                </div>
            </div>

            {/* Collapsible Content */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 pb-4 space-y-3">
                    {/* Translation */}
                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                        <p className="text-xs font-semibold text-blue-600 mb-1">Arti:</p>
                        <p className="text-sm text-blue-800 leading-relaxed">
                            {item.translation}
                        </p>
                    </div>

                    {/* Dalil */}
                    <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                        <p className="text-xs font-semibold text-emerald-600 mb-1">Dalil:</p>
                        <p className="text-sm text-emerald-800 leading-relaxed">
                            {item.faedah}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Detail View
const DzikirDetailView: React.FC<{
    data: DzikirData;
    onBack: () => void;
}> = ({ data, onBack }) => {
    const isPagi = data.type === 'pagi';
    const colorClass = isPagi ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-gradient-to-br from-indigo-500 to-purple-600';
    const headerGradient = isPagi
        ? 'from-amber-500 to-orange-500'
        : 'from-indigo-600 to-purple-600';

    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Header */}
            <div className={`flex-none bg-gradient-to-r ${headerGradient} z-20 px-4 py-4 shadow-sm`}>
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 -ml-2 rounded-full hover:bg-white/20 text-white transition-colors"
                    >
                        <BackIcon className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            {isPagi ? (
                                <SunIcon className="w-6 h-6 text-yellow-200" />
                            ) : (
                                <MoonIcon className="w-6 h-6 text-purple-200" />
                            )}
                            <h2 className="font-bold text-white text-lg">{data.title}</h2>
                        </div>
                        <p className="text-xs text-white/70 mt-0.5">{data.time}</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-3">
                {data.items.map((item, index) => (
                    <DzikirCard
                        key={item.id}
                        item={item}
                        index={index}
                        colorClass={colorClass}
                    />
                ))}
            </div>
        </div>
    );
};

// Main Menu View
export const DzikirView: React.FC = () => {
    const navigate = useNavigate();
    const { type } = useParams();

    const selectedDzikir = type === 'pagi' ? DZIKIR_PAGI : type === 'petang' ? DZIKIR_PETANG : null;

    if (selectedDzikir) {
        return (
            <DzikirDetailView
                data={selectedDzikir}
                onBack={() => navigate('/dzikir-doa')}
            />
        );
    }

    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Header */}
            <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-6 py-4 shadow-sm">
                <h1 className="text-2xl font-bold text-white">Dzikir</h1>
                <p className="text-white/70 mt-1">Kumpulan dzikir pagi dan petang</p>
            </div>

            {/* Menu */}
            <div className="flex-1 overflow-y-auto px-6 py-6 pb-24 space-y-4">
                {/* Dzikir Pagi Card */}
                <button
                    onClick={() => navigate('/dzikir/pagi')}
                    className="w-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 shadow-sm border border-amber-100 flex items-center gap-4 hover:shadow-md hover:border-amber-200 transition-all active:scale-[0.98] group text-left"
                >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-200">
                        <SunIcon className="w-9 h-9 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-slate-800 text-xl">Dzikir Pagi</h3>
                        <p className="text-sm text-slate-500 mt-1">
                            {DZIKIR_PAGI.items.length} dzikir • Setelah Shubuh
                        </p>
                        <p className="text-xs text-amber-600 mt-1">
                            Antara Shubuh hingga matahari bergeser ke barat
                        </p>
                    </div>
                    <div className="text-amber-400 group-hover:text-amber-500 transition-colors">
                        <ChevronRightIcon className="w-6 h-6" />
                    </div>
                </button>

                {/* Dzikir Petang Card */}
                <button
                    onClick={() => navigate('/dzikir/petang')}
                    className="w-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 shadow-sm border border-indigo-100 flex items-center gap-4 hover:shadow-md hover:border-indigo-200 transition-all active:scale-[0.98] group text-left"
                >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-200">
                        <MoonIcon className="w-9 h-9 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-slate-800 text-xl">Dzikir Petang</h3>
                        <p className="text-sm text-slate-500 mt-1">
                            {DZIKIR_PETANG.items.length} dzikir • Setelah Ashar/Maghrib
                        </p>
                        <p className="text-xs text-indigo-600 mt-1">
                            Dari Maghrib hingga pertengahan malam
                        </p>
                    </div>
                    <div className="text-indigo-400 group-hover:text-indigo-500 transition-colors">
                        <ChevronRightIcon className="w-6 h-6" />
                    </div>
                </button>
            </div>
        </div>
    );
};
