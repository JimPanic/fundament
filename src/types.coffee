isA = (type, x) ->
  return isA if 0 is arguments.length
  return (x) -> isA_uncurried(type, x) if 1 is arguments.length

  isA_uncurried type, x

isA_uncurried = (t, x) ->
  unless typeOf(t) is 'String'
    console.log 'WARNING: Given type must be a string as in: is_a("Object", obj)'
    console.log 'Given: ', T.typeOf(t)

    return false

  return false unless x?

  T.typeOf(x) is t

typeOf = (x) -> x.constructor.name

T = {
  # Utility functions is_* for builtin instantiable types.
  isObject    : isA 'Object'
  isArray     : isA 'Array'
  isFunction  : isA 'Function'
  isString    : isA 'String'
  isRegexp    : isA 'RegExp'
  isBool      : isA 'Boolean'
  isError     : isA 'Error'
  isNumber    : isA 'Number'
  isDate      : isA 'Date'
  isNull      : (x) -> x is null
  isUndefined : (x) -> x is undefined
  isNan       : (x) -> x is NaN
  isSomething : (x) -> x isnt null and x isnt undefined and x isnt NaN
  typeOf      : typeOf
  isA         : isA
}

module.exports = T
