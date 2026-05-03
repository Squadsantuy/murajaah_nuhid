# Dokumentasi API EQuran.id v2.0

## Deskripsi Umum

API EQuran.id v2.0 adalah REST API gratis yang menyediakan akses ke data Al-Quran digital lengkap dengan fitur:

- **114 Surat** Al-Quran lengkap
- **6,236 Ayat** dengan teks Arab, Latin, dan terjemahan Indonesia
- **Audio berkualitas tinggi** dari 6 qari terbaik
- **Tafsir lengkap** untuk setiap surat
- **CDN global** untuk performa optimal

---

## Base URL

```
https://equran.id/api/v2
```

---

## Response Format

Semua response menggunakan format wrapper standar:

```json
{
  "code": 200,
  "message": "Data retrieved successfully",
  "data": { ... }
}
```

| Field     | Type    | Deskripsi                        |
|-----------|---------|----------------------------------|
| `code`    | integer | HTTP status code                 |
| `message` | string  | Pesan status                     |
| `data`    | object  | Data hasil request               |

---

## Endpoints

### 1. Mendapatkan Daftar Semua Surat

Mengambil daftar seluruh 114 surat dalam Al-Quran.

```http
GET /api/v2/surat
```

**Contoh Request:**
```bash
curl "https://equran.id/api/v2/surat"
```

**Response Fields (per surat):**

| Field             | Type    | Deskripsi                                    |
|-------------------|---------|----------------------------------------------|
| `nomor`           | integer | Nomor surat (1-114)                          |
| `nama`            | string  | Nama surat dalam bahasa Arab                 |
| `namaLatin`       | string  | Nama surat dalam huruf Latin                 |
| `jumlahAyat`      | integer | Total jumlah ayat dalam surat                |
| `tempatTurun`     | string  | Tempat turunnya surat ("Mekah" / "Madinah")  |
| `arti`            | string  | Arti nama surat dalam bahasa Indonesia       |
| `deskripsi`       | string  | Deskripsi singkat tentang surat (HTML)       |
| `audioFull`       | object  | URL audio surat lengkap dari 6 qari          |

---

### 2. Mendapatkan Detail Surat

Mengambil detail surat beserta seluruh ayat dan audio per ayat.

```http
GET /api/v2/surat/{nomor}
```

**Path Parameters:**

| Parameter | Type    | Required | Deskripsi                |
|-----------|---------|----------|--------------------------|
| `nomor`   | integer | Ya       | Nomor surat (1-114)      |

**Contoh Request:**
```bash
curl "https://equran.id/api/v2/surat/1"
```

**Response Fields:**

| Field               | Type    | Deskripsi                                    |
|---------------------|---------|----------------------------------------------|
| `nomor`             | integer | Nomor surat                                  |
| `nama`              | string  | Nama surat dalam bahasa Arab                 |
| `namaLatin`         | string  | Nama surat dalam huruf Latin                 |
| `jumlahAyat`        | integer | Total jumlah ayat dalam surat                |
| `tempatTurun`       | string  | Tempat turunnya surat                        |
| `arti`              | string  | Arti nama surat                              |
| `deskripsi`         | string  | Deskripsi tentang surat (HTML)               |
| `audioFull`         | object  | URL audio surat lengkap dari 6 qari          |
| `ayat`              | array   | Array berisi data setiap ayat                |
| `suratSelanjutnya`  | object  | Info surat berikutnya (atau `false`)         |
| `suratSebelumnya`   | object  | Info surat sebelumnya (atau `false`)         |

**Struktur Object `ayat`:**

| Field           | Type    | Deskripsi                                      |
|-----------------|---------|------------------------------------------------|
| `nomorAyat`     | integer | Nomor ayat dalam surat                         |
| `teksArab`      | string  | Teks ayat dalam bahasa Arab                    |
| `teksLatin`     | string  | Transliterasi Latin dengan tajwid              |
| `teksIndonesia` | string  | Terjemahan dalam bahasa Indonesia              |
| `audio`         | object  | URL audio ayat dari 6 qari                     |

**Contoh Response (Surat Al-Fatihah):**
```json
{
  "code": 200,
  "message": "Data retrieved successfully",
  "data": {
    "nomor": 1,
    "nama": "الفاتحة",
    "namaLatin": "Al-Fatihah",
    "jumlahAyat": 7,
    "tempatTurun": "Mekah",
    "arti": "Pembukaan",
    "deskripsi": "Surat <i>Al Faatihah</i> (Pembukaan)...",
    "audioFull": {
      "01": "https://cdn.equran.id/audio-full/Abdullah-Al-Juhany/001.mp3",
      "02": "https://cdn.equran.id/audio-full/Abdul-Muhsin-Al-Qasim/001.mp3",
      "03": "https://cdn.equran.id/audio-full/Abdurrahman-as-Sudais/001.mp3",
      "04": "https://cdn.equran.id/audio-full/Ibrahim-Al-Dossari/001.mp3",
      "05": "https://cdn.equran.id/audio-full/Misyari-Rasyid-Al-Afasi/001.mp3",
      "06": "https://cdn.equran.id/audio-full/Yasser-Al-Dosari/001.mp3"
    },
    "ayat": [
      {
        "nomorAyat": 1,
        "teksArab": "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
        "teksLatin": "Bismillāhir-raḥmānir-raḥīm(i).",
        "teksIndonesia": "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang.",
        "audio": {
          "01": "https://cdn.equran.id/audio-partial/Abdullah-Al-Juhany/001001.mp3",
          "02": "https://cdn.equran.id/audio-partial/Abdul-Muhsin-Al-Qasim/001001.mp3",
          "03": "https://cdn.equran.id/audio-partial/Abdurrahman-as-Sudais/001001.mp3",
          "04": "https://cdn.equran.id/audio-partial/Ibrahim-Al-Dossari/001001.mp3",
          "05": "https://cdn.equran.id/audio-partial/Misyari-Rasyid-Al-Afasi/001001.mp3",
          "06": "https://cdn.equran.id/audio-partial/Yasser-Al-Dosari/001001.mp3"
        }
      }
    ],
    "suratSelanjutnya": {
      "nomor": 2,
      "nama": "البقرة",
      "namaLatin": "Al-Baqarah",
      "jumlahAyat": 286
    },
    "suratSebelumnya": false
  }
}
```

---

### 3. Mendapatkan Tafsir Surat

Mengambil tafsir lengkap untuk setiap ayat dalam surat.

```http
GET /api/v2/tafsir/{nomor}
```

**Path Parameters:**

| Parameter | Type    | Required | Deskripsi                |
|-----------|---------|----------|--------------------------|
| `nomor`   | integer | Ya       | Nomor surat (1-114)      |

**Contoh Request:**
```bash
curl "https://equran.id/api/v2/tafsir/1"
```

**Response Fields:**

| Field               | Type    | Deskripsi                                    |
|---------------------|---------|----------------------------------------------|
| `nomor`             | integer | Nomor surat                                  |
| `nama`              | string  | Nama surat dalam bahasa Arab                 |
| `namaLatin`         | string  | Nama surat dalam huruf Latin                 |
| `jumlahAyat`        | integer | Total jumlah ayat dalam surat                |
| `tempatTurun`       | string  | Tempat turunnya surat                        |
| `arti`              | string  | Arti nama surat                              |
| `deskripsi`         | string  | Deskripsi tentang surat (HTML)               |
| `audioFull`         | object  | URL audio surat lengkap dari 6 qari          |
| `tafsir`            | array   | Array berisi tafsir setiap ayat              |
| `suratSelanjutnya`  | object  | Info surat berikutnya (atau `false`)         |
| `suratSebelumnya`   | object  | Info surat sebelumnya (atau `false`)         |

**Struktur Object `tafsir`:**

| Field  | Type    | Deskripsi                           |
|--------|---------|-------------------------------------|
| `ayat` | integer | Nomor ayat                          |
| `teks` | string  | Teks tafsir lengkap untuk ayat      |

---

## Kode Qari (Audio)

API menyediakan audio dari 6 qari terbaik dengan kode berikut:

| Kode | Nama Qari                  |
|------|----------------------------|
| `01` | Abdullah Al-Juhany         |
| `02` | Abdul Muhsin Al-Qasim      |
| `03` | Abdurrahman As-Sudais      |
| `04` | Ibrahim Al-Dossari         |
| `05` | Misyari Rasyid Al-Afasy    |
| `06` | Yasser Al-Dosari           |

---

## Format URL Audio

### Audio Surat Lengkap
```
https://cdn.equran.id/audio-full/{NAMA_QARI}/{NOMOR_SURAT}.mp3
```

**Contoh:**
```
https://cdn.equran.id/audio-full/Abdullah-Al-Juhany/001.mp3
```

### Audio Per Ayat
```
https://cdn.equran.id/audio-partial/{NAMA_QARI}/{NOMOR_SURAT}{NOMOR_AYAT}.mp3
```

**Contoh:**
```
https://cdn.equran.id/audio-partial/Abdullah-Al-Juhany/001001.mp3
```

> **Catatan:** Nomor surat dan ayat menggunakan format 3 digit dengan leading zeros.

---

## Contoh Penggunaan

### JavaScript (Fetch API)

```javascript
// Mendapatkan daftar semua surat
async function getAllSurat() {
  const response = await fetch('https://equran.id/api/v2/surat');
  const result = await response.json();
  return result.data;
}

// Mendapatkan detail surat
async function getSuratDetail(nomor) {
  const response = await fetch(`https://equran.id/api/v2/surat/${nomor}`);
  const result = await response.json();
  return result.data;
}

// Mendapatkan tafsir surat
async function getTafsir(nomor) {
  const response = await fetch(`https://equran.id/api/v2/tafsir/${nomor}`);
  const result = await response.json();
  return result.data;
}

// Contoh penggunaan
const alFatihah = await getSuratDetail(1);
console.log(alFatihah.nama); // الفاتحة
console.log(alFatihah.ayat[0].teksArab); // بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
```

### TypeScript (dengan Types)

```typescript
interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: Record<string, string>;
}

interface Surat {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: Record<string, string>;
  ayat: Ayat[];
  suratSelanjutnya: { nomor: number; nama: string; namaLatin: string; jumlahAyat: number } | false;
  suratSebelumnya: { nomor: number; nama: string; namaLatin: string; jumlahAyat: number } | false;
}

interface Tafsir {
  ayat: number;
  teks: string;
}

interface SuratTafsir extends Omit<Surat, 'ayat'> {
  tafsir: Tafsir[];
}

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

async function getSuratDetail(nomor: number): Promise<Surat> {
  const response = await fetch(`https://equran.id/api/v2/surat/${nomor}`);
  const result: ApiResponse<Surat> = await response.json();
  return result.data;
}
```

### React Native (Expo)

```typescript
import { useEffect, useState } from 'react';

interface Surat {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
}

export function useQuranSurat() {
  const [suratList, setSuratList] = useState<Surat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSurat() {
      try {
        const response = await fetch('https://equran.id/api/v2/surat');
        const result = await response.json();
        
        if (result.code === 200) {
          setSuratList(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Gagal mengambil data surat');
      } finally {
        setLoading(false);
      }
    }

    fetchSurat();
  }, []);

  return { suratList, loading, error };
}
```

---

## Integrasi dengan Aplikasi Murajaah

Untuk aplikasi murajaah hafalan Al-Quran, berikut contoh pengambilan data Juz 30:

```typescript
// Daftar surat Juz 30 (An-Naba sampai An-Nas)
const JUZ_30_SURAT = Array.from({ length: 37 }, (_, i) => 78 + i);
// [78, 79, 80, ..., 114]

async function getJuz30Data() {
  const promises = JUZ_30_SURAT.map(nomor =>
    fetch(`https://equran.id/api/v2/surat/${nomor}`)
      .then(res => res.json())
      .then(result => result.data)
  );
  
  return Promise.all(promises);
}

// Fungsi untuk mendapatkan audio ayat
function getAyatAudio(suratNomor: number, ayatNomor: number, qari: string = '05') {
  const suratPadded = String(suratNomor).padStart(3, '0');
  const ayatPadded = String(ayatNomor).padStart(3, '0');
  
  const qariNames: Record<string, string> = {
    '01': 'Abdullah-Al-Juhany',
    '02': 'Abdul-Muhsin-Al-Qasim',
    '03': 'Abdurrahman-as-Sudais',
    '04': 'Ibrahim-Al-Dossari',
    '05': 'Misyari-Rasyid-Al-Afasi',
    '06': 'Yasser-Al-Dosari'
  };
  
  return `https://cdn.equran.id/audio-partial/${qariNames[qari]}/${suratPadded}${ayatPadded}.mp3`;
}
```

---

## Error Handling

API akan mengembalikan response dengan status code yang sesuai:

| Status Code | Deskripsi                              |
|-------------|----------------------------------------|
| `200`       | Success - Data berhasil diambil        |
| `404`       | Not Found - Surat tidak ditemukan      |
| `500`       | Server Error - Terjadi kesalahan       |

**Contoh Error Response:**
```json
{
  "code": 404,
  "message": "Surat tidak ditemukan",
  "data": null
}
```

---

## Rate Limiting

> **Catatan:** API ini bersifat publik dan gratis. Gunakan dengan bijak dan hindari request berlebihan.

---

## Credits

- **API Provider:** [EQuran.id](https://equran.id)
- **Partner:** [Islamic Network](https://islamic.network), [Every Ayah](https://everyayah.com)

---

## Changelog

### v2.0
- Status wrapper response (code, message, data)
- Audio per ayat dari 6 qari terbaik
- CDN global untuk performa optimal
- Enhanced error handling
- Tafsir endpoint baru

---

*Dokumentasi ini dibuat untuk keperluan pengembangan aplikasi Murajaah Hafalan Quran.*
