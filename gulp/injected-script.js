const G          = require('gulp');
const typescript = require('gulp-typescript').createProject('tsconfig.json');
const replace    = require('gulp-replace');
const webpack    = require('gulp-webpack');
const terser     = require('gulp-terser');
const { util }   = require('./config');


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Constants
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


const ACT_MENU    = '/active-tab';
const SRC_DIR     = './src' + ACT_MENU;
const COMPILE_DIR = './out/compile' + ACT_MENU;
const STAGE_DIR   = './out/stage';


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Intermediary Compilation Steps
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


G.task('active-tab-ts', () => G.src(SRC_DIR + '/**/*.ts')
  .pipe(typescript())
  .pipe(replace('.svelte"', '"'))
  .pipe(G.dest(COMPILE_DIR)));


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Final Compilation Steps
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


G.task('active-tab-js', () => G.src(COMPILE_DIR + '/app.js')
  .pipe(webpack(util.webConfig('active-tab.js')))
  .pipe(terser())
  .pipe(G.dest(STAGE_DIR)));


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Task Groups
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


// The following 3 tasks assume that the out directory is
// already populated.  These are for more quickly testing
// changes.
G.task('only-ts', G.series('active-tab-ts', 'active-tab-js'));

G.task('active-tab', G.series(
  'active-tab-ts',
  'active-tab-js',
));