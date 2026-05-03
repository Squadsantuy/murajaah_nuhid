import { useState, useEffect, useCallback } from 'react';
import {
    getAllSurat,
    getSuratDetail,
    getJuz30Surat,
    getTafsir,
    SuratListItem,
    SuratDetail,
    SuratTafsir,
} from '../services/quranApi';

/**
 * Hook untuk mendapatkan daftar semua surat
 * Error hanya ditampilkan setelah 5 detik untuk menghindari flash
 */
export function useSuratList() {
    const [suratList, setSuratList] = useState<SuratListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        let isMounted = true;
        let errorTimeout: ReturnType<typeof setTimeout>;

        async function fetchData() {
            try {
                setLoading(true);
                setError(null);
                setShowError(false);
                const data = await getAllSurat();
                if (isMounted) {
                    setSuratList(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Gagal mengambil daftar surat');
                    // Delay 5 detik sebelum menampilkan error
                    errorTimeout = setTimeout(() => {
                        if (isMounted) {
                            setShowError(true);
                        }
                    }, 5000);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            isMounted = false;
            if (errorTimeout) clearTimeout(errorTimeout);
        };
    }, []);

    const refetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        setShowError(false);
        try {
            const data = await getAllSurat();
            setSuratList(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Gagal mengambil daftar surat');
            // Langsung tampilkan error saat refetch manual
            setShowError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    // Hanya return error jika showError true (setelah 5 detik)
    return { suratList, loading, error: showError ? error : null, refetch };
}

// ==================== HOOK: useJuz30Surat ====================
/**
 * Hook untuk mendapatkan daftar surat Juz 30
 */
export function useJuz30Surat() {
    const [suratList, setSuratList] = useState<SuratListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            try {
                setLoading(true);
                setError(null);
                const data = await getJuz30Surat();
                if (isMounted) {
                    setSuratList(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Gagal mengambil surat Juz 30');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    return { suratList, loading, error };
}

// ==================== HOOK: useSuratDetail ====================
/**
 * Hook untuk mendapatkan detail surat dengan ayat-ayatnya
 * Error hanya ditampilkan setelah 5 detik untuk menghindari flash
 * @param nomor - Nomor surat (1-114)
 */
export function useSuratDetail(nomor: number | null) {
    const [surat, setSurat] = useState<SuratDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (nomor === null) {
            setSurat(null);
            setLoading(false);
            setError(null);
            setShowError(false);
            return;
        }

        let isMounted = true;
        let errorTimeout: ReturnType<typeof setTimeout>;

        async function fetchData() {
            try {
                setLoading(true);
                setError(null);
                setShowError(false);
                const data = await getSuratDetail(nomor!);
                if (isMounted) {
                    setSurat(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : `Gagal mengambil surat ${nomor}`);
                    // Delay 5 detik sebelum menampilkan error
                    errorTimeout = setTimeout(() => {
                        if (isMounted) {
                            setShowError(true);
                        }
                    }, 5000);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            isMounted = false;
            if (errorTimeout) clearTimeout(errorTimeout);
        };
    }, [nomor]);

    // Hanya return error jika showError true (setelah 5 detik)
    return { surat, loading, error: showError ? error : null };
}

// ==================== HOOK: useTafsir ====================
/**
 * Hook untuk mendapatkan tafsir surat
 * @param nomor - Nomor surat (1-114)
 */
export function useTafsir(nomor: number | null) {
    const [tafsir, setTafsir] = useState<SuratTafsir | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (nomor === null) {
            setTafsir(null);
            setLoading(false);
            setError(null);
            return;
        }

        let isMounted = true;

        async function fetchData() {
            try {
                setLoading(true);
                setError(null);
                const data = await getTafsir(nomor!);
                if (isMounted) {
                    setTafsir(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : `Gagal mengambil tafsir surat ${nomor}`);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [nomor]);

    return { tafsir, loading, error };
}

// ==================== HOOK: useAudio ====================
/**
 * Hook untuk mengelola audio playback
 */
export function useAudio() {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentUrl, setCurrentUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const play = useCallback((url: string) => {
        // Stop current audio if playing
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }

        setLoading(true);
        const newAudio = new Audio(url);

        newAudio.onloadeddata = () => {
            setLoading(false);
        };

        newAudio.onplay = () => {
            setIsPlaying(true);
        };

        newAudio.onpause = () => {
            setIsPlaying(false);
        };

        newAudio.onended = () => {
            setIsPlaying(false);
        };

        newAudio.onerror = () => {
            setLoading(false);
            setIsPlaying(false);
        };

        setAudio(newAudio);
        setCurrentUrl(url);
        newAudio.play().catch(() => {
            setLoading(false);
            setIsPlaying(false);
        });
    }, [audio]);

    const pause = useCallback(() => {
        if (audio) {
            audio.pause();
        }
    }, [audio]);

    const stop = useCallback(() => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        setIsPlaying(false);
        setCurrentUrl(null);
    }, [audio]);

    const toggle = useCallback((url: string) => {
        if (currentUrl === url && isPlaying) {
            pause();
        } else {
            play(url);
        }
    }, [currentUrl, isPlaying, pause, play]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        };
    }, [audio]);

    return {
        play,
        pause,
        stop,
        toggle,
        isPlaying,
        currentUrl,
        loading
    };
}

// ==================== HOOK: useQuranCache ====================
/**
 * Hook untuk caching data surat yang sudah di-fetch
 */
export function useQuranCache() {
    const [cache, setCache] = useState<Map<number, SuratDetail>>(new Map());

    const getCachedSurat = useCallback((nomor: number): SuratDetail | undefined => {
        return cache.get(nomor);
    }, [cache]);

    const cacheSurat = useCallback((surat: SuratDetail) => {
        setCache(prev => {
            const newCache = new Map(prev);
            newCache.set(surat.nomor, surat);
            return newCache;
        });
    }, []);

    const fetchAndCache = useCallback(async (nomor: number): Promise<SuratDetail> => {
        const cached = cache.get(nomor);
        if (cached) {
            return cached;
        }

        const data = await getSuratDetail(nomor);
        setCache(prev => {
            const newCache = new Map(prev);
            newCache.set(nomor, data);
            return newCache;
        });
        return data;
    }, [cache]);

    const clearCache = useCallback(() => {
        setCache(new Map());
    }, []);

    return {
        getCachedSurat,
        cacheSurat,
        fetchAndCache,
        clearCache,
        cacheSize: cache.size
    };
}
