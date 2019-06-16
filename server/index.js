var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var jQuery = require('jquery')(window);
var $ = jQuery;

var express = require("express");
var app = express();
var port = 8443;
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static("public"));



app.listen(port, () =>
{
    console.log('Listening on port', port);
});