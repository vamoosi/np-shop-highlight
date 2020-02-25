const fs = require('fs');

exports.copyDir = (cb) => {

};

exports.cleanup = (cb) => {
  new Promise(g => fs.rmdir(conf.out.dir.work, {recursive: true}, g))
    .then(_ => fs.mkdir(conf.out.dir.work, {recursive: true}, cb));
};