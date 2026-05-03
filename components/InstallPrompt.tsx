import React, { useState, useEffect } from 'react';
import { useInstallPrompt } from '../hooks/useInstallPrompt';

export const InstallPrompt: React.FC = () => {
    const { deferredPrompt, isInstalled, installApp } = useInstallPrompt();
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        if (deferredPrompt && !isInstalled) {
            // Check dismissal
            const dismissedAt = localStorage.getItem('pwa-install-dismissed');
            if (dismissedAt) {
                const daysSinceDismissed = (Date.now() - parseInt(dismissedAt)) / (1000 * 60 * 60 * 24);
                if (daysSinceDismissed < 7) return;
            }

            // Show prompt after 3 seconds
            const timer = setTimeout(() => setShowPrompt(true), 3000);
            return () => clearTimeout(timer);
        } else {
            setShowPrompt(false);
        }
    }, [deferredPrompt, isInstalled]);

    const handleInstall = async () => {
        await installApp();
        setShowPrompt(false);
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    };

    if (!showPrompt || isInstalled) return null;

    return (
        <div className="fixed bottom-20 left-4 right-4 z-50 animate-slide-up">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-2xl p-4 mx-auto max-w-sm">
                <div className="flex items-start gap-3">
                    {/* App Icon */}
                    <div className="flex-shrink-0">
                        <img
                            src="/pwa-192x192.png"
                            alt="MurajaahQu"
                            className="w-12 h-12 rounded-xl shadow-lg"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-sm">
                            Install MurajaahQu
                        </h3>
                        <p className="text-emerald-100 text-xs mt-0.5">
                            Akses lebih cepat & bisa offline
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={handleInstall}
                                className="flex-1 bg-white text-emerald-700 font-semibold text-xs py-2 px-3 rounded-lg hover:bg-emerald-50 transition-colors"
                            >
                                Install
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="text-emerald-200 text-xs py-2 px-3 hover:text-white transition-colors"
                            >
                                Nanti
                            </button>
                        </div>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={handleDismiss}
                        className="text-emerald-200 hover:text-white transition-colors p-1"
                        aria-label="Tutup"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
