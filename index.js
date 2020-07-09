const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./connectDB.JS");
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/todo", require("./router/todo"));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
