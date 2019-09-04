"use strict";

const mongoose = require("mongoose");
let validator = require("validator");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

mongoose.connect(
  "mongodb+srv://dpinchuk:dmss111278DAP@cluster0-09iwb.mongodb.net/QALiveStudy?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  error => {
    if (error) {
      console.log(error);
    } else {
      console.log("connection successful");
    }
  }
);

const connection = mongoose.createConnection(
  "mongodb+srv://dpinchuk:dmss111278DAP@cluster0-09iwb.mongodb.net/QALiveStudy?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
autoIncrement.initialize(connection);

const userSchema = new Schema({
  name: String,
  lastname: String,
  login: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      return validator.isEmail(value);
    },
  },
  password: String,
  role: String,
  status: Boolean,
  courses: Array,
});

userSchema.plugin(autoIncrement.plugin, "test.js");

module.exports = mongoose.model("users", userSchema);
