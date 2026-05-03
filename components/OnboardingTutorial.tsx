import React, { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

const TUTORIAL_STORAGE_KEY = 'murajaahqu_tutorialCompleted';

interface OnboardingTutorialProps {
    onComplete?: () => void;
}

export const OnboardingTutorial: React.FC<OnboardingTutorialProps> = ({ onComplete }) => {
    const [run, setRun] = useState(false);

    const steps: Step[] = [
        {
            target: 'body',
            content: (
                <div className="text-center">
                    <h2 className="text-xl font-bold text-primary-600 mb-2">Selamat Datang di MurajaahQu!</h2>
                    <p className="text-slate-600">Mari kenali fitur-fitur aplikasi ini untuk membantu hafalan Al-Quran Anda.</p>
                </div>
            ),
            placement: 'center',
            disableBeacon: true,
        },
        {
            target: '#nav-surat',
            content: (
                <div>
                    <h3 className="font-bold text-primary-600 mb-1">Menu Surat</h3>
                    <p className="text-slate-600 text-sm">Lihat daftar surat Al-Quran. Anda bisa membaca, mendengarkan audio, dan melihat terjemahan di sini.</p>
                </div>
            ),
            disableBeacon: true,
        },
        {
            target: '#btn-juz-filter',
            content: (
                <div>
                    <h3 className="font-bold text-primary-600 mb-1">Filter Juz</h3>
                    <p className="text-slate-600 text-sm">Gunakan tombol ini untuk memfilter surat berdasarkan Juz. Pilih Juz 1-30 untuk melihat surat yang ada di Juz tersebut.</p>
                </div>
            ),
            disableBeacon: true,
        },
        {
            target: '#nav-murajaah',
            content: (
                <div>
                    <h3 className="font-bold text-primary-600 mb-1">Menu Murajaah</h3>
                    <p className="text-slate-600 text-sm">Latihan hafalan dengan berbagai mode: tebak nomor surat, arti, jumlah ayat, dan lainnya.</p>
                </div>
            ),
            disableBeacon: true,
        },
        {
            target: '#nav-dzikir',
            content: (
                <div>
                    <h3 className="font-bold text-primary-600 mb-1">Menu Dzikir</h3>
                    <p className="text-slate-600 text-sm">Baca dzikir pagi dan petang lengkap dengan terjemahan dan dalil.</p>
                </div>
            ),
            disableBeacon: true,
        },
        {
            target: '#nav-info',
            content: (
                <div>
                    <h3 className="font-bold text-primary-600 mb-1">Menu Info</h3>
                    <p className="text-slate-600 text-sm">Lihat statistik hafalan, tentang aplikasi, dan informasi lainnya.</p>
                </div>
            ),
            disableBeacon: true,
        },
        {
            target: 'body',
            content: (
                <div className="text-center">
                    <h2 className="text-xl font-bold text-primary-600 mb-2">Siap Memulai!</h2>
                    <p className="text-slate-600">Semoga aplikasi ini bermanfaat untuk murajaah hafalan Anda. Barakallahu fiikum!</p>
                </div>
            ),
            placement: 'center',
            disableBeacon: true,
        },
    ];

    useEffect(() => {
        // Check if tutorial has been completed
        const tutorialCompleted = localStorage.getItem(TUTORIAL_STORAGE_KEY);
        if (!tutorialCompleted) {
            // Delay to ensure all elements are mounted
            const timer = setTimeout(() => setRun(true), 500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleCallback = (data: CallBackProps) => {
        const { status } = data;
        const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status)) {
            setRun(false);
            localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
            onComplete?.();
        }
    };

    return (
        <Joyride
            steps={steps}
            run={run}
            continuous
            showProgress
            showSkipButton
            scrollToFirstStep
            callback={handleCallback}
            locale={{
                back: 'Kembali',
                close: 'Tutup',
                last: 'Selesai',
                next: 'Lanjut',
                skip: 'Lewati',
            }}
            styles={{
                options: {
                    primaryColor: '#059669', // primary-600
                    textColor: '#334155', // slate-700
                    backgroundColor: '#ffffff',
                    arrowColor: '#ffffff',
                    overlayColor: 'rgba(0, 0, 0, 0.75)',
                    zIndex: 10000,
                },
                tooltip: {
                    borderRadius: 16,
                    padding: 20,
                },
                tooltipContent: {
                    padding: '8px 0',
                },
                buttonNext: {
                    backgroundColor: '#059669',
                    borderRadius: 8,
                    padding: '8px 16px',
                    fontSize: 14,
                    fontWeight: 600,
                },
                buttonBack: {
                    color: '#64748b',
                    marginRight: 8,
                    fontSize: 14,
                },
                buttonSkip: {
                    color: '#94a3b8',
                    fontSize: 13,
                },
                spotlight: {
                    borderRadius: 12,
                },
            }}
            floaterProps={{
                disableAnimation: true,
            }}
        />
    );
};
