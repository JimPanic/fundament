A = require '../src/array'
F = require '../src/functions'
T = require '../src/types'

Test = {
  # `fn`            - expression to check, in order to provide more
  #                   information in the output, this must be a function.
  # ` description`  - string describing the check. If empty, `fn.toString` is
  #                   used.
  #
  # Returns a hash with expression (fn), description and the result.
  assert: (fn, description = fn.toString()) ->
    try
      result = true == fn.call()
    catch error
      result = error

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
  expect: (fn, input, expected, description = undefined) ->
    expression = (input, expected) ->
      () ->
        result = fn.apply(null, input)

        if T.is_object(expected) && T.is_object(result)
          return O.equals(expected, result)

        if T.is_array(expected) && T.is_array(result)
          return A.equals(expected, result)

        expected == result

    Test.assert expression(input, expected), description

  run: (tests) -> A.map F.args_from_array(Test.expect), tests
}

module.exports = Test