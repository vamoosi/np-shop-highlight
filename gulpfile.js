const fs      = require('fs');
const svelte  = require('gulp-svelte');
const sass    = require('gulp-sass');
const ts      = require('gulp-typescript').createProject('tsconfig.json');
const webpack = require('gulp-webpack');
const G       = require('gulp');
const replace = require('gulp-replace');
const concat  = require('gulp-concat');
const config  = require('./package.json');
const zip     = require('gulp-zip');

const dirs = {
  stage: './out/stage',
  work:  './out/compile/',
  res:   './out/stage/res',
  dist:  './dist'
};

G.task('clean-workspace', (cb) => {
  new Promise(g => fs.rmdir(dirs.work, {recursive: true}, g))
    .then(_ => fs.mkdir(dirs.work, {recursive: true}, cb));
});

G.task('compile-sass', () => G.src('./src/**/*.sass')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(G.dest(dirs.work)));

G.task('compile-ts', () => G.src('./src/**/*.ts')
  .pipe(ts())
  .pipe(replace('.svelte"', '"'))
  .pipe(G.dest(dirs.work)));

G.task('compile-svelte', () => G.src('./src/**/*.svelte')
  .pipe(svelte({css: false, format: 'cjs'}))
  .pipe(replace('.svelte"', '"'))
  .pipe(G.dest(dirs.work)));

G.task('stage-settings-js', () => G.src(dirs.work + 'settings-menu/ts/app.js')
  .pipe(webpack({
    output:       {filename: 'settings-menu.js'},
    optimization: {minimize: true},
    resolve:      {
      modules: [ 'node_modules', './out/compile' ],
    },
  }))
  .pipe(require('gulp-terser')())
  .pipe(G.dest(dirs.stage)));

G.task('active-tab-js', () => G.src(dirs.work + 'active-tab/app.js')
  .pipe(webpack({
    output:       {filename: 'active-tab.js'},
    optimization: {minimize: true},
    resolve:      {
      modules: [ 'node_modules', './out/compile' ],
    },
  }))
  .pipe(require('gulp-terser')())
  .pipe(G.dest(dirs.stage)));

G.task('migrate-js', () => G.src(dirs.work + 'init/migrate.js')
  .pipe(webpack({
    output:       {filename: 'migrate.js'},
    optimization: {minimize: true},
    resolve:      {
      modules: [ 'node_modules', './out/compile' ],
    },
  }))
  .pipe(require('gulp-terser')())
  .pipe(G.dest(dirs.stage)));

G.task('copy-tpl', () => G.src('./tpl/settings-menu.html')
  .pipe(G.dest(dirs.stage)));

G.task('copy-res', () => G.src('./res/*')
  .pipe(G.dest(dirs.res)));

G.task('merge-css', () => G.src(dirs.work + '**/*.css')
  .pipe(concat('style.css'))
  .pipe(replace(/(\.\.\/)+res/g, './res'))
  .pipe(G.dest(dirs.stage)));

G.task('manifest', () => G.src('./tpl/manifest.json')
  .pipe(replace('__VERSION__', config.version))
  .pipe(G.dest(dirs.stage)));

G.task('zip', () => G.src(dirs.stage + '/**/*')
  .pipe(zip(`${config.name}-v${config.version}.zip`))
  .pipe(G.dest(dirs.dist)));

exports.default = G.series(
  'clean-workspace',
  G.parallel('compile-sass', 'compile-ts', 'compile-svelte'),
  G.parallel(
    'stage-settings-js',
    'migrate-js',
    'copy-tpl',
    'active-tab-js',
    'copy-res',
    'merge-css',
  ),
);

exports.package = G.series(
  exports.default,
  'manifest',
  'zip'
);