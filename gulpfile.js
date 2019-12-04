const gulp = require("gulp");
const sass = require("gulp-sass");

// gulp.task("mytask", () => {
//   return gulp
//     .src("surce-files")
//     .pipe(plagin())
//     .pipe(gulp.dest("folder"));
// });
gulp.task("sass", () => {
  return gulp
    .src(["!app/sass/main.sass", "app/sass/**/*.sass"])
    .pipe(sass())
    .pipe(gulp.dest("app/css"));
});
