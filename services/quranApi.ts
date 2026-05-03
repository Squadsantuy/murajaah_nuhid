// Service untuk mengakses API EQuran.id v2.0
// Dokumentasi: https://equran.id/apidev/v2

const API_BASE_URL = 'https://equran.id/api/v2';

// ==================== TYPES ====================

// Response wrapper dari API
export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}

// Audio dari 6 qari
export interface QariAudio {
    '01': string; // Abdullah Al-Juhany
    '02': string; // Abdul Muhsin Al-Qasim
    '03': string; // Abdurrahman As-Sudais
    '04': string; // Ibrahim Al-Dossari
    '05': string; // Misyari Rasyid Al-Afasy
    '06': string; // Yasser Al-Dosari
}

// Data ayat dari API
export interface AyatApi {
    nomorAyat: number;
    teksArab: string;
    teksLatin: string;
    teksIndonesia: string;
    audio: QariAudio;
}

// Data surat ringkas (untuk daftar surat)
export interface SuratListItem {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    arti: string;
    deskripsi: string;
    audioFull: QariAudio;
}

// Data surat detail (dengan ayat)
export interface SuratDetail extends SuratListItem {
    ayat: AyatApi[];
    suratSelanjutnya: SuratNav | false;
    suratSebelumnya: SuratNav | false;
}

// Navigasi surat
export interface SuratNav {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
}

// Data tafsir
export interface TafsirItem {
    ayat: number;
    teks: string;
}

// Data surat dengan tafsir
export interface SuratTafsir extends SuratListItem {
    tafsir: TafsirItem[];
    suratSelanjutnya: SuratNav | false;
    suratSebelumnya: SuratNav | false;
}

// Kode qari
export type QariCode = '01' | '02' | '03' | '04' | '05' | '06';

// Info qari
export const QARI_INFO: Record<QariCode, string> = {
    '01': 'Abdullah Al-Juhany',
    '02': 'Abdul Muhsin Al-Qasim',
    '03': 'Abdurrahman As-Sudais',
    '04': 'Ibrahim Al-Dossari',
    '05': 'Misyari Rasyid Al-Afasy',
    '06': 'Yasser Al-Dosari',
};

// ==================== API FUNCTIONS ====================

/**
 * Mendapatkan daftar semua surat
 */
export async function getAllSurat(): Promise<SuratListItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/surat`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: ApiResponse<SuratListItem[]> = await response.json();

        if (result.code !== 200) {
            throw new Error(result.message || 'Failed to fetch surat list');
        }

        return result.data;
    } catch (error) {
        console.error('Error fetching surat list:', error);
        throw error;
    }
}

/**
 * Mendapatkan detail surat beserta ayat-ayatnya
 * @param nomor - Nomor surat (1-114)
 */
export async function getSuratDetail(nomor: number): Promise<SuratDetail> {
    try {
        const response = await fetch(`${API_BASE_URL}/surat/${nomor}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: ApiResponse<SuratDetail> = await response.json();

        if (result.code !== 200) {
            throw new Error(result.message || 'Failed to fetch surat detail');
        }

        return result.data;
    } catch (error) {
        console.error(`Error fetching surat ${nomor}:`, error);
        throw error;
    }
}

/**
 * Mendapatkan tafsir surat
 * @param nomor - Nomor surat (1-114)
 */
export async function getTafsir(nomor: number): Promise<SuratTafsir> {
    try {
        const response = await fetch(`${API_BASE_URL}/tafsir/${nomor}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: ApiResponse<SuratTafsir> = await response.json();

        if (result.code !== 200) {
            throw new Error(result.message || 'Failed to fetch tafsir');
        }

        return result.data;
    } catch (error) {
        console.error(`Error fetching tafsir ${nomor}:`, error);
        throw error;
    }
}

/**
 * Mendapatkan surat-surat Juz 30 (An-Naba sampai An-Nas)
 */
export async function getJuz30Surat(): Promise<SuratListItem[]> {
    const allSurat = await getAllSurat();
    // Juz 30 dimulai dari surat 78 (An-Naba) sampai 114 (An-Nas)
    return allSurat.filter(surat => surat.nomor >= 78 && surat.nomor <= 114);
}

/**
 * Mendapatkan detail beberapa surat sekaligus
 * @param nomorList - Array nomor surat
 */
export async function getMultipleSuratDetail(nomorList: number[]): Promise<SuratDetail[]> {
    const promises = nomorList.map(nomor => getSuratDetail(nomor));
    return Promise.all(promises);
}

/**
 * Mendapatkan semua surat Juz 30 dengan detail ayat
 */
export async function getJuz30WithAyat(): Promise<SuratDetail[]> {
    const juz30Numbers = Array.from({ length: 37 }, (_, i) => 78 + i);
    return getMultipleSuratDetail(juz30Numbers);
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Format nomor surat dengan leading zeros (3 digit)
 */
export function formatSuratNumber(nomor: number): string {
    return String(nomor).padStart(3, '0');
}

/**
 * Format nomor ayat dengan leading zeros (3 digit)
 */
export function formatAyatNumber(nomor: number): string {
    return String(nomor).padStart(3, '0');
}

/**
 * Mendapatkan URL audio surat lengkap
 * @param suratNomor - Nomor surat
 * @param qari - Kode qari (default: Misyari)
 */
export function getFullAudioUrl(suratNomor: number, qari: QariCode = '05'): string {
    const qariNames: Record<QariCode, string> = {
        '01': 'Abdullah-Al-Juhany',
        '02': 'Abdul-Muhsin-Al-Qasim',
        '03': 'Abdurrahman-as-Sudais',
        '04': 'Ibrahim-Al-Dossari',
        '05': 'Misyari-Rasyid-Al-Afasi',
        '06': 'Yasser-Al-Dosari',
    };

    return `https://cdn.equran.id/audio-full/${qariNames[qari]}/${formatSuratNumber(suratNomor)}.mp3`;
}

/**
 * Mendapatkan URL audio per ayat
 * @param suratNomor - Nomor surat
 * @param ayatNomor - Nomor ayat
 * @param qari - Kode qari (default: Misyari)
 */
export function getAyatAudioUrl(suratNomor: number, ayatNomor: number, qari: QariCode = '05'): string {
    const qariNames: Record<QariCode, string> = {
        '01': 'Abdullah-Al-Juhany',
        '02': 'Abdul-Muhsin-Al-Qasim',
        '03': 'Abdurrahman-as-Sudais',
        '04': 'Ibrahim-Al-Dossari',
        '05': 'Misyari-Rasyid-Al-Afasi',
        '06': 'Yasser-Al-Dosari',
    };

    return `https://cdn.equran.id/audio-partial/${qariNames[qari]}/${formatSuratNumber(suratNomor)}${formatAyatNumber(ayatNomor)}.mp3`;
}

/**
 * Konversi dari format API ke format lokal (QuranSurah)
 * Untuk kompatibilitas dengan data yang sudah ada
 */
export function convertToLocalFormat(surat: SuratDetail) {
    return {
        number: surat.nomor,
        name: surat.nama,
        latin: surat.namaLatin,
        totalVerses: surat.jumlahAyat,
        verses: surat.ayat.map(ayat => ({
            number: ayat.nomorAyat,
            arabic: ayat.teksArab,
            latin: ayat.teksLatin,
            indonesia: ayat.teksIndonesia,
            audio: ayat.audio,
        })),
        tempatTurun: surat.tempatTurun,
        arti: surat.arti,
        deskripsi: surat.deskripsi,
        audioFull: surat.audioFull,
    };
}
