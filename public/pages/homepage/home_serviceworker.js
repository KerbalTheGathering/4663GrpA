var CACHE_NAME = "home-cache-v0.0.1";
var immutableRequests = 
[
    "/js/home.js",
    "/pages/homepage/homepage.html",
];

var mutableRequests = 
[
];

self.addEventListener("install", (event) =>
{
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
        {
            var newImmutableRequests = [];
            return Promise.all(
                immutableRequests.map((url) =>
                {
                    return caches.match(url).then((response) => {
                        if (response) 
                        {
                            return cache.put(url, response);
                        } else {
                            newImmutableRequests.push(url);
                            return Promise.resolve();
                        }
                    });
                })
            ).then(() =>
            {
                return cache.addAll(newImmutableRequests.concat(mutableRequests));
            });
        })
    );
});

self.addEventListener("fetch", (event) => 
{
    event.respondWith(
        caches.open("index-cache-v0.0.1").then((cache) =>
        {
            return cache.match(event.request).then((cachedResponse) =>
            {
                return cachedResponse || caches.open(CACHE_NAME).then((cache) =>
                {
                    return cache.match(event.request).then((cachedResponse) =>
                    {
                        return cachedResponse || fetch(event.request).then((networkResponse) =>
                        {
                            cache.put(event.request, networkResponse.clone());
                            return networkResponse;
                        });
                    });
                });
            });
        })
    );
});

self.addEventListener("activate", (event) =>
{
    event.waitUntil(
        caches.keys().then((cacheNames) =>
        {
            return Promise.all(
                cacheNames.map((cacheName) =>
                {
                    if (CACHE_NAME !== cacheName && cacheName.startsWith("home"))
                    {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
