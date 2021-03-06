const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const concat = require("gulp-concat");
const uglify = require("gulp-uglifyjs");
const cssnano = require("gulp-cssnano");
const rename = require("gulp-rename");
const del = require("del");

gulp.task("clean", () => {
  return del.sync("dist");
});
gulp.task("js", () => {
  return gulp
    .src(["app/js/common.js", "app/js/**/*.js"])
    .pipe(browserSync.reload({ stream: true }));
});
gulp.task("css-libs", function() {
  return gulp
    .src("app/sass/libs.sass") // Выбираем файл для минификации
    .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
    .pipe(cssnano()) // Сжимаем
    .pipe(rename({ suffix: ".min" })) // Добавляем суффикс .min
    .pipe(gulp.dest("app/css")); // Выгружаем в папку app/css
});
gulp.task("scripts", () => {
  return gulp
    .src([
      "app/libs/jquery/dist/jquery.min.js",
      "app/libs/magnific-popup/dist/jquery.magnific-popup.js"
    ])
    .pipe(concat("libs.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/js"));
});
gulp.task("code", () => {
  return gulp.src("app/*.html").pipe(browserSync.reload({ stream: true }));
});
gulp.task("sass", function() {
  // Создаем таск Sass
  return gulp
    .src("app/sass/**/*.sass") // Берем источник
    .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
    .pipe(gulp.dest("app/css")) // Выгружаем результата в папку app/css
    .pipe(browserSync.reload({ stream: true })); // Обновляем CSS на странице при изменении
});

gulp.task("browser-sync", function() {
  // Создаем таск browser-sync
  browserSync({
    // Выполняем browserSync
    server: {
      // Определяем параметры сервера
      baseDir: "app" // Директория для сервера - app
    },
    notify: false // Отключаем уведомления
  });
});

gulp.task("watch", function() {
  gulp.watch("app/sass/**/*.sass", gulp.parallel("sass")); // Наблюдение за sass файлами
  gulp.watch("app/*.html", gulp.parallel("code")); // Наблюдение за HTML файлами в корне проекта
  gulp.watch(
    ["app/js/common.js", "app/libs/**/*.js"],
    gulp.parallel("scripts")
  ); // Наблюдение за главным JS файлом и за библиотеками
});
gulp.task(
  "default",
  gulp.parallel("css-libs", "sass", "scripts", "browser-sync", "watch")
);
