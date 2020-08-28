import mongoose from 'mongoose';
module.exports = {
    config: class dbConfig {
        mongooseConnection() {
            try {
                mongoose.connect("mongodb://localhost:27017/shopping", { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }, (err, db) => {
                    if (err) {
                        throw err;
                    }
                    console.log("Server is listening on port 3000");
                    global.db=db;
                });
            }
            catch (err) {
                console.log("Sorry,connection to db failed")
            }
        }
    }
}
global.mongoose=mongoose;