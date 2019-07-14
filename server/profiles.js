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
    let feeds = db.get("profiles")
        .filter({id: id})
        .get("feeds")
        .value();
    return feeds;
};

var getSavedArticles = (id) =>
{
    let profile = db.get("profiles")
        .filter({id: id})
        .value();
    return profile[0].getSavedArticles;
};

var addToFeeds = (id, topic) =>
{
    let feeds = db.get("profiles")
        .filter({id: id})
        .get("feeds")
        .push(topic)
        .value();
    return feeds;
};

module.exports = {
    get: get,
    getById: getById,
    getFeeds: getFeeds,
    addToFeeds: addToFeeds,
    getSavedArticles: getSavedArticles
};
