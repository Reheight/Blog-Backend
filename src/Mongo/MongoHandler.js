//#region We will import the required libraries
const mongoose = require("mongoose");
//#endregion

//#region We are going to define a MongoDB connection function with a callback.
const connect = (callback) => {
  mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (error) => {
      return callback(error);
    }
  );

  callback();
};
//#endregion

//#region We will export functions we want other files/classes to be capable of accessing.
module.exports = {
  connect,
};
//#endregion
