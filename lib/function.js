var A, F,
  slice = [].slice;

A = require('./array');

F = {
  id: function(arg) {
    return arg;
  },
  apply: function(fn) {
    return function(args) {
      return fn.apply(this, args);
    };
  },
  compose: function() {
    var fns;
    fns = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return function() {
      var args, fn, i, len;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = fns.length; i < len; i++) {
        fn = fns[i];
        args = [fn.apply(this, args)];
      }
      return args[0];
    };
  },
  sequence: function() {
    var fns;
    fns = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return F.compose(A.reverse(fns));
  },
  partial: function() {
    var bound, fn;
    fn = arguments[0], bound = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return fn.apply(this, A.concat(bound, args));
    };
  },
  partialRight: function() {
    var bound, fn;
    fn = arguments[0], bound = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return fn.apply(this, A.concat(args, bound));
    };
  },
  partialReverse: function() {
    var bound, fn;
    fn = arguments[0], bound = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return fn.apply(this, A.concat(args, A.reverse(bound)));
    };
  }
};

module.exports = F;
