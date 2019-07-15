let db = require("./db.js");

var get = function()
{
    let articles = db.get("articles").value();
    return articles;
};

var getById = function(id)  
{
    let article = db.get("articles")
        .filter({id: id})
        .value();
    return article[0] || undefined;
};

module.exports = {
    get: get,
    getById: getById,
};