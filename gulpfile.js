const { src, dest, watch, series } = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const htmlmin = require("gulp-htmlmin");

function views() {
  console.log("Compiling Nunjucks…");
  return src("src/pages/**/*.njk")
    .pipe(
      nunjucksRender({
        path: ["src"],
      }).on("error", function (err) {
        console.error("Nunjucks error:", err.message);
        this.emit("end");
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: false,
        removeComments: false, // keep our debug comments
      })
    )
    .pipe(dest("./"));
}

function watcher() {
  watch("src/**/*.njk", views);
}

exports.default = series(views, watcher);
exports.build = views;

 