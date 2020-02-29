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


const ACT_MENU    = '/action-menu';
const SRC_DIR     = './src' + ACT_MENU;
const COMPILE_DIR = './out/compile' + ACT_MENU;
const STAGE_DIR   = './out/stage';


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Intermediary Compilation Steps
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


G.task('action-menu-ts', () => G.src(SRC_DIR + '/**/*.ts')
  .pipe(typescript())
  .pipe(replace('.svelte"', '"'))
  .pipe(G.dest(COMPILE_DIR)));

G.task('action-menu-svelte', () => G.src(SRC_DIR + '/**/*.svelte')
  .pipe(svelte({css: false, format: 'cjs'}))
  .pipe(replace('.svelte"', '"'))
  .pipe(G.dest(COMPILE_DIR)));

G.task('action-menu-sass', () => G.src(SRC_DIR + '/**/*.sass')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(G.dest(COMPILE_DIR)));


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Final Compilation Steps
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


G.task('action-menu-js', () => G.src(COMPILE_DIR + '/ts/app.js')
  .pipe(webpack(util.webConfig('action-menu.js')))
  .pipe(terser())
  .pipe(G.dest(STAGE_DIR)));

G.task('action-menu-html', (cb) => {
  fs.copyFile(SRC_DIR + '/html/index.html', STAGE_DIR + '/action-menu.html', cb);
});

G.task('action-menu-css', () => G.src(COMPILE_DIR + '/**/*.css')
  .pipe(concat('action-menu.css'))
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
G.task('am-only-ts', G.series('action-menu-ts', 'action-menu-js'));
G.task('am-only-svelte', G.series('action-menu-svelte', 'action-menu-js'));
G.task('am-only-sass', G.series('action-menu-sass', 'action-menu-css'));

G.task('action-menu', G.series(
  G.parallel('action-menu-ts', 'action-menu-svelte', 'action-menu-sass'),
  G.parallel('action-menu-js', 'action-menu-css', 'action-menu-html'),
));