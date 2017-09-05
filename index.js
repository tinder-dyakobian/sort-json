module.exports = visit;

function visit(old, ignoreCase) {
    if (typeof(old) !== 'object' || old === null) {
        return old;
    }
    var copy = Array.isArray(old) ? [] : {};
    var keys = ignoreCase ?
      Object.keys(old).sort(function (a, b) { a.toLowerCase().localeCompare(b.toLowerCase()) }) :
      Object.keys(old).sort();

    keys.forEach(function(key) {
        copy[key] = visit(old[key]);
    });
    return copy;
}
module.exports = visit;
