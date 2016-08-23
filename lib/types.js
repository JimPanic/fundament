var T, isA, isA_uncurried, typeOf;

isA = function(type, x) {
  if (0 === arguments.length) {
    return isA;
  }
  return function(x) {
    if (1 === arguments.length) {
      return isA_uncurried(type, x);
    }
  };
  return isA_uncurried(type, x);
};

isA_uncurried = function(t, x) {
  if (typeOf(t) !== 'String') {
    console.log('WARNING: Given type must be a string as in: is_a("Object", obj)');
    console.log('Given: ', T.typeOf(t));
    return false;
  }
  if (x == null) {
    return false;
  }
  return T.typeOf(x) === t;
};

typeOf = function(x) {
  return x.constructor.name;
};

T = {
  isObject: isA('Object'),
  isArray: isA('Array'),
  isFunction: isA('Function'),
  isString: isA('String'),
  isRegexp: isA('RegExp'),
  isBool: isA('Boolean'),
  isError: isA('Error'),
  isNumber: isA('Number'),
  isDate: isA('Date'),
  isNull: function(x) {
    return x === null;
  },
  isUndefined: function(x) {
    return x === void 0;
  },
  isNan: function(x) {
    return x === NaN;
  },
  isSomething: function(x) {
    return x !== null && x !== void 0 && x !== NaN;
  },
  typeOf: typeOf,
  isA: isA
};

module.exports = T;
