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

function getMyNews (successCallback)
{
    return new Promise((resolve) =>
    {
        openDatabase().then((db) =>
        {
            var objectStore = openObjectStore(db, "articles", "readwrite");
            var myNews = [];
            objectStore.openCursor().onsuccess = (event) =>
            {
                var cursor = event.target.result;
                if (cursor)
                {
                    myNews.push(cursor.value);
                    cursor.continue();
                } else {
                    if (myNews.length > 0)
                    {
                        resolve(myNews);
                    } else {
                        getMyNewsFromServer().then((myNews) =>
                        {
                            openDatabase().then((db) => 
                            {
                                var objectStore = openObjectStore(db, "articles", "readwrite");
                                for(var i = 0; i < myNews.length; i++)
                                {
                                    objectStore.add(myNews[i]);
                                }
                                resolve(myNews);
                            });
                        });
                    }
                }
            };
        }).catch(() =>
        {
            getMyNewsFromServer().then((news) =>
            {
                resolve(news);
            });
        });
    });
}

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
            fetch("articles.js").then((response) =>
            {
                return response.json();
            }).then((articles) =>
            {
                resolve(articles);
            });
        }
    });
};
