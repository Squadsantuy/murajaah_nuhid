import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnlineVisitors } from '../hooks/useOnlineVisitors';

export const InfoView: React.FC = () => {
    const navigate = useNavigate();
    const visitorCount = useOnlineVisitors();

    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Header */}
            <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-6 py-4 shadow-sm">
                <h1 className="text-2xl font-bold text-white">Tentang Aplikasi</h1>
                <p className="text-white/70 mt-1">Informasi tentang MurajaahQu</p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
                {/* App Info Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-4">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">MurajaahQu</h2>
                            <p className="text-sm text-slate-500">Versi 1.2.0</p>
                        </div>
                    </div>

                    <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                        <p>
                            Aplikasi ini dibuat untuk membantu pembuat aplikasi dalam murajaah (mengulang) hafalan Al-Quran.
                            Dengan latihan-latihan interaktif, pengguna dapat menguji dan memperkuat ingatan tentang surat-surat
                            Al-Quran beserta informasinya.
                        </p>
                        <p>
                            Jika Anda merasa aplikasi ini bermanfaat dan ingin menggunakannya untuk keperluan murajaah Anda juga,
                            silakan gunakan dengan senang hati. Semoga bermanfaat untuk semua yang ingin menjaga hafalan Al-Quran.
                        </p>
                    </div>
                </div>


                {/* Visitor Statistics Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-emerald-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-slate-500 text-sm font-medium">Pengunjung Online</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-3xl font-bold text-slate-800">{visitorCount}</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs text-emerald-600 font-medium">aktif</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-slate-400 text-xs">Real-time</div>
                            <div className="text-slate-500 text-xs mt-1">Update otomatis</div>
                        </div>
                    </div>
                </div>

                {/* Bookmark Shortcut Card */}
                <div
                    onClick={() => navigate('/bacaan-terakhir')}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6 cursor-pointer active:scale-[0.98] transition-all group flex items-center justify-between"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-slate-800 font-bold text-lg">Bacaan Terakhir</h3>
                            <p className="text-slate-400 text-xs">Lanjutkan bacaan terakhir Anda</p>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors text-slate-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                </div>

                {/* Features Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-4">
                    <h3 className="font-semibold text-slate-800 mb-4">Fitur Utama</h3>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-slate-800 text-sm">Daftar 114 Surat</h4>
                                <p className="text-xs text-slate-500">Lihat informasi lengkap semua surat Al-Quran</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-slate-800 text-sm">Latihan Murajaah</h4>
                                <p className="text-xs text-slate-500">Uji hafalan dengan berbagai jenis kuis interaktif</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-slate-800 text-sm">Kamus Dalil</h4>
                                <p className="text-xs text-slate-500">Temukan ayat Al-Quran berdasarkan tema</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Developer Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-4">
                    <h3 className="font-semibold text-slate-800 mb-4">Pengembang</h3>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-medium text-slate-800">Abu Asfa</h4>
                            <p className="text-xs text-slate-500">Semoga Allah memudahkan kita dalam menjaga hafalan Al-Quran</p>
                        </div>
                    </div>
                </div>

                {/* Credits Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-4">
                    <h3 className="font-semibold text-slate-800 mb-4">Sumber Data</h3>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-emerald-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-slate-800 text-sm">EQuran.id API</h4>
                                <p className="text-xs text-slate-500 mb-2">Data Al-Quran, terjemahan, dan audio murotal</p>
                                <a
                                    href="https://equran.id/apidev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700"
                                >
                                    equran.id/apidev
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-4">
                        Terima kasih kepada pengembang API yang telah menyediakan akses gratis untuk data Al-Quran.
                    </p>
                </div>

                {/* Footer Note */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-slate-400">
                        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                        Dibuat dengan ❤️ untuk kebaikan bersama
                    </p>
                </div>
            </div>
        </div>
    );
};
