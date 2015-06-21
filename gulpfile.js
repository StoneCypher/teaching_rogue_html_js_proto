
var fs         = require('fs'),
    path       = require('path'),
    source     = require('vinyl-source-stream'),
    gulp       = require('gulp'),
    browserify = require('browserify'),
    reactify   = require('reactify');





var production   = (process.env.NODE_ENV === "production"),

    errorHandler = function(err) {
      console.log(err.toString());
      this.emit("end");
    };





var dirs = { // todo whargarbl pull these out into a support file at some point

  build          : './build',
  built_js       : './build/js',
  react_npm      : './node_modules/react/dist',
  flocks_npm     : './node_modules/flocks.js/lib',
  publish        : './build/publish',
  publish_assets : './build/publish/assets',
  assets         : './src/assets',
  html           : './site',
  js             : './src/js',
  react          : './src/jsx',
  docs           : './build/docs',
  src            : './src'

};





gulp.task('clean', function() {
  return gulp.src([dirs.build], {"read" : false}).pipe(clean());
});





gulp.task('make-directories', ['clean', 'gc-copy-js'], function() {

  for (var key in dirs) {
    try      { fs.mkdirSync('.' + path.sep + path.normalize(dirs[key])); }
    catch(e) { if (e.code !== 'EEXIST') { console.log('caught ' + JSON.stringify(e) + ' while making dirs'); } }
  }

});





gulp.task('make-directories', function() {

});





gulp.task('react', ['make-directories'], function() {

  var browserifyConfig = {
//  "entries"    : [dirs.src + path.sep + "environment.js", dirs.src + path.sep + "util.js", dirs.src + path.sep + "global-components-ui.js"],
    "entries"    : [],
    "extensions" : [".jsx"]
  };

  return browserify(browserifyConfig, { "debug" : !production })
    .transform({ "es6" : true }, reactify)
//  .add(dirs.react_npm      + "/react.js",   { "expose" : "react" })
//  .add(dirs.flocks_npm     + "/flocks.jsx", { "expose" : "flocks" })
//  .add(dirs.src + path.sep +  "repdef.jsx", { "expose" : "repdef" })
    .bundle()
    .on("error", errorHandler)
    .pipe(source("bundle.js"))
    .pipe(gulp.dest(dirs.built_js));

});





gulp.task('build',   ['react']);
gulp.task('default', ['build']);
