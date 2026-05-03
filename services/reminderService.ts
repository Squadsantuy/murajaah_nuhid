export interface Reminder {
    id: string;
    title: string;
    body: string;
    time: string; // HH:mm
    type: 'prayer' | 'dzikir';
}

const STORAGE_KEY_LAST_NOTIF = 'murajaahqu_last_notif_day';
const STORAGE_KEY_SHOLAT_DATA = 'murajaahqu_sholat_schedule';

export const getReminders = (): Reminder[] => {
    const reminders: Reminder[] = [];

    // 1. Dzikir Reminders (Fixed Times)
    reminders.push({
        id: 'dzikir_pagi',
        title: 'Saatnya Dzikir Pagi ☀️',
        body: 'Sempatkan dzikir pagi agar hari lebih berkah.',
        time: '05:00',
        type: 'dzikir'
    });

    reminders.push({
        id: 'dzikir_petang',
        title: 'Saatnya Dzikir Petang 🌆',
        body: 'Alhamdulillah hari sudah sore, yuk dzikir petang.',
        time: '17:00',
        type: 'dzikir'
    });

    // 2. Prayer Reminders (Dynamic from LocalStorage)
    const savedSchedule = localStorage.getItem(STORAGE_KEY_SHOLAT_DATA);
    if (savedSchedule) {
        try {
            const schedule = JSON.parse(savedSchedule);
            const prayerTimes = [
                { name: 'Subuh', time: schedule.shubuh },
                { name: 'Dzuhur', time: schedule.dzuhur },
                { name: 'Ashr', time: schedule.ashr },
                { name: 'Maghrib', time: schedule.maghrib },
                { name: 'Isya', time: schedule.isya }
            ];

            prayerTimes.forEach(p => {
                const [h, m] = p.time.split(':').map(Number);
                let totalMinutes = h * 60 + m;

                // Reminder 10 minutes before
                const reminderMinutes = totalMinutes - 10;
                const rh = Math.floor(reminderMinutes / 60);
                const rm = reminderMinutes % 60;
                const formattedTime = `${String(rh).padStart(2, '0')}:${String(rm).padStart(2, '0')}`;

                reminders.push({
                    id: `prayer_${p.name.toLowerCase()}`,
                    title: `10 Menit Menjelang ${p.name} 🕌`,
                    body: `Waktu ${p.name} akan tiba pada pukul ${p.time}. Bersiaplah.`,
                    time: formattedTime,
                    type: 'prayer'
                });
            });
        } catch (e) {
            console.error('Failed to parse sholat schedule for reminders', e);
        }
    }

    return reminders;
};

export const checkAndTriggerNotifications = () => {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;

    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const todayStr = now.toISOString().split('T')[0];

    // Load last sent notifications to prevent spam
    const lastSentJson = localStorage.getItem(STORAGE_KEY_LAST_NOTIF);
    const lastSent = lastSentJson ? JSON.parse(lastSentJson) : {};

    // Reset if it's a new day
    if (lastSent.date !== todayStr) {
        lastSent.date = todayStr;
        lastSent.sentIds = [];
    }

    const reminders = getReminders();
    console.log(`Checking ${reminders.length} reminders at ${currentTime}`);

    reminders.forEach(reminder => {
        if (reminder.time === currentTime && !lastSent.sentIds.includes(reminder.id)) {
            console.log(`Triggering notification: ${reminder.title}`);
            new Notification(reminder.title, {
                body: reminder.body,
                icon: '/pwa-192x192.png',
                badge: '/pwa-192x192.png',
                tag: reminder.id // Prevent duplicate windows
            });

            lastSent.sentIds.push(reminder.id);
            localStorage.setItem(STORAGE_KEY_LAST_NOTIF, JSON.stringify(lastSent));
        }
    });
};
