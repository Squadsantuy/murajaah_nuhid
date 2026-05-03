import React, { useState, useEffect } from 'react';

interface JuzFilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentSelectedJuz: number | null;
    onSave: (selected: number | null) => void;
}

export const JuzFilterModal: React.FC<JuzFilterModalProps> = ({ isOpen, onClose, currentSelectedJuz, onSave }) => {
    const [tempSelected, setTempSelected] = useState<number | null>(currentSelectedJuz);
    const [showManual, setShowManual] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    // Handle open/close animations
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setIsClosing(false);
            setTempSelected(currentSelectedJuz);
        } else if (isVisible) {
            setIsClosing(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                setIsClosing(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen, currentSelectedJuz, isVisible]);

    const selectJuz = (juz: number | null) => {
        setTempSelected(juz);
    };

    const handleSave = () => {
        onSave(tempSelected);
        onClose();
    };

    const presets = [
        { label: 'Semua Juz', value: null },
        { label: 'Juz Amma (30)', value: 30 },
        { label: 'Juz 29 (Tabarak)', value: 29 },
        { label: 'Juz 28', value: 28 },
    ];

    if (!isVisible) return null;

    return (
        <div className="fixed top-0 left-0 right-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-40 flex items-end justify-center sm:items-center pointer-events-none">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto ${isClosing ? 'opacity-0' : 'opacity-100'
                    }`}
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className={`relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[85vh] flex flex-col pointer-events-auto ${isClosing ? 'animate-slide-down-juz' : 'animate-slide-up-juz'
                }`}>
                {/* Handle bar */}
                <div className="mx-auto w-12 h-1.5 bg-slate-200 rounded-full mt-3 mb-4"></div>

                <div className="px-6 pb-2">
                    <h2 className="text-xl font-bold text-slate-800">Filter Juz</h2>
                    <p className="text-sm text-slate-500">Pilih juz untuk menampilkan surat</p>
                </div>

                <div className="overflow-y-auto flex-1 no-scrollbar px-6 py-4 space-y-6">

                    {/* Presets Section */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pilihan Cepat</label>
                        <div className="grid grid-cols-1 gap-2">
                            {presets.map((preset) => {
                                const isSelected = tempSelected === preset.value;
                                return (
                                    <button
                                        key={preset.label}
                                        onClick={() => selectJuz(preset.value)}
                                        className={`w-full py-3 px-4 rounded-xl text-left font-medium transition-all flex items-center justify-between ${isSelected
                                            ? 'bg-primary-50 text-primary-700 ring-1 ring-primary-500'
                                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                                            }`}
                                    >
                                        <span>{preset.label}</span>
                                        {isSelected && (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary-600">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Manual Selection Accordion */}
                    <div>
                        <button
                            onClick={() => setShowManual(!showManual)}
                            className="w-full flex items-center justify-between py-2 text-slate-500 font-medium hover:text-slate-800 transition-colors"
                        >
                            <span className="text-xs font-bold uppercase tracking-wider">Pilih Manual</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform ${showManual ? 'rotate-180' : ''}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>

                        {showManual && (
                            <div className="grid grid-cols-5 gap-2 mt-3 animate-fade-in-juz pb-2">
                                {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => {
                                    const isSelected = tempSelected === num;
                                    return (
                                        <button
                                            key={num}
                                            onClick={() => selectJuz(num)}
                                            className={`aspect-square rounded-lg flex items-center justify-center text-sm font-bold transition-all ${isSelected
                                                ? 'bg-primary-500 text-white shadow-sm'
                                                : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                                }`}
                                        >
                                            {num}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="px-6 pb-6 pt-2 flex gap-3 bg-white">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3.5 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-[2] py-3.5 rounded-xl font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all active:scale-[0.98]"
                    >
                        Terapkan
                    </button>
                </div>
            </div>

            <style>{`
        @keyframes slide-up-juz {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes slide-down-juz {
          from { transform: translateY(0); }
          to { transform: translateY(100%); }
        }
        .animate-slide-up-juz {
          animation: slide-up-juz 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-down-juz {
          animation: slide-down-juz 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fade-in-juz {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-juz {
          animation: fade-in-juz 0.2s ease-out;
        }
      `}</style>
        </div>
    );
};
