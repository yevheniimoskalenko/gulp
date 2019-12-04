const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");

// gulp.task("mytask", () => {
//   return gulp
//     .src("surce-files")
//     .pipe(plagin())
//     .pipe(gulp.dest("folder"));
// });
gulp.task("sass", function() {
  return gulp
    .src(["!app/sass/main.sass", "app/sass/**/*.sass"])
    .pipe(sass())
    .pipe(gulp.dest("app/css"));
});
gulp.task("watches", function() {
  gulp.watch("app/sass/**/*.sass", gulp.parallel("sass"));
});
gulp.task("Brawser", () => {
  browserSync({
    server: {
      baseDir: "app"
    }
  });
});
