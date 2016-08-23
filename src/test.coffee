A      = require '../src/array'
F      = require '../src/function'
T      = require '../src/types'
colors = require 'colors/safe'


# `fn`            - expression to check, in order to provide more
#                   information in the output, this must be a function.
# ` description`  - string describing the check. If empty, `fn.toString` is
#                   used.
#
# Returns a hash with expression (fn), description and the result.
assert = (fn, description = fn.toString()) ->
  try
    result = true == fn.call()
  catch error

    console.log error
    result = false

  {
    expression:  fn
    description: description
    result:      result
  }

# `input`  - an array of arguments to the function to call
# `output` - the expected return value/array/object
#
# If output is an ordinary array or object, `A.equals` or `O.equals` is used
# to determine the equality.
#
# Otherwise a primitive `==` is used to compare.
expect = (fn, input, expected, description = undefined) ->
  expression = (input, expected) ->
    () ->
      result = fn.apply(null, input)

      if T.isObject(expected) && T.isObject(result)
        return O.equals(expected, result)

      if T.isArray(expected) && T.isArray(result)
        return A.equals(expected, result)

      expected is result

  Test.assert expression(input, expected), description

run = (tests) -> A.map F.apply(Test.expect), tests

defaultPrint = ({expression, description, result}) ->
  symbols = [colors.red('✘'), colors.green('✔︎')]

  maybeSuccess = symbols[if result then 1 else 0]
  console.log "#{maybeSuccess}\t#{description}"

defaultPrintSummary = ({total, success, failure}) ->
  console.log()
  console.log("Summary: #{success}/#{total} tests run successfully")

summarize = (results) ->
  mapping = ({expression, description, result}) -> result
  fn = (seed, result) ->
    seed.success += 1 if result
    seed.failure += 1 if not result
    seed

  seed = {total: results.length, success: 0, failure: 0}

  A.reduce fn, seed, A.map(mapping, results)

print = (result, fn = defaultPrint) ->
  defaultPrint(result)

printSummary = (results, fn = defaultPrintSummary) ->
  defaultPrintSummary summarize results


Test = module.exports = {
  assert       : assert
  expect       : expect
  print        : print
  run          : run
  printSummary : printSummary
}
