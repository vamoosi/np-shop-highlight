const packageJson = require('../package.json');

const outputDir = {
  stage: 'out/stage',
  work:  'out/compile',
  res:   'out/stage/res',
  dist:  'dist',
};

const outputTargets = {
  styles:     'style.css',
  settings:   'settings-menu.js',
  background: 'migrate.js',
  inject:     'active-tab.js',
};

const inputDir = {
  res:  'res',
  tpl:  'tpl',
  node: 'node_modules',
  src:  'src',
};

const inputEntry = {
  // Post Process
  settingsJs:   outputDir.work + '/settings-menu/ts/app.js',
  injectJs:     outputDir.work + '/active-tab/app.js',
  backgroundJs: outputDir.work + '/init/migrate.js',
  stylesheets:  outputDir.work + '/**/*.css',

  // Templates
  settingsHtml: inputDir.tpl + '/settings-menu.html',
  manifest:     inputDir.tpl + '/manifest.json',

  // Compile
  svelte:       inputDir.src + '/**/*.svelte',
  sass:         inputDir.src + '/**/*.sass',
  typescript:   inputDir.src + '/**/*.ts',
  resources:    inputDir.res + '/**/*',

  // Package
  outputs:      outputDir.stage + '/**/*',
};


exports.util = {
  webConfig: (out) => ({
    output:       {filename: out},
    optimization: {minimize: true},
    resolve:      {modules: [ inputDir.node, outputDir.work ]},
  }),
  zipName: () => {
    return `${packageJson.name}-v${packageJson.version}.zip`
  }
};

exports.conf = {
  in:  {
    dir:   inputDir,
    entry: inputEntry,
  },
  out: {
    dir:    outputDir,
    target: outputTargets,
  },
};
