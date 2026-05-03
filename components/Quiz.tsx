import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Surah, QuizType, Question, Stats, QuizMode } from '../types';
import { SURAH_DATA } from '../constants';
import confetti from 'canvas-confetti';
import { QuizSettings } from './QuizSettings';

const TIMER_SECONDS = 10;

interface QuizProps {
  mode: QuizMode;
  onBack: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ mode, onBack }) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Settings State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedJuz, setSelectedJuz] = useState<number[]>(
    Array.from({ length: 30 }, (_, i) => i + 1)
  );

  const [stats, setStats] = useState<Stats>(() => {
    try {
      const saved = localStorage.getItem('murojaahStats');
      return saved ? JSON.parse(saved) : { totalAnswered: 0, correct: 0, streak: 0, bestStreak: 0 };
    } catch (e) {
      return { totalAnswered: 0, correct: 0, streak: 0, bestStreak: 0 };
    }
  });

  useEffect(() => {
    localStorage.setItem('murojaahStats', JSON.stringify(stats));
  }, [stats]);

  const generateQuestion = useCallback(() => {
    // Filter SURAH_DATA based on selectedJuz
    const availableSurahs = SURAH_DATA.filter(s => selectedJuz.includes(s.juz));

    // Fallback if filtering results in empty array
    const dataPool = availableSurahs.length > 0 ? availableSurahs : SURAH_DATA;

    const randomSurahIndex = Math.floor(Math.random() * dataPool.length);
    const correctSurah = dataPool[randomSurahIndex];

    // Determine Type
    let type: QuizType;
    if (mode === 'RANDOM') {
      const types = [QuizType.MEANING, QuizType.NUMBER, QuizType.AYAH_COUNT, QuizType.JUZ];
      type = types[Math.floor(Math.random() * types.length)];
    } else {
      type = mode;
    }

    let questionText: React.ReactNode;

    const arabicName = (
      <span className="mx-1 inline-block">
        (<span className="font-arabic text-primary-600 text-2xl" dir="rtl">{correctSurah.name}</span>)
      </span>
    );

    const latinName = <span className="font-bold">{correctSurah.latin}</span>;

    switch (type) {
      case QuizType.MEANING:
        questionText = <span>Apa arti dari surat {latinName} {arabicName}?</span>;
        break;
      case QuizType.NUMBER:
        questionText = <span>Surat {latinName} {arabicName} adalah surat ke urutan...</span>;
        break;
      case QuizType.AYAH_COUNT:
        questionText = <span>Berapa jumlah ayat dalam surat {latinName} {arabicName}?</span>;
        break;
      case QuizType.JUZ:
        questionText = <span>Surat {latinName} {arabicName} terdapat pada Juz...</span>;
        break;
    }

    // Generate wrong options
    const options = [correctSurah];
    let attempts = 0;
    const MAX_ATTEMPTS = 50; // Safety break to prevent infinite loops

    while (options.length < 4 && attempts < MAX_ATTEMPTS) {
      attempts++;

      // Use full pool if type is JUZ or dataPool is too small
      const useFullPool = (type === QuizType.JUZ) || (dataPool.length < 4);
      const poolForOptions = useFullPool ? SURAH_DATA : dataPool;

      const randomOption = poolForOptions[Math.floor(Math.random() * poolForOptions.length)];

      let isUnique = !options.some(o => o.number === randomOption.number);

      if (isUnique) {
        if (type === QuizType.JUZ && randomOption.juz === correctSurah.juz) isUnique = false;
        if (type === QuizType.AYAH_COUNT && randomOption.ayahs === correctSurah.ayahs) isUnique = false;
        if (type === QuizType.MEANING && randomOption.meaning === correctSurah.meaning) isUnique = false;
      }

      if (isUnique) {
        const existingValues = options.map(o => {
          if (type === QuizType.JUZ) return o.juz;
          if (type === QuizType.AYAH_COUNT) return o.ayahs;
          return o.number;
        });

        let currentValue;
        if (type === QuizType.JUZ) currentValue = randomOption.juz;
        else if (type === QuizType.AYAH_COUNT) currentValue = randomOption.ayahs;
        else currentValue = randomOption.number;

        if (existingValues.includes(currentValue)) isUnique = false;
      }

      if (isUnique) {
        options.push(randomOption);
      }
    }

    // Shuffle options
    const shuffledOptions = options.sort(() => Math.random() - 0.5);

    setQuestion({
      type,
      questionText,
      correctAnswer: correctSurah,
      options: shuffledOptions
    });
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setTimeLeft(TIMER_SECONDS);
  }, [mode, selectedJuz]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  // Timer countdown effect
  useEffect(() => {
    if (isAnswered || !question) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up - auto-mark as wrong
          clearInterval(timerRef.current!);
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
  }, [question, isAnswered]);

  const handleAnswer = (surah: Surah) => {
    if (isAnswered || !question) return;

    // Stop timer when answered
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const correct = surah.number === question.correctAnswer.number;
    setIsAnswered(true);
    setIsCorrect(correct);
    setSelectedOption(surah.number);

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

  const renderOptionContent = (surah: Surah) => {
    if (!question) return null;
    switch (question.type) {
      case QuizType.MEANING: return surah.meaning;
      case QuizType.NUMBER: return `Ke-${surah.number}`;
      case QuizType.AYAH_COUNT: return `${surah.ayahs} Ayat`;
      case QuizType.JUZ: return `Juz ${surah.juz}`;
      default: return surah.latin;
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'RANDOM': return 'Murojaah Random';
      case QuizType.NUMBER: return 'Murojaah Nomor';
      case QuizType.MEANING: return 'Murojaah Arti';
      case QuizType.AYAH_COUNT: return 'Murojaah Ayat';
      case QuizType.JUZ: return 'Murojaah Juz';
      default: return 'Kuis';
    }
  }

  const getHeaderColor = () => {
    switch (mode) {
      case 'RANDOM': return 'from-primary-600 to-primary-500';
      case QuizType.NUMBER: return 'from-indigo-600 to-indigo-500';
      case QuizType.MEANING: return 'from-emerald-600 to-teal-500';
      case QuizType.AYAH_COUNT: return 'from-amber-600 to-orange-500';
      case QuizType.JUZ: return 'from-rose-600 to-pink-500';
      default: return 'from-primary-600 to-primary-500';
    }
  }

  if (!question) return <div className="p-10 text-center">Memuat...</div>;

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      {/* Quiz Header */}
      <div className={`flex-none bg-gradient-to-r ${getHeaderColor()} z-20 px-4 py-4 shadow-sm`}>
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
              <h2 className="font-bold text-white text-lg leading-tight">{getTitle()}</h2>
              <p className="text-xs text-white/70">
                {selectedJuz.length === 30 ? 'Semua Juz' : `${selectedJuz.length} Juz Dipilih`}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
          </button>
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
            <div className={`text-2xl font-bold ${timeLeft <= 3 ? 'text-red-300 animate-pulse' : 'text-white'}`}>
              {isAnswered ? '—' : timeLeft}
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
            className={`h-1.5 rounded-full transition-all duration-1000 ${timeLeft <= 3 ? 'bg-red-400' : 'bg-white'}`}
            style={{ width: isAnswered ? '0%' : `${(timeLeft / TIMER_SECONDS) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center mb-4 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-50 rounded-full opacity-50 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-50 text-primary-600 mb-3">
              <span className="font-bold text-base">?</span>
            </div>
            <h2 className="text-lg font-bold text-slate-800 leading-snug">
              {question.questionText}
            </h2>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-2.5">
          {question.options.map((option) => {
            const isSelected = selectedOption === option.number;
            const isCorrectOption = option.number === question.correctAnswer.number;

            let buttonStyle = "bg-white border-slate-200 text-slate-700 hover:border-primary-300 hover:bg-primary-50";

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
                {renderOptionContent(option)}
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
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg shadow-primary-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${isCorrect ? 'bg-primary-600 hover:bg-primary-700' : 'bg-slate-800 hover:bg-slate-900'
              }`}
          >
            <span>{isCorrect ? 'Lanjut' : 'Coba Lagi'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      )}

      {/* Settings Modal */}
      <QuizSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentSelectedJuz={selectedJuz}
        onSave={(newSelection) => setSelectedJuz(newSelection)}
      />
    </div>
  );
};