const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://ali:X4s2QqNyS9oV4mwf@cluster0.1xhs4.mongodb.net/todo?retryWrites=true&w=majority",
      {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      }
    );
    console.log("DB connected");
  } catch (error) {
    console.error(error.message);
  }
};
module.exports = connectDB;
