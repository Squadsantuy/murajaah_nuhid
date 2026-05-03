import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      {/* Mobile container - centers content on large screens, full width on mobile */}
      <div className="mx-auto max-w-md bg-white h-screen shadow-2xl overflow-hidden relative flex flex-col">
        {children}
      </div>
    </div>
  );
};