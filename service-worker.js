const CACHE_NAME = "Bookify-v1";
let urlsToCache = [
	"/",
	"/favicon.ico",
	"/index.html",
	"/manifest.json",
	"/nav.html",
	"/js/regist.js",
	"/service-worker.js",
	"https://fonts.googleapis.com/icon?family=Material+Icons",
	"https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
	"/assets/font/Poppins-Medium.ttf",
	"/assets/font/Poppins-Regular.ttf",
	"/assets/icon/android-chrome-192x192.png",
	"/assets/icon/android-chrome-512x512.png",
	"/assets/icon/android-icon-192x192.png",
	"/assets/icon/apple-touch-icon.png",
	"/assets/icon/favicon-16x16.png",
	"/assets/icon/favicon-32x32.png",
	"/assets/img/business-1.jpg",
	"/assets/img/business-2.jpg",
	"/assets/img/business-3.jpg",
	"/assets/img/business-4.jpg",
	"/assets/img/comic-1.jpg",
	"/assets/img/comic-2.jpg",
	"/assets/img/comic-3.jpg",
	"/assets/img/comic-4.jpg",
	"/assets/img/mystery-1.jpg",
	"/assets/img/mystery-2.jpg",
	"/assets/img/mystery-3.jpg",
	"/assets/img/mystery-4.jpg",
	"/assets/img/offline-store-1.jpg",
	"/assets/img/offline-store-2.jpg",
	"/assets/img/offline-store-3.jpg",
	"/assets/img/romance-1.jpg",
	"/assets/img/romance-2.jpg",
	"/assets/img/romance-3.jpg",
	"/assets/img/romance-4.jpg",
	"/css/all.css",
	"/css/main.css",
	"/css/materialize.css",
	"/css/materialize.min.css",
	"/js/all.js",
	"/js/jquery-2.1.1.min.js",
	"/js/materialize.js",
	"/js/materialize.min.js",
	"/js/script.js",
	"/pages/book-collection.html",
	"/pages/home.html",
	"/pages/offline-store.html",
	"/pages/order.html",
];

self.addEventListener("install", function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener("fetch", function (event) {
	event.respondWith(
		caches
			.match(event.request, {
				cacheName: CACHE_NAME,
			})
			.then(function (response) {
				if (response) {
					console.log(
						"ServiceWorker: Gunakan assets dari cache: ",
						response.url
					);
					return response;
				}

				console.log(
					"ServiceWorker: Memuat Assets dari Server: ",
					event.request.url
				);
				return fetch(event.request);
			})
	);
});

self.addEventListener("activate", function (event) {
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.map(function (cacheName) {
					if (cacheName != CACHE_NAME) {
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});
