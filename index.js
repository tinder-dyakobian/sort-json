var fs = require('fs');

function visit(old, options) {
    // overwrite file if first arg is array of paths
    if (Array.isArray(old)) {
        return old.map(function(p) {
          var newJson = JSON.stringify(visit(require(p), options), null, 2);
          // append new line at EOF
          var data = newJson[newJson.length - 1] === '\n' ? newJson : newJson + '\n';
          fs.writeFile(p, data, 'utf8');
          return newJson;
        });
    }

    options = options || {};
    var ignoreCase = options.ignoreCase;
    var reverse = options.reverse;

    if (typeof(old) !== 'object' || old === null) {
        return old;
    }
    var copy = Array.isArray(old) ? [] : {};
    var keys = ignoreCase ?
      Object.keys(old).sort(function (a, b) {
          return a.toLowerCase().localeCompare(b.toLowerCase());
      }) :
      Object.keys(old).sort();

    if (reverse) {
        keys = keys.reverse();
    }

    keys.forEach(function(key) {
        copy[key] = visit(old[key], options);
    });

    return copy;
}

module.exports = visit;
