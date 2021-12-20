"use strict";
var mongoose = require("mongoose");
var searchresultsSchema = new mongoose.Schema({
    search_value: String,
    places: Array,
}, {
    versionKey: false
});
module.exports = mongoose.model("searchresults", searchresultsSchema);
