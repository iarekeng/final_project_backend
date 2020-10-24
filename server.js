// DEPENDENCIES
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connection;
require("dotenv").config();

// PORT
const PORT = process.env.PORT;

// DATABASE
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// ERROR OR SUCCESS TO DB
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongoDB connected:"));
db.on("disconnected", () => console.log("mongoDB disconnected"));

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CONTROLERS
const reviewController = require('./controllers/reviews_controller.js')
app.use('/', reviewController)

// LISTENER
app.listen(PORT, () =>
console.log(`Listening on Port ${PORT}`));
