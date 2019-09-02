const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
// const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');

gulp.task('scss', () => {
    return (
        gulp
            .src('dev/scss/**/*.scss')
            .pipe(plumber())
            .pipe(sass())
            .pipe(
                autoprefixer(['last 15 version', '> 1%', 'ie 8', 'ie 7'], {
                    cascade: true
                })
            )
            .pipe(cssnano())
            .pipe(gulp.dest('public/css'))
            // .pipe(browserSync.reload({stream: true}))
    );
});

gulp.task('default', ['scss'], () => {
    gulp.watch('dev/scss/**/*.scss', ['scss']);
    // gulp.watch('dist/*.html', browserSync.reload);
});