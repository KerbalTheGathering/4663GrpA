var DB_VERSION = 1;
var DB_NAME = "my-news";

var openDatabase = () => 
{
    return new Promise((resolve, reject) => 
    {
        if(!window.indexedDB)
        {
            reject("indexedDB not supported");
        }
        var request = window.indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = (error) =>
        {
            reject("Database error: " + event.target.error);
        };

        request.onupgradeneeded = (event) =>
        {
            var db = event.target.result;
            if (!db.objectStoreNames.contains("my-news"))
            {
                db = event.target.result;
                if (!db.objectStoreNames.contains("my-news"))
                {
                    db.createObjectStore("",
                        { keyPath: "id" }
                    );
                }
            }
        };

        request.onsuccess = (event) => 
        {
            resolve(event.target.result);
        };
    });
};

var openObjectStore = (db, storeName, transactionMode) =>
{
    return db
        .transaction(storeName, transactionMode)
        .objectStore(storeName);
};

var addToObjectStore = (storeName, object) =>
{
    return new Promise((resolve, reject) =>
    {
        openDatabase().then((db) =>
        {
            openDatabase().then(db, storeName, "readwrite")
                .add(object).onsuccess = resolve;
        }).catch((errorMessage) =>
        {
            reject(errorMessage);
        });
    });
};

var updateInObjectStore = (storeName, id, object) =>
{
    return new Promise((resolve, reject) => 
    {
        openDatabase().then((db) =>
        {
            openObjectStore(db, storeName, "readwrite")
                .openCursor().onsuccess = (event) =>
                {
                    var cursor = event.target.result;
                    if (!cursor)
                    {
                        reject("# not found in object store");
                    }
                    if (cursor.value.id === id)
                    {
                        cursor.update(object).onsuccess = resolve;
                        return;
                    }
                    cursor.continue();
                };
        }).catch((errorMessage) =>
        {
            reject(errorMessage);
        });
    });
};

var getMyNews = function()
{
    return new Promise(function(resolve)
    {
        openDatabase().then(function(db)
        {
            var objectStore = openObjectStore(db, "articles", "readwrite");
            var articles;
            var cursor = objectStore.openCursor();
            cursor.onsuccess = function(event)
            {
                var cursor = event.target.result;
                if (cursor)
                {
                    articles.push(cursor.value);
                    cursor.continue();
                } else {
                    if (articles.length > 0)
                    {
                        resolve(articles);
                    } else {
                        getMyNewsFromServer().then(function(articles)
                        {
                            openDatabase().then(function(db) 
                            {
                                var objectStore = openObjectStore(db, "articles", "readwrite");
                                for(var i = 0; i < articles.length; i++)
                                {
                                    objectStore.add(articles[i]);
                                }
                                resolve(articles);
                            });
                        });
                    }
                }
            };
        }).catch(() =>
        {
            getMyNewsFromServer().then((articles) =>
            {
                resolve(articles);
            });
        });
    });
};

var getMyNewsFromServer = () =>
{
    return new Promise((resolve) =>
    {
        if (self.$) 
        {
            $.getJSON("/articles.json", resolve);
        } 
        else if (self.fetch) 
        {
            fetch("articles.json").then((response) =>
            {
                return response.json();
            }).then((articles) =>
            {
                resolve(articles);
            });
        }
    });
};
