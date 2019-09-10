const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
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

CourseSchema.set("toJSON", {
  virtuals: true,
});

let Course = mongoose.model('Course', CourseSchema);

module.exports = Course;