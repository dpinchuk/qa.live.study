const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    redirectPageClickOnImg: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

ArticleSchema.set("toJSON", {
  virtuals: true,
});

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
