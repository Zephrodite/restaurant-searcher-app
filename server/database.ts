var mongoose = require("mongoose");
require("dotenv").config();

var startConnection: any = async (): Promise<void> => {
    try {
        const db = await mongoose.connect(
            "mongodb+srv://zephexhkr:test1234@cluster0.yd111.mongodb.net/restaurants-searcher?retryWrites=true&w=majority" || "mongodb://localhost:27017/restaurants-searcher"
        );
        console.log(db.connection.name);
    } catch (error) {
        console.error(error);
    }
};

module.exports = startConnection;
