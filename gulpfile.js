
var fs         = require('fs'),
    path       = require('path'),
    less       = require('gulp-less'),
    clean      = require('gulp-clean'),
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
  html           : './src/html',
  js             : './src/js',
  react          : './src/jsx',
  docs           : './build/docs',
  src            : './src'

};





gulp.task('clean', function() {
  return gulp.src([dirs.build], {"read" : false}).pipe(clean());
});





gulp.task('make-directories', ['clean'], function() {

  for (var key in dirs) {
    try      { fs.mkdirSync('.' + path.sep + path.normalize(dirs[key])); }
    catch(e) { if (e.code !== 'EEXIST') { console.log('caught ' + JSON.stringify(e) + ' while making dirs'); } }
  }

});





gulp.task('less', function () {
  return gulp.src('./' + hostdir + 'stylesheets/app.less')
    .pipe(less())
    .pipe(gulp.dest('./' + hostdir));
});





gulp.task('watch', function () {
  gulp.watch('./' + hostdir + 'stylesheets/**/*', ['less-transform']);
});





gulp.task('publish', ['make-directories', 'react', 'sass-transform'], function() {

  var lcmds       = [],
      assets      = [
        { source: dirs.html       + '/index.html', destination: dirs.publish },
        { source: dirs.src        + '/rl.css',     destination: dirs.publish },
        { source: dirs.src        + '/rl.js',      destination: dirs.publish },
        { source: dirs.flocks_npm + '/flocks.jsx', destination: dirs.publish },
        { source: dirs.assets     + '/*',          destination: dirs.publish_assets },
        { source: dirs.built_js   + '/bundle.js',  destination: dirs.publish }
      ];

  assets.map(function(target) {
    lcmds.push('cp -rf ' + target.source + ' ' + target.destination + ' 2>/dev/null || :');
  });

  return gulp.run(shell.task(lcmds));

});





gulp.task('react', ['make-directories'], function() {

  var browserifyConfig = {
    "extensions" : [".jsx"]
  };

  return browserify(browserifyConfig, { "debug" : !production })
    .transform({ "es6" : true }, reactify)
    .add(dirs.react_npm        + "/react.js",   { "expose" : "react" })
    .add(dirs.flocks_npm       + "/flocks.jsx", { "expose" : "flocks" })
    .add(dirs.react + path.sep + "tr.jsx",      { "expose" : "tr" })
    .bundle()
    .on("error", errorHandler)
    .pipe(source("bundle.js"))
    .pipe(gulp.dest(dirs.built_js));

});





gulp.task('build',   ['react']);
gulp.task('default', ['build']);
