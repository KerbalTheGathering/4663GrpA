const low = require("lowdb");
const db = low("server/db.json");

// Populate database with data
db
    .defaults(
    {
        articles: require("./fixtures/articles.js"),
        profiles: require("./fixtures/profiles.js")
    })
    .value();

module.exports = db;