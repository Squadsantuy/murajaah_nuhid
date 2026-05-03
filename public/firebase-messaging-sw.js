// Scripts for firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDMdT4w-la2gBROQcgY_kZlpYbkB-15jYQ",
    authDomain: "muroku-id.firebaseapp.com",
    projectId: "muroku-id",
    storageBucket: "muroku-id.firebasestorage.app",
    messagingSenderId: "92824975959",
    appId: "1:92824975959:web:cae812874ebc9bbb8dc112",
    measurementId: "G-8DQBB9CQBQ"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/pwa-192x192.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
