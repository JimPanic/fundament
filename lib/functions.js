// Generated by CoffeeScript 1.7.1
(function() {
  var A, F,
    __slice = [].slice;

  A = require('./array');

  F = {
    id: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return args;
    },
    args_from_array: function(fn) {
      return function(args) {
        return fn.apply(null, args);
      };
    },
    compose: function() {
      var fns;
      fns = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return function() {
        var args, fn, _i, _len;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        for (_i = 0, _len = fns.length; _i < _len; _i++) {
          fn = fns[_i];
          args = [fn.apply(this, args)];
        }
        return args[0];
      };
    },
    sequence: function() {
      var fns;
      fns = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return F.compose(A.reverse(fns));
    },
    partial: function() {
      var bound, fn;
      fn = arguments[0], bound = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return fn.apply(this, A.concat(bound, args));
      };
    },
    partial_right: function() {
      var bound, fn;
      fn = arguments[0], bound = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return fn.apply(this, A.concat(args, bound));
      };
    },
    partial_reverse: function() {
      var bound, fn;
      fn = arguments[0], bound = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return fn.apply(this, A.concat(args, A.reverse(bound)));
      };
    }
  };

  module.exports = F;

}).call(this);