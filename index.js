function visit(old, options) {
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
