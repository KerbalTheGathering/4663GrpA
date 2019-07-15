var CACHE_NAME = "index-cache-v0.0.1";
var CACHED_URLS = 
[
    "manifest.json",
    //HTML
    "/index.html",
    //CSS
    "/css/index.css",
    "/css/style.css",
    //Javascript
    "/app.js",
    "/index.js",
    "/js/my-account-store.js",
    "/js/my-news.js",
    "/js/my-news-store.js",
    "/js/common/navbar.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js",
    //Images
    "/img/010-newspaper.png",
    //JSON
    "/articles.json",
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
            var CACHED_URLS = [];
            return Promise.all(
                CACHED_URLS.map((url) =>
                {
                    return caches.match(url).then((response) => {
                        if (response) 
                        {
                            return cache.put(url, response);
                        } else {
                            CACHED_URLS.push(url);
                            return Promise.resolve();
                        }
                    });
                })
            ).then(() =>
            {
                return cache.addAll(CACHED_URLS.concat(CACHED_URLS));
            });
        })
    );
    */
});

self.addEventListener("fetch", (event) => 
{
    var requestURL = new URL(event.request.url);
    if (requestURL.pathname === "/" || requestURL.pathname === "/index.html"){
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
    } else if (requestURL.pathname === "/profiles.json")
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
                    if (CACHE_NAME !== cacheName && cacheName.startsWith("index"))
                    {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
