const fs         = require('fs');
const G          = require('gulp');
const typescript = require('gulp-typescript').createProject('.build-config/tsconfig.json');
const replace    = require('gulp-replace');
const svelte     = require('gulp-svelte');
const sass       = require('gulp-sass');
const webpack    = require('gulp-webpack');
const terser     = require('gulp-terser');
const concat     = require('gulp-concat');
const { util }   = require('./config');


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Constants
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


const SET_MENU    = '/settings-menu';
const SRC_DIR     = './src' + SET_MENU;
const COMPILE_DIR = './out/compile' + SET_MENU;
const STAGE_DIR   = './out/stage';


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Intermediary Compilation Steps
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


G.task('settings-menu-ts', () => G.src(SRC_DIR + '/**/*.ts')
  .pipe(typescript())
  .pipe(replace('.svelte"', '"'))
  .pipe(G.dest(COMPILE_DIR)));

G.task('settings-menu-svelte', () => G.src(SRC_DIR + '/**/*.svelte')
  .pipe(svelte({css: false, format: 'cjs'}))
  .pipe(replace('.svelte"', '"'))
  .pipe(G.dest(COMPILE_DIR)));

G.task('settings-menu-sass', () => G.src(SRC_DIR + '/**/*.sass')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(G.dest(COMPILE_DIR)));


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Final Compilation Steps
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


G.task('settings-menu-js', () => G.src(COMPILE_DIR + '/ts/app.js')
  .pipe(webpack(util.webConfig('settings-menu.js')))
  // .pipe(terser())
  .pipe(G.dest(STAGE_DIR)));

G.task('settings-menu-html', (cb) => {
  fs.copyFile(SRC_DIR + '/html/index.html', STAGE_DIR + '/settings-menu.html', cb);
});

G.task('settings-menu-css', () => G.src(COMPILE_DIR + '/**/*.css')
  .pipe(concat('settings-menu.css'))
  .pipe(replace(/(\.\.\/)+res/g, './res'))
  .pipe(G.dest(STAGE_DIR)));


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Task Groups
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


// The following 3 tasks assume that the out directory is
// already populated.  These are for more quickly testing
// changes.
G.task('sm-only-ts', G.series('settings-menu-ts', 'settings-menu-js'));
G.task('sm-only-svelte', G.series('settings-menu-svelte', 'settings-menu-js'));
G.task('sm-only-sass', G.series('settings-menu-sass', 'settings-menu-css'));

G.task('settings-menu', G.series(
  G.parallel('settings-menu-ts', 'settings-menu-svelte', 'settings-menu-sass'),
  G.parallel('settings-menu-js', 'settings-menu-css', 'settings-menu-html'),
));