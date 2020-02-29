const fs           = require('fs');
const G            = require('gulp');
const replace      = require('gulp-replace');
const packageJson  = require('./package.json');
const zip          = require('gulp-zip');
const C            = require('./.gulp/config');
const U            = require("./.gulp/util");

const {util, conf} = C;

require('./.gulp/action-menu');
require('./.gulp/settings-menu');
require('./.gulp/injected-script');
require('./.gulp/background');
require('./.gulp/libs');

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// Distribution Scripts
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

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
  U.gitPackage(packageJson.version);
  cb();
});

G.task('git-feature', (cb) => {
  const inVersion = U.version.parse(packageJson.version);
  inVersion.minor++;
  inVersion.patch = 0;
  packageJson.version = U.version.toString(inVersion);
  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
  U.gitPackage(packageJson.version);
  cb();
});


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Exported Tasks
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


exports.default = G.series(
    U.cleanup,
    'libs',
    G.parallel(
      'settings-menu',
      'action-menu',
      'background',
      'active-tab',
      U.copyRes,
      'manifest',
    ),
  );

exports.dist = G.series(exports.default, 'zip');
