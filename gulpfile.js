
var fs         = require('fs'),
    path       = require('path'),
    shell      = require('gulp-shell'),
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
  built_css      : './build/css',
  react_npm      : './node_modules/react/dist',
  flocks_npm     : './node_modules/flocks.js/lib',
  publish        : './build/publish',
  publish_assets : './build/publish/assets',
  assets         : './src/assets',
  html           : './src/html',
  js             : './src/js',
  less           : './src/less',
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





gulp.task('less', ['make-directories'], function () {
  return gulp.src(dirs.less + '/app.less')
    .pipe(less())
    .pipe(gulp.dest(dirs.built_css));
});





gulp.task('watch', function () {
  gulp.watch('./' + hostdir + 'stylesheets/**/*', ['less-transform']);
});





gulp.task('publish', ['make-directories', 'react', 'build', 'less'], function() {

  var lcmds       = [],
      assets      = [
        { source: dirs.html       + '/index.html', destination: dirs.publish },
        { source: dirs.built_css  + '/app.css',    destination: dirs.publish },
        { source: dirs.flocks_npm + '/flocks.jsx', destination: dirs.publish },
//      { source: dirs.assets     + '/*',          destination: dirs.publish_assets },
        { source: dirs.built_js   + '/bundle.js',  destination: dirs.publish }
      ];

  assets.map(function(target) {
    lcmds.push('cp -rf ' + target.source + ' ' + target.destination);
  });

  return gulp.run(shell.task(lcmds));

});





gulp.task('react', ['make-directories'], function() {

  var browserifyConfig = {
    "extensions" : [".jsx"]
  };

  return browserify(browserifyConfig, { "debug" : !production })

    .transform({ "es6" : true }, reactify)

    .add(dirs.react_npm  + "/react.js",       { "expose" : "react" })
    .add(dirs.flocks_npm + "/flocks.jsx",     { "expose" : "flocks" })
    .add(dirs.react      + "/tr.jsx",         { "expose" : "tr" })

    .add(dirs.js         + "/ui.js",          { "expose" : "ui" })
    .add(dirs.js         + "/player.js",      { "expose" : "player" })
    .add(dirs.js         + "/renderer.js",    { "expose" : "renderer" })
    .add(dirs.js         + "/map.js",         { "expose" : "map" })
    .add(dirs.js         + "/rl.js",          { "expose" : "rl" })
    .add(dirs.js         + "/monsters.js",    { "expose" : "monsters" })
    .add(dirs.js         + "/baseMonster.js", { "expose" : "baseMonster" })

    .add(dirs.js         + "/boot.js",        { "expose" : "boot" })

    .bundle()

    .on("error", errorHandler)
    .pipe(source("bundle.js"))
    .pipe(gulp.dest(dirs.built_js));

});





gulp.task('build',   ['react']);
gulp.task('default', ['build']);
