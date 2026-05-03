import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Stats } from '../types';
import { QURAN_HAFALAN_DATA, QuranSurah } from '../quranData';
import { getAyatAudioUrl, QariCode } from '../services/quranApi';
import confetti from 'canvas-confetti';

const TIMER_SECONDS = 10;

interface TebakAyatQuizProps {
    onBack: () => void;
}

interface QuestionData {
    surah: QuranSurah;
    ayatNumber: number;
    audioUrl: string;
    options: QuranSurah[];
}

export const TebakAyatQuiz: React.FC<TebakAyatQuizProps> = ({ onBack }) => {
    const [question, setQuestion] = useState<QuestionData | null>(null);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number | null>(null); // null = timer not started
    const [isTimerActive, setIsTimerActive] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const [stats, setStats] = useState<Stats>(() => {
        try {
            const saved = localStorage.getItem('murojaahTebakAyatStats');
            return saved ? JSON.parse(saved) : { totalAnswered: 0, correct: 0, streak: 0, bestStreak: 0 };
        } catch (e) {
            return { totalAnswered: 0, correct: 0, streak: 0, bestStreak: 0 };
        }
    });

    useEffect(() => {
        localStorage.setItem('murojaahTebakAyatStats', JSON.stringify(stats));
    }, [stats]);

    const generateQuestion = useCallback(() => {
        // Pick random surah from Juz 30 data that has more than 1 verse
        // (We need at least 2 verses to avoid picking the first verse)
        let correctSurah: QuranSurah;
        let attempts = 0;
        const maxAttempts = 50;

        do {
            const randomSurahIndex = Math.floor(Math.random() * QURAN_HAFALAN_DATA.length);
            correctSurah = QURAN_HAFALAN_DATA[randomSurahIndex];
            attempts++;
        } while (correctSurah.verses.length <= 1 && attempts < maxAttempts);

        // Pick random ayat from the surah, but NEVER the first verse (ayat 1)
        // because the first verse is too easy to identify
        const versesWithoutFirst = correctSurah.verses.filter(v => v.number !== 1);
        const randomAyatIndex = Math.floor(Math.random() * versesWithoutFirst.length);
        const ayatNumber = versesWithoutFirst[randomAyatIndex].number;

        // Generate audio URL using Yasser Al-Dosari (qari code '06')
        const audioUrl = getAyatAudioUrl(correctSurah.number, ayatNumber, '06' as QariCode);

        // Generate 3 wrong options
        const options: QuranSurah[] = [correctSurah];
        const usedNumbers = new Set([correctSurah.number]);

        while (options.length < 4) {
            const randomOption = QURAN_HAFALAN_DATA[Math.floor(Math.random() * QURAN_HAFALAN_DATA.length)];
            if (!usedNumbers.has(randomOption.number)) {
                options.push(randomOption);
                usedNumbers.add(randomOption.number);
            }
        }

        // Shuffle options
        const shuffledOptions = options.sort(() => Math.random() - 0.5);

        setQuestion({
            surah: correctSurah,
            ayatNumber,
            audioUrl,
            options: shuffledOptions
        });
        setSelectedOption(null);
        setIsAnswered(false);
        setIsCorrect(false);
        setIsPlaying(false);
        setHasPlayedOnce(false);
        setTimeLeft(null);
        setIsTimerActive(false);

        // Stop timer if running
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        // Stop current audio if playing
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
    }, []);

    useEffect(() => {
        generateQuestion();
    }, [generateQuestion]);

    // Timer countdown effect - starts when isTimerActive becomes true
    useEffect(() => {
        if (!isTimerActive || isAnswered || timeLeft === null) return;

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev === null || prev <= 1) {
                    // Time's up - auto-mark as wrong
                    clearInterval(timerRef.current!);
                    setIsTimerActive(false);
                    setIsAnswered(true);
                    setIsCorrect(false);
                    setStats(s => ({
                        ...s,
                        totalAnswered: s.totalAnswered + 1,
                        streak: 0
                    }));
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isTimerActive, isAnswered, timeLeft]);

    const playAudio = () => {
        if (!question) return;

        if (audioRef.current) {
            audioRef.current.pause();
        }

        setIsLoading(true);
        const audio = new Audio(question.audioUrl);
        audioRef.current = audio;

        audio.addEventListener('canplaythrough', () => {
            setIsLoading(false);
            setIsPlaying(true);
            audio.play();
        });

        audio.addEventListener('ended', () => {
            setIsPlaying(false);
            setHasPlayedOnce(true);
            // Start timer after audio ends (only on FIRST play - don't reset if already started)
            if (!isAnswered && timeLeft === null) {
                setTimeLeft(TIMER_SECONDS);
                setIsTimerActive(true);
            }
        });

        audio.addEventListener('error', () => {
            setIsLoading(false);
            setIsPlaying(false);
            console.error('Error loading audio');
        });

        audio.load();
    };

    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleAnswer = (surah: QuranSurah) => {
        if (isAnswered || !question) return;

        // Stop timer when answered
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        setIsTimerActive(false);

        const correct = surah.number === question.surah.number;
        setIsAnswered(true);
        setIsCorrect(correct);
        setSelectedOption(surah.number);

        // Stop audio when answered
        stopAudio();

        if (correct) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#10b981', '#34d399', '#fcd34d']
            });

            setStats(prev => ({
                ...prev,
                totalAnswered: prev.totalAnswered + 1,
                correct: prev.correct + 1,
                streak: prev.streak + 1,
                bestStreak: Math.max(prev.bestStreak, prev.streak + 1)
            }));
        } else {
            setStats(prev => ({
                ...prev,
                totalAnswered: prev.totalAnswered + 1,
                streak: 0
            }));
        }
    };

    // Cleanup audio on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    if (!question) return <div className="p-10 text-center">Memuat...</div>;

    return (
        <div className="flex flex-col h-full bg-slate-50 relative">
            {/* Quiz Header */}
            <div className="flex-none bg-gradient-to-r from-violet-600 to-purple-500 z-20 px-4 py-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className="p-2 -ml-2 rounded-full hover:bg-white/20 text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <div>
                            <h2 className="font-bold text-white text-lg leading-tight">Murajaah Tebak Ayat</h2>
                            <p className="text-xs text-white/70">
                                Juz 30 - Dengarkan & Tebak
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <div>
                        <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Streak</span>
                        <div className="flex items-center gap-1">
                            <span className="text-2xl font-bold text-white">{stats.streak}</span>
                            <span className="text-amber-300 text-lg">🔥</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Timer</span>
                        <div className={`text-2xl font-bold ${timeLeft !== null && timeLeft <= 3 ? 'text-red-300 animate-pulse' : 'text-white'}`}>
                            {isAnswered || timeLeft === null ? '—' : timeLeft}
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Akurasi</span>
                        <div className="text-xl font-bold text-white">
                            {stats.totalAnswered > 0 ? Math.round((stats.correct / stats.totalAnswered) * 100) : 0}%
                        </div>
                    </div>
                </div>

                <div className="w-full bg-white/20 rounded-full h-1.5 mb-2">
                    <div
                        className={`h-1.5 rounded-full transition-all duration-1000 ${timeLeft !== null && timeLeft <= 3 ? 'bg-red-400' : 'bg-white'}`}
                        style={{ width: isAnswered ? '0%' : (timeLeft === null ? '100%' : `${(timeLeft / TIMER_SECONDS) * 100}%`) }}
                    ></div>
                </div>
            </div>

            {/* Audio Player Card */}
            <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center mb-4 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-50 rounded-full opacity-50 pointer-events-none"></div>

                    <div className="relative z-10">
                        {/* Audio Icon */}
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-100 text-violet-600 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                            </svg>
                        </div>

                        {/* Play Button */}
                        <button
                            onClick={isPlaying ? stopAudio : playAudio}
                            disabled={isLoading}
                            className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 mb-4 ${isLoading
                                ? 'bg-slate-400 cursor-not-allowed'
                                : isPlaying
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : 'bg-violet-600 hover:bg-violet-700 shadow-violet-500/30'
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Memuat Audio...</span>
                                </>
                            ) : isPlaying ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                                    </svg>
                                    <span>Berhenti</span>
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                    </svg>
                                    <span>{hasPlayedOnce ? 'Putar Ulang' : 'Putar Audio Ayat'}</span>
                                </>
                            )}
                        </button>

                        <h2 className="text-lg font-bold text-slate-800 leading-snug">
                            Ayat ini dari surat apa?
                        </h2>
                        {isAnswered && (
                            <p className="text-sm text-slate-500 mt-2">
                                Jawaban: <span className="font-arabic text-violet-600 text-xl" dir="rtl">{question.surah.name}</span> ({question.surah.latin}) - Ayat {question.ayatNumber}
                            </p>
                        )}
                    </div>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 gap-2.5">
                    {question.options.map((option) => {
                        const isSelected = selectedOption === option.number;
                        const isCorrectOption = option.number === question.surah.number;

                        let buttonStyle = "bg-white border-slate-200 text-slate-700 hover:border-violet-300 hover:bg-violet-50";

                        if (isAnswered) {
                            if (isCorrectOption) {
                                buttonStyle = "bg-green-100 border-green-500 text-green-800 ring-1 ring-green-500";
                            } else if (isSelected && !isCorrectOption) {
                                buttonStyle = "bg-red-50 border-red-300 text-red-800";
                            } else {
                                buttonStyle = "bg-slate-50 border-slate-100 text-slate-400 opacity-60";
                            }
                        }

                        return (
                            <button
                                key={option.number}
                                onClick={() => handleAnswer(option)}
                                disabled={isAnswered}
                                className={`relative w-full p-3.5 rounded-xl border-2 text-base font-medium transition-all duration-200 shadow-sm active:scale-[0.98] ${buttonStyle}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="font-arabic text-xl" dir="rtl">{option.name}</span>
                                        <span className="text-slate-400">|</span>
                                        <span>{option.latin}</span>
                                    </div>
                                    <span className="text-slate-400 text-sm">{option.totalVerses} ayat</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Result Action Sheet */}
            {isAnswered && (
                <div className="fixed bottom-20 left-0 right-0 z-40 mx-auto max-w-md px-6">
                    <button
                        onClick={generateQuestion}
                        className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg shadow-violet-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${isCorrect ? 'bg-violet-600 hover:bg-violet-700' : 'bg-slate-800 hover:bg-slate-900'
                            }`}
                    >
                        <span>{isCorrect ? 'Lanjut' : 'Coba Lagi'}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};
