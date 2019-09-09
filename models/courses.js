const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
    {
      name: {
        type: String,
        require: true,
      },
      imgUrl: {
        type: String,
        require: true,
      },
      sessionCount: {
        type: Number,
        require: true,
      },
      summary: {
        type: String,
        require: true,
      },
      redirectPageClickOnImg: {
        type: String,
        require: false,
      },
      redirectPageClickOnSubscribe: {
        type: String,
        require: false,
      },
      redirectClickOnDetails: {
        type: String,
        require: true,
      }
    },

    {
      timestamps: true,
    }
);

schema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Course", schema);
