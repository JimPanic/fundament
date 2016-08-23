var A, F, T, Test, assert, colors, defaultPrint, defaultPrintSummary, expect, print, printSummary, run, summarize;

A = require('../src/array');

F = require('../src/function');

T = require('../src/types');

colors = require('colors/safe');

assert = function(fn, description) {
  var error, error1, result;
  if (description == null) {
    description = fn.toString();
  }
  try {
    result = true === fn.call();
  } catch (error1) {
    error = error1;
    console.log(error);
    result = false;
  }
  return {
    expression: fn,
    description: description,
    result: result
  };
};

expect = function(fn, input, expected, description) {
  var expression;
  if (description == null) {
    description = void 0;
  }
  expression = function(input, expected) {
    return function() {
      var result;
      result = fn.apply(null, input);
      if (T.isObject(expected) && T.isObject(result)) {
        return O.equals(expected, result);
      }
      if (T.isArray(expected) && T.isArray(result)) {
        return A.equals(expected, result);
      }
      return expected === result;
    };
  };
  return Test.assert(expression(input, expected), description);
};

run = function(tests) {
  return A.map(F.apply(Test.expect), tests);
};

defaultPrint = function(arg) {
  var description, expression, maybeSuccess, result, symbols;
  expression = arg.expression, description = arg.description, result = arg.result;
  symbols = [colors.red('✘'), colors.green('✔︎')];
  maybeSuccess = symbols[result ? 1 : 0];
  return console.log(maybeSuccess + "\t" + description);
};

defaultPrintSummary = function(arg) {
  var failure, success, total;
  total = arg.total, success = arg.success, failure = arg.failure;
  console.log();
  return console.log("Summary: " + success + "/" + total + " tests run successfully");
};

summarize = function(results) {
  var fn, mapping, seed;
  mapping = function(arg) {
    var description, expression, result;
    expression = arg.expression, description = arg.description, result = arg.result;
    return result;
  };
  fn = function(seed, result) {
    if (result) {
      seed.success += 1;
    }
    if (!result) {
      seed.failure += 1;
    }
    return seed;
  };
  seed = {
    total: results.length,
    success: 0,
    failure: 0
  };
  return A.reduce(fn, seed, A.map(mapping, results));
};

print = function(result, fn) {
  if (fn == null) {
    fn = defaultPrint;
  }
  return defaultPrint(result);
};

printSummary = function(results, fn) {
  if (fn == null) {
    fn = defaultPrintSummary;
  }
  return defaultPrintSummary(summarize(results));
};

Test = module.exports = {
  assert: assert,
  expect: expect,
  print: print,
  run: run,
  printSummary: printSummary
};
