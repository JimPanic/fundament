{each}    = require '../src/array'
O    = require '../src/object'
Test = require '../src/test'

# Some test data
a = {a:1, b:2}
b = {c:1, d:2}

# The list of tests (arguments to expect)
tests = module.exports = [
  [ O.equals,    [a, a],   true,  'O.equals(a, a)\t\t== true\t\t']
  [ O.equals,    [a, b],   false, 'O.equals(a, b)\t\t== false\t']
  [ O.hasValue, [1, a],   true,  'O.hasValue(1, a)\t== true\t\t']
  [ O.hasValue, [3, a],   false, 'O.hasValue(3, a)\t== false\t']
  [ O.hasKey,   ['a', a], true,  "O.hasKey('a', a)\t== true\t\t"]
  [ O.hasKey,   ['c', a], false, "O.hasKey('c', a)\t== false\t"]
]

module.exports = tests

results = Test.run(tests)

each Test.print, results

Test.printSummary results
