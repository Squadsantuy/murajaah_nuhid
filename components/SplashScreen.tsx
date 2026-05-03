import React from 'react';

interface SplashScreenProps {
    onStart: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-400 relative overflow-hidden fixed inset-0">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
            <div className="absolute top-1/4 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/2"></div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">
                {/* Icon/Logo */}
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-white tracking-tight mb-3">
                    MurajaahQu
                </h1>

                {/* Subheading */}
                <p className="text-white/80 text-center text-lg mb-2">
                    Aplikasi Latihan Hafalan Al-Quran
                </p>
                <p className="text-white/60 text-center text-sm max-w-xs mb-10">
                    Tingkatkan hafalan surat, nomor, arti, dan jumlah ayat dengan cara digital
                </p>

                {/* Start Button */}
                <button
                    onClick={onStart}
                    className="w-full max-w-xs py-4 bg-white text-primary-600 font-bold text-lg rounded-2xl shadow-lg shadow-primary-800/30 hover:bg-primary-50 active:scale-[0.98] transition-all mb-6"
                >
                    Mulai Murajaah
                </button>
            </div>

            {/* Animated Stars/Dots */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse delay-300"></div>
                <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white/25 rounded-full animate-pulse delay-500"></div>
                <div className="absolute top-1/4 right-1/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse delay-700"></div>
            </div>
        </div>
    );
};
