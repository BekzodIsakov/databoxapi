// run in terminal: /users/bekzodisakov/mongodb/bin/mongod --dbpath=/users/bekzodisakov/mongodb-data
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/data-box")
  .then(() => console.log("Successfully connected to MongoDB!"))
  .catch((error) => console.error("Connection error:", error));
