const packageJson = require('../package.json');

const outputDir = {
  stage: 'out/stage',
  work:  'out/compile',
  res:   'out/stage/res',
  dist:  'dist',
};

const inputDir = {
  res:  'res',
  tpl:  'tpl',
  node: 'node_modules',
};

const inputEntry = {
  manifest:     inputDir.tpl + '/manifest.json',
  outputs: outputDir.stage + '/**/*',
};

exports.util = {
  webConfig: (out) => ({
    output:       {filename: out},
    optimization: {minimize: true},
    resolve:      {modules: [ inputDir.node, outputDir.work ]},
  }),
  zipName:   () => {
    return `${packageJson.name}-v${packageJson.version}.zip`;
  },
};

exports.conf = {
  in:  {
    dir:   inputDir,
    entry: inputEntry,
  },
  out: {
    dir:    outputDir,
  },
};
