
var mongoose = require('mongoose');

let searchresultsSchema = new mongoose.Schema({
        search_value: String,
        places: Array
    },
    {
        versionKey: false,
    });

module.exports = mongoose.model("searchresults", searchresultsSchema);
