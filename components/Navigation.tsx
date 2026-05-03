import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  activeTab: 'study' | 'quiz' | 'dzikirdoa' | 'info' | 'sholat';
  onTabChange?: (tab: 'study' | 'quiz' | 'dzikirdoa' | 'info' | 'sholat') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();

  const handleTabClick = (tab: 'study' | 'quiz' | 'dzikirdoa' | 'info' | 'sholat') => {
    // Save last visit time on tab change (matches old transition logic)
    localStorage.setItem('murajaahqu_lastVisit', Date.now().toString());

    // Map internal tab names to friendly URLs
    let route = `/${tab}`;
    if (tab === 'study') route = '/surat';
    if (tab === 'sholat') route = '/sholat';
    if (tab === 'quiz') route = '/murajaah';
    if (tab === 'dzikirdoa') route = '/dzikir-doa';

    // Switch route
    navigate(route);

    // Call optional callback if provided
    if (onTabChange) onTabChange(tab);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-md bg-gradient-to-r from-primary-600 to-primary-500 shadow-lg pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-5 h-16">
          <button
            id="nav-surat"
            onClick={() => handleTabClick('study')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'study' ? 'text-white' : 'text-white/60 hover:text-white/80'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={activeTab === 'study' ? 2 : 1.5} stroke="currentColor" className="w-6 h-6 mb-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
            </svg>
            <span className="text-[10px] font-medium">Surat</span>
          </button>

          <button
            id="nav-sholat"
            onClick={() => handleTabClick('sholat')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'sholat' ? 'text-white' : 'text-white/60 hover:text-white/80'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={activeTab === 'sholat' ? 2 : 1.5} stroke="currentColor" className="w-6 h-6 mb-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[10px] font-medium">Sholat</span>
          </button>

          <button
            id="nav-murajaah"
            onClick={() => handleTabClick('quiz')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'quiz' ? 'text-white' : 'text-white/60 hover:text-white/80'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={activeTab === 'quiz' ? 2 : 1.5} stroke="currentColor" className="w-6 h-6 mb-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
            <span className="text-[10px] font-medium">Murajaah</span>
          </button>

          <button
            id="nav-dzikir-doa"
            onClick={() => handleTabClick('dzikirdoa')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'dzikirdoa' ? 'text-white' : 'text-white/60 hover:text-white/80'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={activeTab === 'dzikirdoa' ? 2 : 1.5} stroke="currentColor" className="w-6 h-6 mb-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
            </svg>
            <span className="text-[10px] font-medium">Amalan</span>
          </button>

          <button
            id="nav-info"
            onClick={() => handleTabClick('info')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'info' ? 'text-white' : 'text-white/60 hover:text-white/80'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={activeTab === 'info' ? 2 : 1.5} stroke="currentColor" className="w-6 h-6 mb-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <span className="text-[10px] font-medium">Info</span>
          </button>
        </div>
      </div>
    </nav>
  );
};