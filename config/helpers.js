/**
 * Created by Daniel on 21.02.2017.
 */
var path = require('path');

// Helper functions
var ROOT = path.resolve(__dirname, '..');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

exports.root = root;
