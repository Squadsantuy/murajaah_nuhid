import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface Bookmark {
    surahNo: number;
    surahName: string;
    ayatNo: number;
    arabicText: string;
    id: string;
    timestamp: number;
}

export interface LastRead {
    surahNo: number;
    surahName: string;
    ayatNo: number;
    timestamp: number;
}

interface BookmarkContextType {
    bookmarks: Bookmark[];
    lastRead: LastRead | null;
    addBookmark: (bookmark: Omit<Bookmark, 'timestamp'>) => void;
    removeBookmark: (id: string) => void;
    isBookmarked: (id: string) => boolean;
    toggleBookmark: (bookmark: Omit<Bookmark, 'timestamp'>) => void;
    setLastRead: (data: Omit<LastRead, 'timestamp'>) => void;
}

const STORAGE_KEY = 'murajaahqu_bookmarks';
const LAST_READ_KEY = 'murajaahqu_last_read';

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });

    const [lastRead, setLastReadState] = useState<LastRead | null>(() => {
        try {
            const saved = localStorage.getItem(LAST_READ_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            return null;
        }
    });

    // Sync to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    }, [bookmarks]);

    const setLastRead = useCallback((data: Omit<LastRead, 'timestamp'>) => {
        const newLastRead = { ...data, timestamp: Date.now() };
        setLastReadState(newLastRead);
        localStorage.setItem(LAST_READ_KEY, JSON.stringify(newLastRead));
    }, []);

    const addBookmark = useCallback((bookmark: Omit<Bookmark, 'timestamp'>) => {
        const newBookmark: Bookmark = { ...bookmark, timestamp: Date.now() };
        setBookmarks([newBookmark]); // Replaces previous bookmark

        setLastRead({
            surahNo: bookmark.surahNo,
            surahName: bookmark.surahName,
            ayatNo: bookmark.ayatNo
        });
    }, [setLastRead]);

    const removeBookmark = useCallback((id: string) => {
        setBookmarks(prev => prev.filter(b => b.id !== id));
    }, []);

    const isBookmarked = useCallback((id: string) => {
        return bookmarks.some(b => b.id === id);
    }, [bookmarks]);

    const toggleBookmark = useCallback((bookmark: Omit<Bookmark, 'timestamp'>) => {
        if (isBookmarked(bookmark.id)) {
            removeBookmark(bookmark.id);
        } else {
            addBookmark(bookmark);
        }
    }, [isBookmarked, addBookmark, removeBookmark]);

    return (
        <BookmarkContext.Provider value={{
            bookmarks,
            lastRead,
            addBookmark,
            removeBookmark,
            isBookmarked,
            toggleBookmark,
            setLastRead
        }}>
            {children}
        </BookmarkContext.Provider>
    );
};

export const useBookmarks = () => {
    const context = useContext(BookmarkContext);
    if (!context) {
        throw new Error('useBookmarks must be used within a BookmarkProvider');
    }
    return context;
};
