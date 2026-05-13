"use client";

import { useEffect, useState } from "react";
import instance from "@/components/services/instance";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        // Check if backend actually has this subscription
        const response = await instance.post('/api/notifications/check', { 
          endpoint: existingSubscription.endpoint 
        });
        
        if (response.data?.exists) {
          setSubscription(existingSubscription);
        } else {
          // It's in the browser but NOT in the database
          setSubscription(null); 
        }
      }
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  };

  const subscribeUser = async () => {
    try {
      // 1. Request permission
      const currentPermission = await Notification.requestPermission();
      setPermission(currentPermission);

      if (currentPermission !== "granted") {
        console.warn("Push notification permission denied.");
        return;
      }

      // 2. Subscribe
      const registration = await navigator.serviceWorker.ready;
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

      if (!vapidPublicKey) {
        console.error("VAPID public key not found in environment variables.");
        return;
      }

      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });

      setSubscription(newSubscription);

      // 3. Save to backend
      await instance.post(`/api/notifications/subscribe`, newSubscription);

      console.log("Successfully subscribed to push notifications!");
    } catch (error) {
      console.error("Failed to subscribe user:", error);
    }
  };

  const unsubscribeUser = async () => {
    if (subscription) {
      await subscription.unsubscribe();
      setSubscription(null);
      console.log("Unsubscribed from push notifications.");
      // In a real app, also notify your backend to remove the subscription
    }
  };

  if (!isSupported) {
    return null; // Don't show anything if push isn't supported
  }

  // Optional UI: You might want to render a button here for users to explicitly enable notifications,
  // or you could just call `subscribeUser` in a prompt elsewhere.
  // For now, we render a small button fixed at the bottom right if not subscribed.
  if (permission === "granted" && subscription) {
    return null; // Already subscribed, no UI needed.
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {permission !== "denied" && !subscription && (
        <button
          onClick={subscribeUser}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium transition-colors"
        >
          Enable Notifications 🔔
        </button>
      )}
    </div>
  );
}
