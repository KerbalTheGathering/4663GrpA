var express = require("express");
var app = express();
var port = 4663;
var bodyParser = require('body-parser');
var articles = require('./articles.js');
var profiles = require('./profiles.js');

app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/articles.json", (req, res) =>
{
    res.json(articles.get());
});

app.get("/profiles.json", (req, res) =>
{
    res.json(profiles.get());
});

app.listen(port, () =>
{
    console.log('Listening on port', port);
});