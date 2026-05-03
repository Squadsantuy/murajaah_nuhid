import { useState, useEffect } from 'react';
import { ref, onValue, push, onDisconnect, set, serverTimestamp } from 'firebase/database';
import { database } from '../lib/firebase';

export const useOnlineVisitors = () => {
    const [visitorCount, setVisitorCount] = useState(0);

    useEffect(() => {
        // Create a reference to the connections list
        const connectionsRef = ref(database, 'connections');

        // Create a reference to this specific connection
        const myConnectionRef = push(connectionsRef);

        // Reference to track whether we're connected to the server
        const connectedRef = ref(database, '.info/connected');

        const unsubscribeConnected = onValue(connectedRef, (snap) => {
            if (snap.val() === true) {
                // We're connected!

                // When we disconnect, remove this connection node
                onDisconnect(myConnectionRef).remove();

                // Add this connection to the list with a timestamp
                set(myConnectionRef, {
                    lastSeen: serverTimestamp(),
                    active: true
                });
            }
        });

        // Listen for changes to the entire connections list to get the count
        const unsubscribeCount = onValue(connectionsRef, (snap) => {
            if (snap.exists()) {
                const connections = snap.val();
                // Count active connections (Firebase Realtime DB returns an object)
                const count = Object.keys(connections).length;
                setVisitorCount(count);
            } else {
                setVisitorCount(0);
            }
        });

        return () => {
            unsubscribeConnected();
            unsubscribeCount();
            // Manually remove connection if the component unmounts normally
            set(myConnectionRef, null);
        };
    }, []);

    return visitorCount;
};
