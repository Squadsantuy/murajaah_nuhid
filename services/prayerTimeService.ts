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
const BASE_URL = '/api-sholat';

const headers = {
    'x-api-co-id': API_KEY,
    'Content-Type': 'application/json'
};

export const fetchRegencies = async (): Promise<Regency[]> => {
    try {
        const url = `${BASE_URL}/regional/indonesia/prayer-times/regencies?page=1&limit=100`;
        console.log('Fetching regencies from:', url);
        const response = await fetch(url, { headers });
        console.log('Regencies response status:', response.status);

        const contentType = response.headers.get('content-type');
        if (contentType && !contentType.includes('application/json')) {
            console.error('Expected JSON but got:', contentType);
            const text = await response.text();
            console.log('Response body snippet:', text.substring(0, 100));
            return [];
        }

        const data = await response.json();
        console.log('Regencies data:', data);

        if (data.is_success && data.data) {
            return data.data.map((item: any) => ({
                code: item.code,
                name: item.name
            }));
        }
        return [];
    } catch (error) {
        console.error('Error fetching regencies:', error);
        return [];
    }
};

export const searchRegencies = async (query: string): Promise<Regency[]> => {
    if (!query) return [];
    try {
        // The API might not have a direct search endpoint, so we might need to filter client-side 
        // OR use query params if supported. The docs mention filtering by regency_code.
        // For now, let's fetch first page or common cities.
        const response = await fetch(`${BASE_URL}/regional/indonesia/prayer-times/regencies?page=1&limit=150`, { headers });
        const data = await response.json();

        if (data.is_success && data.data) {
            return data.data
                .map((item: any) => ({
                    code: item.code,
                    name: item.name
                }))
                .filter((r: Regency) => r.name.toLowerCase().includes(query.toLowerCase()));
        }
        return [];
    } catch (error) {
        console.error('Error searching regencies:', error);
        return [];
    }
};

export const fetchDailyPrayerTime = async (regencyCode: string, date: string): Promise<PrayerSchedule | null> => {
    try {
        // date format: YYYY-MM-DD
        const response = await fetch(`${BASE_URL}/regional/indonesia/prayer-times?regency_code=${regencyCode}&start_date=${date}&end_date=${date}`, { headers });
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
