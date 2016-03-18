// Gulp settings file.
'use strict';

// ========================
// Requires (dependencies).
// ========================

var importOnce   = require('node-sass-import-once');
var path         = require('path');
var gulp         = require('gulp');
var $            = require('gulp-load-plugins')();
var del          = require('del');
var sass         = require('gulp-sass'); // gulp-load-plugins will complain unless you load gulp-sass manually.

// ========================
// Options (configuration).
// ========================

var options = {};

options.rootPath = {
  project     : __dirname + '/',
  theme       : __dirname + '/'
};

options.theme = {
  css     : options.rootPath.theme + 'assets/css/',
  sass    : options.rootPath.theme + 'assets/sass/',
  js      : options.rootPath.theme + 'assets/js/'
};

options.sass = {
  importer: importOnce,
  includePaths: [
    options.theme.sass,
    options.rootPath.project + 'node_modules/breakpoint-sass/stylesheets',
    options.rootPath.project + 'node_modules/sassy-maps/sass',
    options.rootPath.project + 'node_modules/support-for/sass',
    options.rootPath.project + 'node_modules/susy/sass'
  ],
  outputStyle: 'expanded'
};

options.sassFiles = [
  options.theme.sass + '**/*.scss'
];

// Define which browsers to add vendor prefixes for.
options.autoprefixer = {
  browsers: [
    '> 1%',
    'ie 8'
  ]
};

// ========================
// Tasks.
// ========================

// Build CSS.
gulp.task('styles', function() {
  return gulp.src(options.sassFiles)
    .pipe($.sourcemaps.init())
    .pipe(sass(options.sass).on('error', sass.logError))
    .pipe($.autoprefixer(options.autoprefixer))
    .pipe($.size({showFiles: true}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(options.theme.css))
});
