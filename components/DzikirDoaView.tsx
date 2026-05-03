import React from 'react';
import { useNavigate } from 'react-router-dom';

// Sun Icon for Dzikir Pagi
const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
);

// Moon Icon for Dzikir Petang
const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);

// Hands Praying Icon for Doa
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

export const DzikirDoaView: React.FC = () => {
    const navigate = useNavigate();

    const menuItems = [
        {
            title: 'Dzikir Pagi',
            subtitle: 'Setelah Shubuh hingga Syuruq',
            path: '/dzikir/pagi',
            icon: <SunIcon className="w-9 h-9 text-amber-600" />,
            iconBg: 'bg-amber-100',
        },
        {
            title: 'Dzikir Petang',
            subtitle: 'Setelah Ashar hingga Maghrib',
            path: '/dzikir/petang',
            icon: <MoonIcon className="w-9 h-9 text-indigo-600" />,
            iconBg: 'bg-indigo-100',
        },
        {
            title: 'Doa Harian',
            subtitle: 'Kumpulan doa sahih harian',
            path: '/doa',
            icon: <HandsIcon className="w-9 h-9 text-teal-600" />,
            iconBg: 'bg-teal-100',
        }
    ];

    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Header */}
            <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-6 py-4 shadow-sm">
                <h1 className="text-2xl font-bold text-white">Dzikir & Doa</h1>
                <p className="text-white/70 mt-1">Amalan harian untuk keberkahan hari Anda</p>
            </div>

            {/* Menu List */}
            <div className="flex-1 overflow-y-auto px-6 py-6 pb-24 space-y-4">
                {menuItems.map((item) => (
                    <button
                        key={item.title}
                        onClick={() => navigate(item.path)}
                        className="w-full bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all active:scale-[0.98] group text-left"
                    >
                        <div className={`w-16 h-16 rounded-2xl ${item.iconBg} flex items-center justify-center`}>
                            {item.icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-800 text-xl">{item.title}</h3>
                            <p className="text-sm text-slate-500 mt-1">{item.subtitle}</p>
                        </div>
                        <div className="text-slate-300 group-hover:text-slate-400 transition-colors">
                            <ChevronRightIcon className="w-6 h-6" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
