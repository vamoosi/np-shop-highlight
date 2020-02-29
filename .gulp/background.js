const G          = require('gulp');
const typescript = require('gulp-typescript').createProject('.build-config/tsconfig.json');
const replace    = require('gulp-replace');
const webpack    = require('gulp-webpack');
const terser     = require('gulp-terser');
const { util }   = require('./config');


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Constants
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


const BACKGROUND    = '/background';
const SRC_DIR     = './src' + BACKGROUND;
const COMPILE_DIR = './out/compile' + BACKGROUND;
const STAGE_DIR   = './out/stage';


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Intermediary Compilation Steps
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


G.task('background-ts', () => G.src(SRC_DIR + '/**/*.ts')
  .pipe(typescript())
  .pipe(replace('.svelte"', '"'))
  .pipe(G.dest(COMPILE_DIR)));


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Final Compilation Steps
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


G.task('background-js', () => G.src(COMPILE_DIR + '/app.js')
  .pipe(webpack(util.webConfig('background.js')))
  .pipe(terser())
  .pipe(G.dest(STAGE_DIR)));


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Task Groups
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


G.task('background', G.series('background-ts', 'background-js'));