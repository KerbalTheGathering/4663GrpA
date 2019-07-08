const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./server/db.json');
const db = low(adapter);

// Populate database with data
db
    .defaults(
    {
        articles: require("./articles.js"),
        profiles: require("./profiles.js")
    })
    .value();

module.exports = db;