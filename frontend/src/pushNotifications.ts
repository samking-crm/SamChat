// frontend/src/services/pushNotifications.ts
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { toast } from 'react-hot-toast';

export const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    const messaging = getMessaging();
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FCM_VAPID_KEY
    });
    localStorage.setItem('fcmToken', token!);
    return token;
  }
};

export const setupForegroundNotifications = () => {
  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    toast.custom(
      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg border">
        <p className="font-semibold">{payload.notification?.title}</p>
        <p>{payload.notification?.body}</p>
      </div>
    );
  });
};
