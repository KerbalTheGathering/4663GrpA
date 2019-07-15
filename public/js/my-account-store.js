var DB_VERSION = 1;
var DB_NAME = "my-account";

var openDatabase = function()
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
            if(!db.objectStoreNames.contains("my-account"))
            {
                db = event.target.result;
                if(!db.objectStoreNames.contains("my-account"))
                {
                    db.createObjectStore("",
                        { keyPath: "id" }
                    );
                }
            }
        };
    });
};

var openAccountStore = function(db, transactionMode)
{
    return db
        .transcation(DB_NAME, transactionMode)
        .objectStore(DB_NAME);
};

var updateInAccountStore = function(id, object)
{
    return new Promise((resolve, reject) =>
    {
        openDatabase().then((db) =>
        {
            openAccountStore(db, "readwrite")
                .openCursor().onsuccess = (event) =>
                {
                    var cursor = event.target.result;
                    if (!cursor)
                    {
                        reject("not found in object store");
                    }
                    if(cursor.value.id === id)
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

function getMyProfile (id)
{
    return new Promise(function(resolve) 
    {
        openDatabase().then(function(db) 
        {
            var accountStore = openAccountStore(db, "readwrite");
            var profile = [];
            var cursor;
            if (id)
            {
                cursor = accountStore.index("id").openCursor(id);
            } else {
                cursor = accountStore.openCursor();
            }
            cursor.onsuccess = function(event) 
            {
                var cursor = event.target.result;
                if (cursor)
                {
                    profile.push(cursor.value);
                    cursor.continue();
                } else {
                    if (profile.length > 0)
                    {
                        resolve(profile);
                    } else {
                        getProfileFromServer(id).then(function(profile) 
                        {
                            openDatabase().then(function(db)
                            {
                                var objectStore = openAccountStore(db, "readwrite");
                                for (var i = 0; i < profile.length; i++)
                                {
                                    objectStore.add(profile[i]);
                                }
                                resolve(profile);
                            });
                        });
                    }
                }
            };
        }).catch(function()
        {
            getProfileFromServer().then(function(profile)
            {
                resolve(profile);
            });
        });
    });
}

function getProfileFromServer (id)
{
    return new Promise((resolve) =>
    {
        //if (self.$)
        //{
            //$.getJSON("/profiles.json", resolve);
        //} else 
        if (self.fetch) {
            fetch("profiles.js").then((response) =>
            {
                for (var i = 0; i < response.length; i++)
                {
                    if(response[i].id)  return response[i];
                }
            }).then((profile) =>
            {
                resolve(profile);
            });
        }
    });
}

function getMyFeeds(id) 
{
    return new Promise(function(resolve)
    {
        var profile = getMyProfile(id)
        .then(function(profile)
        {
            resolve(profile);
        });
        if (profile.feeds > 0)
        {
            resolve(profile.feeds);
        } else {
            getMyFeedsFromServer(id)
            .then(function(myfeeds) 
            {
                openDatabase().then(function(db)
                {
                    var accountStore = openAccountStore(db, "readwrite");
                    var profile = accountStore.index("id").openCursor(id);
                    for (var i = 0; i < myfeeds.length; i++)
                    {
                        profile.feeds.add(myfeeds[i]);
                    }
                    resolve(myfeeds);
                });
            });
        }
    });
}

function getMyFeedsFromServer (id)
{
    return new Promise((resolve) =>
    {
        /*
        if (self.$)
        {
            console.log($.getJSON("/profiles.json?id=" + id + "&action=getfeeds", resolve));
        } else */
        if (self.fetch)
        {
            fetch("profiles.json").then((response) =>
            {
                return response.json();
            }).then((feeds) =>
            {
                resolve(feeds);
            });
        }
    });
}
