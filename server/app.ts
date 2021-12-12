"use strict";

var express = require("express");
var morgan = require("morgan");
var app = express();
var cors = require("cors");
var searchresults = require("./routes");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api", searchresults);

module.exports = app;
