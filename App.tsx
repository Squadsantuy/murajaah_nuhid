import { useState } from 'react';
import { Layout } from './components/Layout';
import { Navigation } from './components/Navigation';
import { SurahList } from './components/SurahList';
import { MurojaahView } from './components/MurojaahView';
import { DzikirView } from './components/DzikirView';
import { DoaView } from './components/DoaView';
import { InfoView } from './components/InfoView';
import { SplashScreen } from './components/SplashScreen';
import { InstallPrompt } from './components/InstallPrompt';
import { OnboardingTutorial } from './components/OnboardingTutorial';
import { BookmarksView } from './components/BookmarksView';
import { DzikirDoaView } from './components/DzikirDoaView';
import { PrayerTimeView } from './components/PrayerTimeView';
import { BookmarkProvider } from './context/BookmarkContext';
import { usePushNotifications } from './hooks/usePushNotifications';

import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Splash screen akan muncul lagi setelah 24 jam tidak membuka aplikasi
const SPLASH_EXPIRY_HOURS = 24;

function App() {
  const location = useLocation();
  usePushNotifications();

  // Check if splash should be shown based on last visit time
  const [showSplash, setShowSplash] = useState(() => {
    const lastVisit = localStorage.getItem('murajaahqu_lastVisit');
    if (!lastVisit) return true;

    const lastVisitTime = parseInt(lastVisit, 10);
    const now = Date.now();
    const hoursSinceLastVisit = (now - lastVisitTime) / (1000 * 60 * 60);

    // Show splash if more than SPLASH_EXPIRY_HOURS have passed
    return hoursSinceLastVisit >= SPLASH_EXPIRY_HOURS;
  });

  // Save timestamp when splash is dismissed
  const handleStartApp = () => {
    localStorage.setItem('murajaahqu_lastVisit', Date.now().toString());
    setShowSplash(false);
  };

  if (showSplash) {
    return (
      <Layout>
        <SplashScreen onStart={handleStartApp} />
      </Layout>
    );
  }

  // Determine active tab for Navigation based on path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.startsWith('/surat')) return 'study';
    if (path.startsWith('/sholat')) return 'sholat';
    if (path.startsWith('/murajaah')) return 'quiz';
    if (path.startsWith('/dzikir') || path.startsWith('/doa') || path.startsWith('/dzikir-doa')) return 'dzikirdoa';
    if (path.startsWith('/info')) return 'info';
    return 'study';
  };

  return (
    <Layout>
      <BookmarkProvider>
        <main className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/surat" element={<SurahList />} />
            <Route path="/surat/:nomor" element={<SurahList />} />
            <Route path="/sholat" element={<PrayerTimeView />} />
            <Route path="/murajaah" element={<MurojaahView />} />
            <Route path="/murajaah/:mode" element={<MurojaahView />} />
            <Route path="/murajaah/:mode/:id" element={<MurojaahView />} />
            <Route path="/dzikir-doa" element={<DzikirDoaView />} />
            <Route path="/dzikir" element={<DzikirView />} />
            <Route path="/dzikir/:type" element={<DzikirView />} />
            <Route path="/doa" element={<DoaView />} />
            <Route path="/doa/:id" element={<DoaView />} />
            <Route path="/bacaan-terakhir" element={<BookmarksView />} />
            <Route path="/info" element={<InfoView />} />

            {/* Legacy Redirects */}
            <Route path="/study" element={<Navigate to="/surat" replace />} />
            <Route path="/study/:nomor" element={<Navigate to="/surat" replace />} />
            <Route path="/quiz" element={<Navigate to="/murajaah" replace />} />
            <Route path="/quiz/:mode" element={<Navigate to="/murajaah" replace />} />
            <Route path="/bookmarks" element={<Navigate to="/bacaan-terakhir" replace />} />

            <Route path="/" element={<Navigate to="/surat" replace />} />
          </Routes>
        </main>
        <Navigation activeTab={getActiveTab()} />
        <InstallPrompt />
        <OnboardingTutorial />
      </BookmarkProvider>
    </Layout>
  );
}

export default App;