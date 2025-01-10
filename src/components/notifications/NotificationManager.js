import React, { useEffect } from "react";
import { apiRequest } from "../../services/api";

const VAPID_PUBLIC_KEY = "<YOUR_VAPID_PUBLIC_KEY>"; // Replace with your actual VAPID public key

const NotificationManager = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      registerServiceWorker();
    } else {
      console.error("Push messaging is not supported in this browser.");
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        "/serviceWorker.js"
      );
      console.log("Service Worker registered with scope:", registration.scope);

      const subscription = await subscribeUserToPush(registration);
      await saveSubscriptionToServer(subscription); // Use apiRequest to save the subscription
    } catch (error) {
      console.error("Error during service worker registration:", error.message);
    }
  };

  const subscribeUserToPush = async (registration) => {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });
    console.log("Push Subscription:", subscription);
    return subscription;
  };

  const saveSubscriptionToServer = async (subscription) => {
    try {
      await apiRequest("/save-subscription", "POST", { subscription });
      console.log("Subscription saved to server successfully!");
    } catch (error) {
      console.error("Error saving subscription to server:", error.message);
    }
  };

  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
  };

  return null; // This component doesn't render any UI
};

export default NotificationManager;
