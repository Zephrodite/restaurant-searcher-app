"use strict";

var express = require("express");
var morgan = require("morgan");
var app = express();
var cors = require("cors");
var searchresults = require("./routes/index");
var serveStatic = require('serve-static');
var path = require('path');


app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api", searchresults);
app.use('/', serveStatic(path.join(__dirname, '/dist')))

module.exports = app;
