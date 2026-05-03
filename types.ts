import React from 'react';

export interface Surah {
  number: number;
  name: string;      // Arabic Name
  latin: string;     // Latin Transliteration
  meaning: string;   // Indonesian Meaning
  ayahs: number;     // Number of Ayahs
  juz: number;       // Starting Juz
  type: 'Makkiyah' | 'Madaniyah';
}

export enum QuizType {
  MEANING = 'MEANING',
  NUMBER = 'NUMBER',
  AYAH_COUNT = 'AYAH_COUNT',
  JUZ = 'JUZ',
  TEBAK_AYAT = 'TEBAK_AYAT'
}

export type QuizMode = QuizType | 'RANDOM';

export interface Question {
  type: QuizType;
  questionText: React.ReactNode;
  correctAnswer: Surah;
  options: Surah[]; // 4 options including the correct one
}

export interface Stats {
  totalAnswered: number;
  correct: number;
  streak: number;
  bestStreak: number;
}

export interface DalilVerse {
  surahNumber: number;
  ayah: string; // string allows range like "183-185"
  description: string;
}

export interface DalilTopic {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  verses: DalilVerse[];
}