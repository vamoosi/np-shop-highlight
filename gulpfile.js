const fs           = require('fs');
const svelte       = require('gulp-svelte');
const sass         = require('gulp-sass');
const ts           = require('gulp-typescript').createProject('tsconfig.json');
const webpack      = require('gulp-webpack');
const G            = require('gulp');
const replace      = require('gulp-replace');
const concat       = require('gulp-concat');
const packageJson  = require('./package.json');
const zip          = require('gulp-zip');
const terser       = require('gulp-terser');
const {util, conf} = require('./gulp/config');
const U            = require("./gulp/util");
const P            = require("child_process");

G.task('compile-sass', () => G.src(conf.in.entry.sass)
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(G.dest(conf.out.dir.work)));

G.task('compile-ts', () => G.src(conf.in.entry.typescript)
  .pipe(ts())
  .pipe(replace('.svelte"', '"'))
  .pipe(G.dest(conf.out.dir.work)));

G.task('compile-svelte', () => G.src(conf.in.entry.svelte)
  .pipe(svelte({css: false, format: 'cjs'}))
  .pipe(replace('.svelte"', '"'))
  .pipe(G.dest(conf.out.dir.work)));

G.task('stage-settings-js', () => G.src(conf.in.entry.settingsJs)
  .pipe(webpack(util.webConfig(conf.out.target.settings)))
  .pipe(terser())
  .pipe(G.dest(conf.out.dir.stage)));

G.task('active-tab-js', () => G.src(conf.in.entry.injectJs)
  .pipe(webpack(util.webConfig(conf.out.target.inject)))
  .pipe(terser())
  .pipe(G.dest(conf.out.dir.stage)));

G.task('migrate-js', () => G.src(conf.in.entry.backgroundJs)
  .pipe(webpack(util.webConfig(conf.out.target.background)))
  .pipe(terser())
  .pipe(G.dest(conf.out.dir.stage)));

G.task('merge-css', () => G.src(conf.in.entry.stylesheets)
  .pipe(concat(conf.out.target.styles))
  .pipe(replace(/(\.\.\/)+res/g, './res'))
  .pipe(G.dest(conf.out.dir.stage)));

G.task('manifest', () => G.src(conf.in.entry.manifest)
  .pipe(replace('__VERSION__', packageJson.version))
  .pipe(G.dest(conf.out.dir.stage)));

G.task('zip', () => G.src(conf.in.entry.outputs)
  .pipe(zip(util.zipName()))
  .pipe(G.dest(conf.out.dir.dist)));

G.task('git-patch', (cb) => {
  const inVersion = U.version.parse(packageJson.version);
  inVersion.patch++;
  packageJson.version = U.version.toString(inVersion);
  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
  P.execSync("git add package.json");
  P.execSync("git commit -m 'version bump'");
  P.execSync(`git tag v${packageJson.version}`);
  P.execSync(`git push`);
  P.execSync(`git push --tag`);
  cb();
});

exports.default = G.series(
  U.cleanup,
  G.parallel('compile-sass', 'compile-ts', 'compile-svelte'),
  G.parallel(
    'stage-settings-js',
    'migrate-js',
    U.copyTpl,
    'active-tab-js',
    U.copyRes,
    'merge-css',
    'manifest',
  ),
);

exports.package = G.series(exports.default, 'zip');