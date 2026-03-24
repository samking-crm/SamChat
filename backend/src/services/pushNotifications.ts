// backend/src/services/pushNotifications.ts
import admin from 'firebase-admin';

export const sendPushNotification = async (token: string, title: string, body: string, data: any) => {
  const message = {
    notification: { title, body },
    data,
    token,
    android: {
      priority: 'high',
      notification: { sound: 'default' }
    }
  };

  return admin.messaging().send(message);
};
