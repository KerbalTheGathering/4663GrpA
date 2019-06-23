var CACHE_NAME = "index-cache-v0.0.1";
var immutableRequests = 
[
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js",
    "/css/index.css",
    "/css/style.css",
    "/app.js",
    "/index.js",
];
var mutableRequests = 
[
    "/index.html",
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
        caches.open(CACHE_NAME).then((cache) =>
        {
            return cache.match(event.request).then((cachedResponse) =>
            {
                return cachedResponse || fetch(event.request).then((networkResponse) =>
                {
                    //cache.put(event.request, networkResponse.clone());
                    return networkResponse;
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
                    if (CACHE_NAME !== cacheName && cacheName.startsWith("index"))
                    {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
