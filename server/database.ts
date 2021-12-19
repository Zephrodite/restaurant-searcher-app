var mongoose = require("mongoose");
require('dotenv').config()

var startConnection: any = async (): Promise<void> => {
    try {
        const db = await mongoose.connect(
            process.env.VUE_APP_DB_URL

        );
        console.log(db.connection.name);
    } catch (error) {
        console.error(error);
    }
};

module.exports = startConnection;
