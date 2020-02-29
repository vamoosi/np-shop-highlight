const G          = require('gulp');
const typescript = require('gulp-typescript').createProject('tsconfig.json');


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Constants
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

const LIB_DIR     = '/lib';
const CONF_DIR    = '/config';
const SRC_DIR     = './src';
const COMPILE_DIR = './out/compile';


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Intermediary Compilation Steps
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

G.task('lib-ts', () => G.src(SRC_DIR + LIB_DIR + '/**/*.ts')
  .pipe(typescript())
  .pipe(G.dest(COMPILE_DIR + LIB_DIR)));
G.task('conf-ts', () => G.src(SRC_DIR + CONF_DIR + '/**/*.ts')
  .pipe(typescript())
  .pipe(G.dest(COMPILE_DIR + CONF_DIR)));


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Task Groups
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


G.task('libs', G.series('conf-ts', 'lib-ts'));