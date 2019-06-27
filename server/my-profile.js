var db = require("./db.js");

var get = () =>
{
    var profiles = db.get("profiles")
        .value();
    return profiles;
};

var getById = (id) =>
{
    var profile = db.get("profiles")
        .filter({id: id})
        .value();
    return profile[0] || undefined;
};

var getFeeds = (id) =>
{
    var profile = db.get("profiles")
        .filter({id: id})
        .value();
    return profile[0].feeds;
};

var getSavedArticles = (id) =>
{
    var profile = db.get("profiles")
        .filter({id: id})
        .value();
    return profile[0].getSavedArticles;
};

module.exports = {
    get: get,
    getById: getById,
    getFeeds: getFeeds,
    getSavedArticles: getSavedArticles
};
