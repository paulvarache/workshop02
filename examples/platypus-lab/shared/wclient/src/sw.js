var CACHE_NAME = 'platypus-cache-v1';
var urlsToCache = [
    '/',
    '/style.css',
    '/app.js',
    '/img/icons/add.svg',
    '/img/icons/delete.svg',
    '/img/icons/navigate_before.svg'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Initial files cached');
                return cache.addAll(urlsToCache);
            }));
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                if (response) {
                    return response;
                }

                var fetchRequest = event.request.clone();
                return fetch(fetchRequest).then(
                    function (response) {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        var responseToCache = response.clone();
                        cache.put(event.request, responseToCache);

                        return response;
                    });
            });
        }));
});