var express = require("express");
var app = express();
var port = 4663;
var bodyParser = require('body-parser');
var low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
//var articles = require('./articles.js');
//var profiles = require('./profiles.js');

app.use(bodyParser.json());

app.use(express.static("public"));

const adapter = new FileAsync('./db.json');
low(adapter)
    .then(db =>
        {
            app.get('/articles.json', (req, res) =>
            {
                var articles = db.get('articles')
                .value();
                console.log(articles);
                res.send(articles);
            });
            app.get('/profiles.json', (req, res) => 
            {
                if (req.query.action === "getfeeds")
                {
                    var feeds = db.get('profiles')
                    .find({ id: req.query["id"] })
                    .value();
                    console.log(feeds);
                    res.send(feeds);
                } else {
                    var profiles = db.get('profiles')
                    .value();
                    console.log(profiles);
                    res.send(profiles);
                }
            });
        });
/*
app.get("/articles.json", (req, res) =>
{
    res.json(articles.get());
});

app.get("/profiles.json", (req, res) =>
{
    if (req.query.action === "getfeeds")
    {
        console.log(req.query);
        var feeds = profiles.getFeeds(req.query["id"]);
        console.log(feeds);
        res.json(feeds);
    } else {
        res.json(profiles.get());
    }
});
*/
app.listen(port, () =>
{
    console.log('Listening on port', port);
});