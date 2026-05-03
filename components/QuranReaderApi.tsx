import { useState } from 'react';
import { useSuratList, useSuratDetail, useAudio } from '../hooks/useQuran';
import { SuratListItem, QariCode, QARI_INFO } from '../services/quranApi';

// ==================== SuratListApi Component ====================
/**
 * Komponen untuk menampilkan daftar surat dari API
 */
export function SuratListApi({
    onSelectSurat,
    filterJuz30 = false
}: {
    onSelectSurat?: (nomor: number) => void;
    filterJuz30?: boolean;
}) {
    const { suratList, loading, error, refetch } = useSuratList();

    // Filter untuk Juz 30 jika diperlukan
    const displayList = filterJuz30
        ? suratList.filter(s => s.nomor >= 78 && s.nomor <= 114)
        : suratList;

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                <span className="ml-3 text-gray-600">Memuat daftar surat...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 mb-2">Error: {error}</p>
                <button
                    onClick={refetch}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                    Coba Lagi
                </button>
            </div>
        );
    }

    return (
        <div className="grid gap-3">
            {displayList.map((surat) => (
                <SuratCard key={surat.nomor} surat={surat} onClick={() => onSelectSurat?.(surat.nomor)} />
            ))}
        </div>
    );
}

// ==================== SuratCard Component ====================
function SuratCard({ surat, onClick }: { surat: SuratListItem; onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100 hover:border-emerald-200"
        >
            <div className="flex items-center gap-4">
                {/* Nomor Surat */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold shadow-md">
                    {surat.nomor}
                </div>

                {/* Info Surat */}
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800">{surat.namaLatin}</h3>
                        <span className="text-xl font-arabic text-emerald-700">{surat.nama}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <span>{surat.arti}</span>
                        <span>•</span>
                        <span>{surat.jumlahAyat} Ayat</span>
                        <span>•</span>
                        <span>{surat.tempatTurun}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ==================== SuratDetailApi Component ====================
/**
 * Komponen untuk menampilkan detail surat dengan ayat-ayatnya
 */
export function SuratDetailApi({
    nomor,
    onBack,
    onNavigate
}: {
    nomor: number;
    onBack?: () => void;
    onNavigate?: (nomor: number) => void;
}) {
    const { surat, loading, error } = useSuratDetail(nomor);
    const { toggle, isPlaying, currentUrl, loading: audioLoading } = useAudio();
    const [selectedQari, setSelectedQari] = useState<QariCode>('05');

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                <span className="ml-3 text-gray-600">Memuat surat...</span>
            </div>
        );
    }

    if (error || !surat) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">Error: {error || 'Surat tidak ditemukan'}</p>
                {onBack && (
                    <button
                        onClick={onBack}
                        className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                    >
                        Kembali
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
                {onBack && (
                    <button
                        onClick={onBack}
                        className="mb-4 flex items-center gap-2 text-white/80 hover:text-white transition"
                    >
                        <span>←</span> Kembali ke Daftar Surat
                    </button>
                )}

                <div className="text-center">
                    <h1 className="text-3xl font-arabic mb-2">{surat.nama}</h1>
                    <h2 className="text-xl font-semibold">{surat.namaLatin}</h2>
                    <p className="text-white/80 mt-1">{surat.arti}</p>
                    <div className="flex items-center justify-center gap-4 mt-3 text-sm text-white/70">
                        <span>Surat ke-{surat.nomor}</span>
                        <span>•</span>
                        <span>{surat.jumlahAyat} Ayat</span>
                        <span>•</span>
                        <span>{surat.tempatTurun}</span>
                    </div>
                </div>

                {/* Qari Selector & Full Audio */}
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <select
                        value={selectedQari}
                        onChange={(e) => setSelectedQari(e.target.value as QariCode)}
                        className="px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                        {(Object.entries(QARI_INFO) as [QariCode, string][]).map(([code, name]) => (
                            <option key={code} value={code} className="text-gray-800">
                                {name}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={() => toggle(surat.audioFull[selectedQari])}
                        disabled={audioLoading}
                        className="flex items-center gap-2 px-6 py-2 bg-white/20 rounded-full hover:bg-white/30 transition disabled:opacity-50"
                    >
                        {audioLoading ? (
                            <span className="animate-spin">⟳</span>
                        ) : isPlaying && currentUrl === surat.audioFull[selectedQari] ? (
                            <>⏸ Pause</>
                        ) : (
                            <>▶ Putar Surat</>
                        )}
                    </button>
                </div>
            </div>

            {/* Deskripsi */}
            {surat.deskripsi && (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-gray-700 mb-2">Tentang Surat</h3>
                    <div
                        className="text-gray-600 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: surat.deskripsi }}
                    />
                </div>
            )}

            {/* Bismillah (untuk semua surat kecuali At-Taubah) */}
            {surat.nomor !== 9 && (
                <div className="text-center py-6 text-2xl font-arabic text-emerald-700">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
            )}

            {/* Ayat-ayat */}
            <div className="space-y-4">
                {surat.ayat.map((ayat) => (
                    <div
                        key={ayat.nomorAyat}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-emerald-200 transition"
                    >
                        <div className="flex items-start gap-3">
                            {/* Nomor Ayat */}
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-sm">
                                {ayat.nomorAyat}
                            </div>

                            <div className="flex-1 space-y-3">
                                {/* Teks Arab */}
                                <p className="text-right text-2xl font-arabic leading-loose text-gray-800 py-2">
                                    {ayat.teksArab}
                                </p>

                                {/* Teks Latin */}
                                <p className="text-gray-600 italic text-sm">
                                    {ayat.teksLatin}
                                </p>

                                {/* Terjemahan */}
                                <p className="text-gray-700">
                                    {ayat.teksIndonesia}
                                </p>

                                {/* Audio Button */}
                                <button
                                    onClick={() => toggle(ayat.audio[selectedQari])}
                                    disabled={audioLoading}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition ${isPlaying && currentUrl === ayat.audio[selectedQari]
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                        } disabled:opacity-50`}
                                >
                                    {isPlaying && currentUrl === ayat.audio[selectedQari] ? (
                                        <>⏸ Pause</>
                                    ) : (
                                        <>🔊 Dengarkan</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center py-4">
                {surat.suratSebelumnya && (
                    <button
                        onClick={() => onNavigate?.(surat.suratSebelumnya ? surat.suratSebelumnya.nomor : 0)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                    >
                        <span>←</span>
                        <span>{surat.suratSebelumnya.namaLatin}</span>
                    </button>
                )}

                <div className="flex-1" />

                {surat.suratSelanjutnya && (
                    <button
                        onClick={() => onNavigate?.(surat.suratSelanjutnya ? surat.suratSelanjutnya.nomor : 0)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                    >
                        <span>{surat.suratSelanjutnya.namaLatin}</span>
                        <span>→</span>
                    </button>
                )}
            </div>
        </div>
    );
}

// ==================== QuranReaderApi Component ====================
/**
 * Komponen lengkap untuk membaca Al-Quran dengan integrasi API
 */
export function QuranReaderApi({ filterJuz30 = false }: { filterJuz30?: boolean }) {
    const [selectedSurat, setSelectedSurat] = useState<number | null>(null);

    const handleSelectSurat = (nomor: number) => {
        setSelectedSurat(nomor);
    };

    const handleBack = () => {
        setSelectedSurat(null);
    };

    const handleNavigate = (nomor: number) => {
        setSelectedSurat(nomor);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            {selectedSurat ? (
                <SuratDetailApi
                    nomor={selectedSurat}
                    onBack={handleBack}
                    onNavigate={handleNavigate}
                />
            ) : (
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        {filterJuz30 ? 'Juz 30 - Juz Amma' : 'Daftar Surat Al-Quran'}
                    </h1>
                    <SuratListApi
                        onSelectSurat={handleSelectSurat}
                        filterJuz30={filterJuz30}
                    />
                </div>
            )}
        </div>
    );
}

export default QuranReaderApi;
