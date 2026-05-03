import React, { useState, useEffect, useMemo } from 'react';
import { Regency, PrayerSchedule, fetchRegencies, fetchDailyPrayerTime } from '../services/prayerTimeService';

const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const STORAGE_KEY_REGENCY = 'murajaahqu_regency';

export const PrayerTimeView: React.FC = () => {
    const [regency, setRegency] = useState<Regency | null>(() => {
        const saved = localStorage.getItem(STORAGE_KEY_REGENCY);
        return saved ? JSON.parse(saved) : null;
    });

    const [schedule, setSchedule] = useState<PrayerSchedule | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSelectingCity, setIsSelectingCity] = useState(false);
    const [regencies, setRegencies] = useState<Regency[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [now, setNow] = useState(new Date());

    // Update time every second for countdown
    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const [isRegenciesLoading, setIsRegenciesLoading] = useState(false);
    const [regencyError, setRegencyError] = useState<string | null>(null);

    // Load regencies for selection (also load when no regency is saved for new users)
    useEffect(() => {
        const shouldLoad = (isSelectingCity || !regency) && regencies.length === 0 && !isRegenciesLoading;
        if (shouldLoad) {
            setIsRegenciesLoading(true);
            setRegencyError(null);
            fetchRegencies()
                .then(data => {
                    if (data && data.length > 0) {
                        setRegencies(data);
                    } else {
                        setRegencyError('Gagal memuat daftar wilayah.');
                    }
                })
                .catch(() => setRegencyError('Terjadi kesalahan saat memuat wilayah.'))
                .finally(() => setIsRegenciesLoading(false));
        }
    }, [isSelectingCity, regencies.length, isRegenciesLoading]);

    // Load schedule when regency changes
    useEffect(() => {
        if (regency) {
            const loadSchedule = async () => {
                setLoading(true);
                setError(null);
                const today = new Date().toISOString().split('T')[0];
                const data = await fetchDailyPrayerTime(regency.code, today);
                if (data) {
                    setSchedule(data);
                    localStorage.setItem('murajaahqu_sholat_schedule', JSON.stringify(data));
                } else {
                    setError('Gagal memuat jadwal shalat.');
                }
                setLoading(false);
            };
            loadSchedule();
            localStorage.setItem(STORAGE_KEY_REGENCY, JSON.stringify(regency));
        }
    }, [regency]);

    const filteredRegencies = useMemo(() => {
        return regencies.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [regencies, searchQuery]);

    const nextPrayer = useMemo(() => {
        if (!schedule) return null;

        const prayers = [
            { name: 'Imsyak', time: schedule.imsyak },
            { name: 'Shubuh', time: schedule.shubuh },
            { name: 'Terbit', time: schedule.terbit },
            { name: 'Dhuha', time: schedule.dhuha },
            { name: 'Dzuhur', time: schedule.dzuhur },
            { name: 'Ashr', time: schedule.ashr },
            { name: 'Maghrib', time: schedule.maghrib },
            { name: 'Isya', time: schedule.isya }
        ];

        const currentTime = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

        for (const prayer of prayers) {
            const [h, m] = prayer.time.split(':').map(Number);
            const prayerTimeSeconds = h * 3600 + m * 60;
            if (prayerTimeSeconds > currentTime) {
                const diff = prayerTimeSeconds - currentTime;
                const hh = Math.floor(diff / 3600);
                const mm = Math.floor((diff % 3600) / 60);
                const ss = diff % 60;
                return {
                    name: prayer.name,
                    time: prayer.time,
                    countdown: `${hh > 0 ? `${hh}:` : ''}${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`
                };
            }
        }

        // If all prayers passed today, next is tomorrow's Imsyak (simplified)
        return { name: 'Imsyak', time: schedule.imsyak, countdown: 'Besok' };
    }, [schedule, now]);

    if (!regency || isSelectingCity) {
        return (
            <div className="flex flex-col h-full bg-slate-50">
                <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-6 py-4 shadow-sm">
                    <h1 className="text-2xl font-bold text-white">Pilih Wilayah</h1>
                    <p className="text-white/70 mt-1">Pilih kota/kabupaten untuk jadwal sholat</p>
                </div>

                <div className="p-4 flex-none">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cari kota atau kabupaten..."
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-2">
                    {isRegenciesLoading ? (
                        <div className="text-center py-10 flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin"></div>
                            <p className="text-slate-500 text-sm">Memuat wilayah...</p>
                        </div>
                    ) : regencyError ? (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center text-sm border border-red-100">
                            {regencyError}
                            <button
                                onClick={() => {
                                    setRegencies([]);
                                    setRegencyError(null);
                                }}
                                className="block mx-auto mt-2 text-primary-600 font-bold"
                            >
                                Coba Lagi
                            </button>
                        </div>
                    ) : filteredRegencies.length === 0 ? (
                        <div className="text-center py-10 text-slate-500">Wilayah tidak ditemukan.</div>
                    ) : (
                        filteredRegencies.map(r => (
                            <button
                                key={r.code}
                                onClick={() => {
                                    setRegency(r);
                                    setIsSelectingCity(false);
                                }}
                                className="w-full text-left bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-primary-200 hover:bg-primary-50 transition-all font-medium text-slate-700"
                            >
                                {r.name}
                            </button>
                        ))
                    )}
                </div>
                {regency && (
                    <button
                        onClick={() => setIsSelectingCity(false)}
                        className="fixed bottom-24 right-6 bg-slate-800 text-white px-6 py-3 rounded-full shadow-lg font-bold"
                    >
                        Batal
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Header */}
            <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-6 py-4 shadow-sm relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Jadwal Sholat</h1>
                        <button
                            onClick={() => setIsSelectingCity(true)}
                            className="flex items-center gap-1 text-white/80 text-sm mt-1 hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            {regency.name}
                        </button>
                    </div>
                    <div className="text-right">
                        <p className="text-white text-lg font-bold">
                            {now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-white/70 text-xs">
                            {now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' })}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 pb-24 space-y-6">
                {/* Countdown Card */}
                {schedule && nextPrayer && (
                    <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 shadow-lg shadow-primary-200 text-white relative overflow-hidden">
                        <div className="absolute right-0 top-0 p-4 opacity-20 transform translate-x-4 -translate-y-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="relative z-10">
                            <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Menuju {nextPrayer.name}</p>
                            <h2 className="text-4xl font-black mt-1 tabular-nums">{nextPrayer.countdown}</h2>
                            <p className="text-white/60 text-xs mt-2 italic">Akan berkumandang pada pukul {nextPrayer.time}</p>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-10 flex flex-col items-center gap-3">
                        <div className="w-10 h-10 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin"></div>
                        <p className="text-slate-500 text-sm">Memuat jadwal...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center text-sm border border-red-100">
                        {error}
                    </div>
                ) : schedule ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        {[
                            { label: 'Imsyak', time: schedule.imsyak },
                            { label: 'Shubuh', time: schedule.shubuh },
                            { label: 'Terbit', time: schedule.terbit },
                            { label: 'Dhuha', time: schedule.dhuha },
                            { label: 'Dzuhur', time: schedule.dzuhur },
                            { label: 'Ashr', time: schedule.ashr },
                            { label: 'Maghrib', time: schedule.maghrib },
                            { label: 'Isya', time: schedule.isya }
                        ].map((item, idx) => (
                            <div
                                key={item.label}
                                className={`flex items-center justify-between p-4 ${idx !== 7 ? 'border-b border-slate-50' : ''} ${nextPrayer?.name === item.label ? 'bg-primary-50/50' : ''}`}
                            >
                                <div className="flex items-center gap-3">
                                    <ClockIcon className={`w-5 h-5 ${nextPrayer?.name === item.label ? 'text-primary-500' : 'text-slate-400'}`} />
                                    <span className="font-semibold text-slate-700">{item.label}</span>
                                </div>
                                <span className={`text-lg font-semibold tabular-nums ${nextPrayer?.name === item.label ? 'text-primary-600' : 'text-slate-900'}`}>
                                    {item.time}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    );
};
