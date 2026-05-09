export interface Regency {
    code: string;
    name: string;
}

export interface PrayerSchedule {
    imsyak: string;
    shubuh: string;
    terbit: string;
    dhuha: string;
    dzuhur: string;
    ashr: string;
    maghrib: string;
    isya: string;
    date: string;
}

const API_KEY = '9yXJNYmQagtGd2OmTzo1KP2e4p98Hzz57BzYO223UckjedFDov';
// Gunakan BASE_URL sesuai setup kamu (proxy /api-sholat atau URL asli)
const BASE_URL = '/api-sholat'; 

const headers = {
    'x-api-co-id': API_KEY,
    'Content-Type': 'application/json'
};

/**
 * Fungsi untuk mengambil SEMUA kabupaten (6 halaman sekaligus)
 */
export const fetchRegencies = async (): Promise<Regency[]> => {
    try {
        // 1. Ambil Halaman Pertama
        const response = await fetch(`${BASE_URL}/regional/indonesia/prayer-times/regencies?page=1`, { headers });
        const firstPageData = await response.json();

        if (!firstPageData.is_success) return [];

        let allData = [...firstPageData.data];
        const totalPages = firstPageData.paging.total_page; // Ini akan bernilai 6

        // 2. Ambil Halaman 2 sampai Selesai (Looping)
        for (let i = 2; i <= totalPages; i++) {
            const nextResponse = await fetch(`${BASE_URL}/regional/indonesia/prayer-times/regencies?page=${i}`, { headers });
            const nextData = await nextResponse.json();
            if (nextData.is_success) {
                allData = [...allData, ...nextData.data];
            }
        }

        // 3. Kembalikan semua data (500+ kota)
        return allData.map((item: any) => ({
            code: item.code,
            name: item.name
        }));

    } catch (error) {
        console.error('Error fetching regencies:', error);
        return [];
    }
};

/**
 * Fungsi Pencarian: Sekarang mencari dari hasil fetchRegencies yang lengkap
 */
export const searchRegencies = async (query: string): Promise<Regency[]> => {
    if (!query) return [];
    
    // Kita ambil semua data dulu
    const allRegencies = await fetchRegencies();
    
    // Filter secara lokal di browser/HP user
    return allRegencies.filter((r: Regency) => 
        r.name.toLowerCase().includes(query.toLowerCase())
    );
};

/**
 * Fungsi Ambil Jadwal Sholat (Sudah benar)
 */
export const fetchDailyPrayerTime = async (regencyCode: string, date: string): Promise<PrayerSchedule | null> => {
    try {
        const url = `${BASE_URL}/regional/indonesia/prayer-times?regency_code=${regencyCode}&start_date=${date}&end_date=${date}`;
        const response = await fetch(url, { headers });
        const data = await response.json();

        if (data.is_success && data.data && data.data.length > 0) {
            const item = data.data[0];
            return {
                imsyak: item.imsyak,
                shubuh: item.shubuh,
                terbit: item.terbit,
                dhuha: item.dhuha,
                dzuhur: item.dzuhur,
                ashr: item.ashr,
                maghrib: item.maghrib,
                isya: item.isya,
                date: item.date
            };
        }
        return null;
    } catch (error) {
        console.error('Error fetching prayer times:', error);
        return null;
    }
};
