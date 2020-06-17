importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) console.log("Load workbox success");
else console.log("Load workbox failed");

workbox.precaching.precacheAndRoute([
  { url: "/", revision: "1" },
  { url: "/", revision: "1" },
  { url: "/nav.html", revision: "1" },
  { url: "/index.html", revision: "1" },
  {
    url: "https://fonts.googleapis.com/icon?family=Material+Icons",
    revision: "1",
  },
  { url: "/manifest.json", revision: "1" },
  { url: "/js/materialize.min.js", revision: "1" },
  { url: "/js/localDB.js", revision: "1" },
  { url: "/js/api.js", revision: "1" },
  { url: "/js/crud.js", revision: "1" },
  { url: "/js/script.js", revision: "1" },
  { url: "/js/nav.js", revision: "1" },
  { url: "/js/registerWorker.js", revision: "1" },
  { url: "/js/permission.js", revision: "1" },
  { url: "/js/viewRender.js", revision: "1" },
  { url: "/css/materialize.min.css", revision: "1" },
  { url: "/css/style.css", revision: "1" },
]);

workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages",
  })
);

workbox.routing.registerRoute(
  new RegExp("/img/icons/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "icons",
  })
);

workbox.routing.registerRoute(
  "https://api.football-data.org/v2/competitions/2002/standings",
  workbox.strategies.staleWhileRevalidate({
    cacheName: "standings",
  })
);

workbox.routing.registerRoute(
  "https://api.football-data.org/v2/competitions/2002/scorers",
  workbox.strategies.staleWhileRevalidate({
    cacheName: "scorers",
  })
);

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }

  var options = {
    body: body,
    icon: "img/notification.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
