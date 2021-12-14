"use strict";

var app = require("./app");
var startConnection = require("./database");

startConnection();
const port = process.env.PORT || 3000
app.listen(port);
console.log("Server on port", port);
