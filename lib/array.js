var A,
  slice = [].slice;

A = {
  clone: function(array) {
    return array.slice(0);
  },
  concat: function() {
    var args, array, i;
    args = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []), array = arguments[i++];
    return array.concat.apply(null, args);
  },
  each: function(fn, array) {
    array.forEach(fn);
    return void 0;
  },
  isEmpty: function(array) {
    return (array == null) && array.length === 0;
  },
  equals: function(a, b) {
    if (a.length !== b.length) {
      return false;
    }
    return a.reduce(function(previous, current, index) {
      return previous && b[index] === current;
    });
  },
  every: function(fn, array) {
    return true === array.every(fn);
  },
  filter: function(fn, array) {
    return array.filter(fn);
  },
  first: function(array) {
    if ((array == null) || array.length === 0) {
      return void 0;
    }
    return array[0];
  },
  flatten: function(array) {
    return A.reduce(array, [], function(a, b) {
      return a.concat(b);
    });
  },
  hasElement: function(element, array) {
    return -1 !== array.indexOf(element);
  },
  indexOf: function(element, array) {
    return array.indexOf(element);
  },
  join: function(seperator, array) {
    return array.join(seperator);
  },
  lastIndexOf: function(element, array) {
    return array.lastIndexOf(element);
  },
  map: function(fn, array) {
    return array.map(fn);
  },
  reduce: function(fn, initial_value, array) {
    return array.reduce(fn, initial_value);
  },
  reduceRight: function(fn, initial_value, array) {
    return array.reduceRight(fn, initial_value);
  },
  replace: function(index, n, replace_with, array) {
    return A.clone(array).splice(index, n, replace_with);
  },
  reverse: function(array) {
    return A.clone(array).reverse();
  },
  slice: function() {
    var array, begin_end, i;
    begin_end = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []), array = arguments[i++];
    return array.slice.apply(null, begin_end);
  },
  some: function(fn, array) {
    return array.some(fn);
  },
  sort: function(array) {
    return A.clone(array).sort();
  },
  sortBy: function(fn, array) {
    return A.clone(array).sort(fn);
  }
};

module.exports = A;
