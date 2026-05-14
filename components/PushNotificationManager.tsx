"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
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
  const [showPopup, setShowPopup] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
      registerServiceWorker();
    }
  }, []);

  useEffect(() => {
    // If we shouldn't show it at all, or it's currently showing, don't set up the interval
    if (!isSupported || permission === "granted" || subscription || showPopup) return;

    // Check every 5 seconds if the cookie has expired or doesn't exist
    const intervalId = setInterval(() => {
      const declinedCookie = document.cookie.split('; ').find(row => row.trim().startsWith('notification_declined='));
      if (!declinedCookie) {
        setShowPopup(true);
      }
    }, 10000); // 10 seconds interval also serves as the initial 10s delay

    return () => clearInterval(intervalId);
  }, [isSupported, permission, subscription, showPopup]);

  useEffect(() => {
    let progressTimer: NodeJS.Timeout;
    let autoCloseTimer: NodeJS.Timeout;

    if (showPopup && !showArrow) {
      setProgress(100);
      const startTime = Date.now();
      const duration = 10000; // 10 seconds

      progressTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(remaining);
      }, 50);

      autoCloseTimer = setTimeout(() => {
        handleAutoClose();
      }, duration);
    }

    return () => {
      clearInterval(progressTimer);
      clearTimeout(autoCloseTimer);
    };
  }, [showPopup, showArrow]);

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

  const handleYes = async () => {
    if (Notification.permission === "denied") {
      alert("तुम्ही यापूर्वी नोटिफिकेशन्स नाकारले आहेत. कृपया तुमच्या ब्राउझर सेटिंग्जमधून (URL bar जवळील lock icon) नोटिफिकेशन्स Allow करा.");
      setShowPopup(false);
      return;
    }

    try {
      // Force React to render the arrow immediately before the browser popup blocks execution
      flushSync(() => {
        setShowArrow(true);
      });

      // 1. Request permission
      const currentPermission = await Notification.requestPermission();
      setPermission(currentPermission);

      if (currentPermission !== "granted") {
        console.warn("Push notification permission denied.");
        // We can close everything if they deny
        setShowArrow(false);
        setShowPopup(false);
        return;
      }

      // 2. Subscribe
      const registration = await navigator.serviceWorker.ready;
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

      if (!vapidPublicKey) {
        console.error("VAPID public key not found in environment variables.");
        setShowArrow(false);
        setShowPopup(false);
        return;
      }

      let newSubscription = await registration.pushManager.getSubscription();
      if (!newSubscription) {
        newSubscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        });
      }

      setSubscription(newSubscription);

      // 3. Save to backend
      await instance.post(`/api/notifications/subscribe`, newSubscription);
      console.log("Successfully subscribed to push notifications!");

      // 4. Close the popup
      setShowArrow(false);
      setShowPopup(false);
    } catch (error) {
      console.error("Failed to subscribe user:", error);
      setShowArrow(false);
      setShowPopup(false);
    }
  };

  const handleAutoClose = () => {
    setShowPopup(false);
    // Set cookie for 1 hour
    const date = new Date();
    date.setTime(date.getTime() + (1 * 60 * 60 * 1000));
    // date.setTime(date.getTime() + (1 * 60 * 1000));
    document.cookie = "notification_declined=true; expires=" + date.toUTCString() + "; path=/";
  };

  const handleNo = () => {
    setShowPopup(false);
    // Set cookie for 24 hours
    const date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
    document.cookie = "notification_declined=true; expires=" + date.toUTCString() + "; path=/";
  };

  if (!isSupported) {
    return null;
  }

  if (permission === "granted" && subscription) {
    return null;
  }

  if (!showPopup) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9998] flex items-center justify-center p-4">
        <div className="relative bg-white/95 backdrop-blur-xl rounded-[32px] p-6 md:p-8 max-w-md w-full shadow-[0_20px_80px_rgba(0,0,0,0.45)] overflow-hidden border border-white/20 animate-[fadeIn_.4s_ease]">

          {/* Decorative Glow */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-400/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-cyan-300/20 rounded-full blur-3xl"></div>

          {/* Progress Bar */}
          {!showArrow && (
            <div className="absolute top-0 left-0 h-1.5 bg-gray-200/70 w-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 transition-all duration-75 ease-linear shadow-lg"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Floating Notification Icon */}
          <div className="relative mx-auto w-24 h-24 mb-5 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20"></div>
            <div className="absolute inset-2 rounded-full bg-cyan-400/30 blur-md"></div>

            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-2xl border-4 border-white">
              <span className="text-4xl animate-bounce">🔔</span>
            </div>
          </div>

          {/* Heading */}
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-snug mb-3 text-center">
            प्रत्येक महत्त्वाची बातमी आता सर्वात आधी तुमच्यापर्यंत ✨
          </h3>

          {/* Updated Marathi Text */}
          <p className="text-gray-600 text-[15px] leading-relaxed mb-6 text-center">
            <span className="font-semibold text-blue-700">
              ‘नाशिकचा खबरनामा’
            </span>{" "}
            सोबत जोडून राहा आणि देशभरातील ताज्या घडामोडी,
            ब्रेकिंग न्यूज, राजकारण, मनोरंजन, क्रीडा आणि
            रोजच्या महत्त्वाच्या अपडेट्स वेळेवर मिळवा ❤️
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleYes}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.03] active:scale-[0.98] text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-xl w-full"
            >
              <span className="relative z-10">
                🔔 होय, मला अपडेट्स हवेत
              </span>

              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>

            <button
              onClick={handleNo}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-2xl font-semibold transition-all duration-300 border border-gray-200 hover:border-gray-300 w-full"
            >
              आत्ता नाही
            </button>
          </div>

          {/* Small Trust Line */}
          <p className="text-[12px] text-gray-400 mt-5 text-center">
            आम्ही फक्त महत्त्वाच्या आणि उपयुक्त अपडेट्स पाठवतो ✨
          </p>
        </div>
      </div>

      {showArrow && (
        <div className="hidden md:flex fixed top-34 left-54 z-[9999] pointer-events-none flex-col items-start animate-pulse">
          {/* Longer Arrow */}
          <svg
            width="220"
            height="320"
            viewBox="0 0 260 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
          >
            {/* Extended looped path */}
            <path
              d="
          M 230 280
          C 160 340, -20 220, 90 140
          C 210 60, 220 200, 130 210
          C 40 220, 60 80, 20 20
        "
              stroke="white"
              strokeWidth="5"
              strokeDasharray="10 10"
              fill="transparent"
              strokeLinecap="round"
            />

            {/* Arrowhead */}
            <polygon points="15,15 45,5 15,55" fill="white" />
          </svg>

          <span className="text-white font-bold ml-6 mt-2 text-lg drop-shadow-md bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm shadow-xl">
            कृपया 'Allow' वर क्लिक करा
          </span>
        </div>
      )}
    </>
  );
}
