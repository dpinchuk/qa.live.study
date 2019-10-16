const config = require("./config");
const mongoose = require("mongoose");

module.exports = () => {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.set("debug", config.IS_PRODUCTION);
    mongoose.connection
      .on("error", error => reject(error))
      .on("close", () => {
        console.log("Database connection closed!");
      })
      .once("open", () => {
        resolve(mongoose.connections[0]);
      });

    mongoose.connect(config.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
  });
};
