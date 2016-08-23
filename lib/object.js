var A, O, T, keys,
  slice = [].slice;

A = require('./array');

T = require('./types');

keys = Object.keys;

O = {
  assign: function() {
    var sources, target;
    target = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (Object.assign != null) {
      return Object.assign.apply(Object, [target].concat(slice.call(sources)));
    }
    return O._assignPolyfill.apply(O, [target].concat(slice.call(sources)));
  },
  _assignPolyfill: function() {
    var reduceSource, reduceSources, sources, target;
    target = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    reduceSource = function(source) {
      return function(seed, key) {
        seed[key] = source[key];
        return seed;
      };
    };
    reduceSources = function(seed, current) {
      return A.reduce(reduceSource(current), seed, keys(current));
    };
    return A.reduce(reduceSources, Object(target), A.filter(T.isSomething, Array.apply(null, sources)));
  },
  _assign: function() {
    var polyfill, sources, target;
    polyfill = arguments[0], target = arguments[1], sources = 3 <= arguments.length ? slice.call(arguments, 2) : [];
    if ((Object.assign != null) && !polyfill) {
      return Object.assign.apply(Object, [target].concat(slice.call(sources)));
    }
    return O.assignPolyfill.apply(O, [target].concat(slice.call(sources)));
  },
  each: function(fn, object) {
    var eachFn;
    eachFn = function(element, index, array) {
      return fn.apply(object, [object[element], element, object]);
    };
    A.each(wrapped(object), Object.keys(object));
    return void 0;
  },
  equals: function(a, b) {
    var fn, keysA, keysB;
    if (!(T.isObject(a) && T.isObject(b))) {
      return false;
    }
    keysA = keys(a);
    keysB = keys(b);
    if (keysA.length !== keysB.length) {
      return false;
    }
    if (!A.equals(keysA, keysB)) {
      return false;
    }
    fn = function(previous, value, key, obj) {
      if (T.typeOf(value) !== T.typeOf(b[key])) {
        return false;
      }
      if (T.isArray(value)) {
        return previous && A.equals(value, b[key]);
      }
      if (T.isObject(value)) {
        return previous;
      }
      return previous && b[key] === value;
    };
    return O.reduce(fn, true, a);
  },
  every: function(fn, object) {
    var everyFn;
    everyFn = function(value, index, array) {
      return fn(object[value], value, object);
    };
    return A.every(everyFn, O.keys(object));
  },
  filter: function(fn, object) {
    var wrapped;
    wrapped = function(object) {
      return function(new_object, key) {
        new_object[key] = object[key];
        return new_object;
      };
    };
    return A.reduce(wrapped(object), {}, A.filter(fn, Object.keys(object)));
  },
  hasKey: function(key, object) {
    return A.hasElement(key, Object.keys(object));
  },
  hasValue: function(value, object) {
    var wrapped;
    wrapped = function(value) {
      return function(v) {
        return v === value;
      };
    };
    return O.some(wrapped(value), object);
  },
  map: function(fn, object) {
    var reduceFn;
    reduceFn = function(seed, element, index, array) {
      var key, ref, result, value;
      result = fn(element, index, array);
      ref = [result[0] || index, result[1] || result], key = ref[0], value = ref[1];
      seed[key] = value;
      return seed;
    };
    return O.reduce(wrapped(results, fn), {}, object);
  },
  reduce: function(fn, initialValue, object) {
    var reduceFn;
    reduceFn = function(previous, key, index, keys) {
      return fn(previous, key, object[key], object);
    };
    return A.reduce(reduceFn, initialValue, Object.keys(object));
  },
  some: function(fn, object) {
    var someFn;
    someFn = function(value, index, array) {
      return fn(object[value], value, object);
    };
    return A.some(someFn, Object.keys(object));
  }
};

module.exports = O;
