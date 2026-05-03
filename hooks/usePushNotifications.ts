import { useEffect, useState } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { ref, set } from 'firebase/database';
import { messaging, database } from '../lib/firebase';
import { checkAndTriggerNotifications } from '../services/reminderService';

export const usePushNotifications = () => {
    const [token, setToken] = useState<string | null>(null);
    const [notification, setNotification] = useState<any>(null);

    const VAPID_KEY = "BNHvgHVCYrohYvD87cB4MDAUVApIW2sqVxaNNTBe2YJXtkrx2Lz9TGEwTRHxDwt7hTZt7IT-rNQiQcXIfDWvR2U";

    const requestPermission = async () => {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                if (messaging) {
                    const currentToken = await getToken(messaging, {
                        vapidKey: VAPID_KEY
                    });
                    if (currentToken) {
                        setToken(currentToken);
                        saveTokenToDatabase(currentToken);
                    } else {
                        console.log('No registration token available. Request permission to generate one.');
                    }
                }
            }
        } catch (error) {
            console.error('An error occurred while requesting permission ', error);
        }
    };

    const saveTokenToDatabase = (token: string) => {
        // Save token to database under fcm_tokens/
        // Use a truncated version of the token as key or a unique ID
        const tokenHash = btoa(token).substring(0, 20).replace(/[/+=]/g, '');
        set(ref(database, `fcm_tokens/${tokenHash}`), {
            token,
            updatedAt: new Date().toISOString(),
            platform: 'web'
        });
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            requestPermission();

            if (messaging) {
                const unsubscribe = onMessage(messaging, (payload) => {
                    console.log('Message received. ', payload);
                    setNotification(payload);

                    // Show notification manually if in foreground
                    if (payload.notification) {
                        new Notification(payload.notification.title || 'MurajaahQu', {
                            body: payload.notification.body,
                            icon: '/pwa-192x192.png'
                        });
                    }
                });

                // Check for local reminders every minute
                const interval = setInterval(() => {
                    checkAndTriggerNotifications();
                }, 60000);

                // Initial check
                checkAndTriggerNotifications();

                return () => {
                    unsubscribe();
                    clearInterval(interval);
                };
            }
        }
    }, [messaging]);

    return { token, notification };
};
