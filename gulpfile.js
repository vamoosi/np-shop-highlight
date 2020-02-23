const fs     = require('fs');
const svelte = require('gulp-svelte');
const sass   = require('gulp-sass');
const ts     = require('gulp-typescript').createProject('tsconfig.json');

const G = require('gulp');

const dirs = {
  stage: './out/stage',
  work: './out/compile/'
};

G.task('clean-workspace', (cb) => {
  new Promise(g => fs.rmdir(dirs.work, {recursive: true}, g))
    .then(_ => fs.mkdir(dirs.work, cb));
});


G.task('compile-sass', () => {
  return G.src('./src/**/*.sass')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(G.dest(dirs.work));
});

G.task('compile-ts', () => {
  return G.src('./src/**/*.ts')
    .pipe(ts())
    .pipe(require('gulp-replace')('.svelte"', '"'))
    .pipe(G.dest(dirs.work));
});

G.task('compile-svelte', () => {
  return G.src('./src/**/*.svelte')
    .pipe(svelte({css: false}))
    .pipe(require('gulp-replace')('.svelte"', '"'))
    .pipe(G.dest(dirs.work));
});

function defaultTask(cb) {
  cb();
}

exports.default = defaultTask;