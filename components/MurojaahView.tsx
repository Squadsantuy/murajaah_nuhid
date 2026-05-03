import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MurojaahMenu } from './MurojaahMenu';
import { Quiz } from './Quiz';
import { HafalanView } from './HafalanView';
import { TebakAyatQuiz } from './TebakAyatQuiz';
import { QuizMode } from '../types';

export const MurojaahView: React.FC = () => {
  const navigate = useNavigate();
  const { mode } = useParams();
  const selectedMode = mode ? mode.toUpperCase() : null;

  if (selectedMode === 'HAFALAN') {
    return <HafalanView onBack={() => navigate('/murajaah')} />;
  }

  if (selectedMode === 'TEBAK_AYAT') {
    return <TebakAyatQuiz onBack={() => navigate('/murajaah')} />;
  }

  if (selectedMode) {
    return <Quiz mode={selectedMode as QuizMode} onBack={() => navigate('/murajaah')} />;
  }

  return <MurojaahMenu onSelectMode={(m) => navigate(`/murajaah/${m.toLowerCase()}`)} />;
};