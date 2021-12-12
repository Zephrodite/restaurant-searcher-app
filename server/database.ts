var mongoose = require("mongoose");

var startConnection: any = async (): Promise<void> => {
    try {
        const db = await mongoose.connect(
            "mongodb://localhost:27017/restaurants-searcher"
        );
        console.log(db.connection.name);
    } catch (error) {
        console.error(error);
    }
};

module.exports = startConnection;
