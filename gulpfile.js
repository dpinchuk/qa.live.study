const gulp = require("gulp");
const path = require('path');
const less = require("gulp-less");
/*
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const plumber = require("gulp-plumber"); */

gulp.task("less", () => {
  return gulp
    .src("styles/**/*.less")
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
  // .pipe(browserSync.reload({stream: true}))
});
