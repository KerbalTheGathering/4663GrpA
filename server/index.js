var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var jQuery = require('jquery')(window);
var $ = jQuery;

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