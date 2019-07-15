let db = require("./db.json");
let _ = require('lodash');

function getProfiles ()
{
    let profiles = _.mapValues(db, 'profiles').value();
    console.log(profiles.value());
    return profiles;
}

var getById = (id) =>
{
    let profile = db.get("profiles")
        .filter({id: id})
        .value();
    return profile[0] || undefined;
};

var getFeeds = function(id)
{
    console.log(db);
    console.log(_.findKey(db.get(), function(f) 
    {
        return f.id === id;
    }));
    let feeds = db.get("profiles")
        .filter({id: id})
        .get("feeds")
        .value();
    return feeds || undefined;
};

var getSavedArticles = (id) =>
{
    let profile = db.get("profiles")
        .filter({id: id})
        .value();
    return profile[0].SavedArticles;
};

var addToFeeds = (id, topic) =>
{
    let feeds = db.get("profiles")
        .filter({id: id})
        .get("feeds")
        .push(topic)
        .value();
    return feeds[0] || undefined;
};

module.exports = {
    get: getProfiles,
    getById: getById,
    getFeeds: getFeeds,
    addToFeeds: addToFeeds,
    getSavedArticles: getSavedArticles
};
