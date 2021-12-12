"use strict";

var app = require("./app");
var startConnection = require("./database");

startConnection();
app.listen(3000);
console.log("Server on port", 3000);