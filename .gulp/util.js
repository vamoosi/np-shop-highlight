const fs     = require('fs');
const {conf} = require('./config');
const P      = require('child_process');

/**
 * @param {function(*, *=)} cb
 */
exports.copyRes = cb => {
  new Promise(g => readRecursive(conf.in.dir.res, g))
    .then(v => copyFiles(v, conf.in.dir.res, conf.out.dir.res, cb));
};

exports.cleanup = (cb) => {
  new Promise(g => fs.rmdir(conf.out.dir.work, {recursive: true}, g))
    .then(_ => new Promise(g => fs.mkdir(conf.out.dir.work, {recursive: true}, g)))
    .then(_ => new Promise(g => fs.rmdir(conf.out.dir.stage, {recursive: true}, g)))
    .then(_ => fs.mkdir(conf.out.dir.stage, {recursive: true}, cb));
};

exports.gitPackage = (version) => {
  P.execSync('git add package.json');
  P.execSync('git commit -m \'version bump\'');
  P.execSync(`git tag v${version}`);
  P.execSync(`git push`);
  P.execSync(`git push --tag`);
};

/**
 * @param {string} vs
 * @return {{patch: number, major: number, minor: number}}
 */
const parse = vs => {
  const parts = vs.split('.');
  return {
    major: parseInt(parts[0]),
    minor: parseInt(parts[1]),
    patch: parseInt(parts[2]),
  };
};

/**
 * @param {{major: number, minor: number, patch:number}} vs
 * @return {string}
 */
const toString = vs => `${vs.major}.${vs.minor}.${vs.patch}`;

exports.version = {
  parse,
  toString,
};

function copyFiles(entries, from, to, cb) {
  const m = {};
  for (const entry of entries) {
    if (!m.hasOwnProperty(entry.path)) {
      m[entry.path] = join(to, entry.path.substring(from.length + 1));
      fs.mkdirSync(m[entry.path], {recursive: true});
    }
    fs.copyFileSync(join(entry.path, entry.name), join(m[entry.path], entry.name));
  }
  cb();
}

function join(a, b) {
  if (!b || b.length === 0)
    return a;
  return a.endsWith('/') ? a + b : a + '/' + b;
}

function readRecursive(path, cb) {
  const options = {withFileTypes: true};
  const queue   = [ path ];
  const out     = [];

  while (queue.length > 0) {
    const next = queue.shift();

    const files = fs.readdirSync(next, options);

    for (const file of files) {
      if (file.isFile())
        out.push(fileEntry(file.name, next));
      else if (file.isDirectory())
        queue.push(next + '/' + file.name);
    }
  }
  cb(out);
}

function fileEntry(name, path) {
  return {name, path};
}
