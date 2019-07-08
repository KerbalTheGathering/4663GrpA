var CACHE_NAME = "home-cache-v0.0.1";
var CACHED_URLS = 
[
    "/js/home.js",
    "/js/my-news-store.js",
    "/js/my-news.js",
    "/pages/homepage/homepage.html",
];

self.addEventListener("install", (event) =>
{
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
        {
            return cache.addAll(CACHED_URLS);
        })
    );
    /*
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
    */
});

self.addEventListener("fetch", (event) => 
{
    var requestURL = new URL(event.request.url);
    if(requestURL.pathname === "/pages/homepage/homepage")
    {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) =>
            {
                return cache.match(event.request).then((cachedResponse) =>
                {
                    return cachedResponse || fetch(event.request).then((networkResponse) =>
                    {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
    } else if (requestURL.pathname === "/articles.json")
    {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) =>
            {
                return fetch(event.request).then((networkResponse) =>
                {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                }).catch(() =>
                {
                    return caches.match(event.request);
                });
            })
        );
    }
    else if (
        CACHED_URLS.includes(requestURL.href) ||
        CACHED_URLS.includes(requestURL.pathname)
    ) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) =>
            {
                return cache.match(event.request).then((response) =>
                {
                    return response || fetch(event.request);
                });
            })
        );
    }
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
