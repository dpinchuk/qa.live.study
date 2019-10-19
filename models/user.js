const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },

  lastName: {
    type: String,
  },

  email: {
    type: String,
    require: true,
    unique: true,
  },

  password: {
    type: String,
    require: true,
  },

  role: {
    type: String,
    require: true,
    default: "student",
  },

  status: {
    type: String,
    require: true,
    default: "active",
  },

  tariff: {
    type: String,
    require: true,
    default: "not selected",
  },

  payments: {
    type: Array,
    require: false,
    default: [],
  },
  expirationPaidDate: {
    type: Date,
    require: false,
    default: "",
  },

  commentAboutUser: {
    type: String,
    require: false,
    default: "",
  },

  courses: {
    type: Array,
    require: false,
    default: [],
  },

  updatedAt: {
    type: Date,
    require: true,
    default: Date.now(),
  },

  createdAt: {
    type: Date,
    require: true,
    default: Date.now(),
  },
});

UserSchema.set("toJSON", {
  virtuals: true,
});

let User = mongoose.model("User", UserSchema);

module.exports = User;
