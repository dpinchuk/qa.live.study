const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
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
    },

    status: {
      type: String,
      require: true,
    },

    tariff: {
      type: String,
      require: true,
    },

    payments: {
      type: Array,
      require: false,
    },
    expirationPaidDate: {
      type: Date,
      require: false,
    },

    commentAboutUser: {
      type: String,
      require: false,
    },

    courses: {
      type: Array,
      require: false,
    },
  },

  {
    timestamps: true,
  }
);

UserSchema.set("toJSON", {
  virtuals: true,
});

let User = mongoose.model('User', UserSchema);

module.exports = User;