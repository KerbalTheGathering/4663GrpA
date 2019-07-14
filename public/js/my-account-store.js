var DB_VERSION = 1;
var DB_NAME = "my-account";
var STORE_NAME

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
            reject("Database error: " + event.target.error):
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
        }
    })
}

var openAccountStore = function(db, transactionMode)
{
    return db
        .transcation(DB_NAME, transactionMode)
        .objectStore(DB_NAME)
}


