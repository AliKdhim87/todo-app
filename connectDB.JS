const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_KEY, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    console.log("DB connected");
  } catch (error) {
    console.error(error.message);
  }
};
module.exports = connectDB;
