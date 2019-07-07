var db = require("./db.js");

var get = () =>
{
    let profiles = db.get("profiles").value();
    return profiles;
};

var getById = (id) =>
{
    let profile = db.get("profiles")
        .filter({id: id})
        .value();
    return profile[0] || undefined;
};

var getFeeds = (id) =>
{
    let profile = db.get("profiles")
        .filter({id: id})
        .value();
    return profile[0].feeds;
};

var getSavedArticles = (id) =>
{
    let profile = db.get("profiles")
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
