// Cache name with versioning (you can automate this via your build process)
const CACHE_NAME = `your-app-cache-v1`; // Update this with every new deployment

// Files to cache (update the list of important assets like JS, CSS, and images)
const FILES_TO_CACHE = [
  "/",
  "index.html",
  "/manifest.json",
  "offline.html", // Offline fallback page
  "/css/style.css",
  "/js/app.js",
  "/images/logo.png",
];

// Offline fallback page (optional but highly recommended for PWAs)
const OFFLINE_PAGE = "offline.html";

// Install Service Worker and cache the required files
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching app shell...");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting(); // Activate the new SW immediately without waiting
});

// Fetch event: Serve files from cache or fallback to network
self.addEventListener("fetch", (event) => {
  // Handle HTML requests differently to ensure a good fallback experience
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches
        .match(event.request)
        .then((cachedResponse) => {
          return cachedResponse || fetch(event.request);
        })
        .catch(() => caches.match(OFFLINE_PAGE)) // Serve offline page if no cached version or network fails
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request).then((networkResponse) => {
            // Cache the new files if they're fetched from network
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          })
        );
      })
    );
  }
});

// Activate Service Worker and clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  const cacheWhitelist = [CACHE_NAME]; // Keep only the current cache
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName); // Delete outdated cache
          }
        })
      );
    })
  );
  self.clients.claim(); // Ensure the new service worker controls the page immediately
});

// Background sync event (optional - triggered when internet reconnects)
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-data") {
    event.waitUntil(syncDataWithServer()); // Custom function to sync data with the server
  }
});

// Push notification event (optional - for future use if you implement notifications)
self.addEventListener("push", (event) => {
  const title = "New Message!";
  const options = {
    body: event.data ? event.data.text() : "You have a new notification.",
    icon: "/images/notification-icon.png",
    badge: "/images/badge.png",
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle offline sync data
async function syncDataWithServer() {
  try {
    // Your logic to sync data (like sending queued API calls or form submissions)
    console.log("Syncing data with the server...");
    // Example: fetch('/api/sync', { method: 'POST', body: syncData });
  } catch (error) {
    console.error("Failed to sync data:", error);
  }
}
