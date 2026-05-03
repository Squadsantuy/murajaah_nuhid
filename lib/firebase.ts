import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getMessaging, Messaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDMdT4w-la2gBROQcgY_kZlpYbkB-15jYQ",
    authDomain: "muroku-id.firebaseapp.com",
    databaseURL: "https://muroku-id-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "muroku-id",
    storageBucket: "muroku-id.firebasestorage.app",
    messagingSenderId: "92824975959",
    appId: "1:92824975959:web:cae812874ebc9bbb8dc112",
    measurementId: "G-8DQBB9CQBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Messaging
let messaging: Messaging | null = null;
if (typeof window !== 'undefined') {
    isSupported().then(supported => {
        if (supported) {
            messaging = getMessaging(app);
        }
    });
}

export { messaging };
export default app;
