const gulp = require("gulp");
const path = require("path");
const less = require("gulp-less");

gulp.task("less", () => {
  return gulp
    .src("styles/**/style.less")
    .pipe(
      less({
        paths: [path.join(__dirname, "less", "includes")],
      })
    )
    .pipe(gulp.dest("./public/css"));
  // .pipe(browserSync.reload({stream: true}))
});
