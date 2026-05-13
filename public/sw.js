self.addEventListener("push", function (event) {
  const data = event.data?.json() || {};

  // Strip HTML tags because native notifications only support plain text
  const cleanBody = (data.body || "You have a new update")
    .replace(/<[^>]*>?/gm, '');

  const title = data.title || "Nashikcha Khabarnama";
  const options = {
    body: cleanBody,
    icon: "/logo.png",
    badge: "/logo.png",
    data: {
      url: data.url || "/"
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const url = event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
