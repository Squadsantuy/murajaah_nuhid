// Doa API Service
// Fetches doa data from equran.id API

export interface Doa {
    id: number;
    grup: string;
    nama: string;
    ar: string;      // Arabic text
    tr: string;      // Transliteration
    idn: string;     // Indonesian translation
    tentang: string; // Source/dalil
    tag: string[];
}

export interface DoaApiResponse {
    status: string;
    total: number;
    data: Doa[];
}

const API_BASE_URL = 'https://equran.id/api/doa';

// Cache for doa data
let doaCache: Doa[] | null = null;

/**
 * Fetch all doa from API
 */
export async function fetchAllDoa(): Promise<Doa[]> {
    // Return cached data if available
    if (doaCache) {
        return doaCache;
    }

    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: DoaApiResponse = await response.json();
        doaCache = result.data;
        return result.data;
    } catch (error) {
        console.error('Error fetching doa data:', error);
        throw error;
    }
}

/**
 * Search doa by query (searches in nama, grup, idn, and tags)
 */
export function searchDoa(doaList: Doa[], query: string): Doa[] {
    if (!query.trim()) {
        return doaList;
    }

    const lowerQuery = query.toLowerCase();
    return doaList.filter(doa =>
        doa.nama.toLowerCase().includes(lowerQuery) ||
        doa.grup.toLowerCase().includes(lowerQuery) ||
        doa.idn.toLowerCase().includes(lowerQuery) ||
        doa.tag.some(t => t.toLowerCase().includes(lowerQuery))
    );
}

/**
 * Group doa by grup/category
 */
export function groupDoaByGrup(doaList: Doa[]): Map<string, Doa[]> {
    const grouped = new Map<string, Doa[]>();

    doaList.forEach(doa => {
        const existing = grouped.get(doa.grup) || [];
        existing.push(doa);
        grouped.set(doa.grup, existing);
    });

    return grouped;
}

/**
 * Get unique grup names
 */
export function getGrupList(doaList: Doa[]): string[] {
    const grups = new Set<string>();
    doaList.forEach(doa => grups.add(doa.grup));
    return Array.from(grups);
}
