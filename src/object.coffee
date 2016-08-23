A = require './array'
T = require './types'

keys = Object.keys

O = {
  assign: (target, sources...) ->
    return Object.assign target, sources... if Object.assign?

    O._assignPolyfill target, sources...

  # Polyfill for Object.assign
  _assignPolyfill: (target, sources...) ->
    throw new TypeError 'Cannot convert undefined or null to object' unless target?

    reduceSource = (source) ->
      (seed, key) ->
        seed[key] = source[key]
        seed

    reduceSources = (seed, current) -> A.reduce reduceSource(current), seed, keys(current)

    A.reduce reduceSources, Object(target), A.filter(T.isSomething, Array(sources...))

  # This method is only used for testing the validity of the polyfill.
  _assign: (polyfill, target, sources...) ->
    return Object.assign(target, sources...) if Object.assign? and not polyfill

    O.assignPolyfill target, sources...

  # Iterate over all key-value pairs one by one.
  #
  # The callback parameters are analogue to Array.forEach callback parameters:
  #  * value
  #  * key (index)
  #  * object
  #
  # `each` always returns undefined.
  #
  # NOTE: There is no way to stop/break an iteration done with `each`. Use
  #       `Array.some` or `Array.every` if that is needed.
  each: (fn, object) ->
    eachFn = (element, index, array) ->
      fn.apply(object, [object[element], element, object])

    A.each(wrapped(object), Object.keys(object))

    undefined

  # Compare (simple, one-level) equality of two objects.
  #
  # NOTE: This only compares keys & values on the first level.
  #       - Arrays are compared with `A.equals`,
  #       - Object values are not compared at all, it is just ensured that both
  #         values are objects.
  #
  #       The above seems like a reasonable choice in theory. If practice shows
  #       otherwise, we need to adapt to provide more (or even less)
  #       sophisticated equality checks.
  equals: (a, b) ->
    return false unless T.isObject(a) && T.isObject(b)

    keysA = keys(a)
    keysB = keys(b)

    return false if keysA.length != keysB.length
    return false unless A.equals(keysA, keysB)

    fn = (previous, value, key, obj) ->
      return false unless T.typeOf(value) == T.typeOf(b[key])

      return previous && A.equals(value, b[key]) if T.isArray(value)
      return previous if T.isObject(value)

      return previous && b[key] == value

    O.reduce(fn, true, a)

  # Test whether all elements pass given function.
  every: (fn, object) ->
    everyFn = (value, index, array) -> fn(object[value], value, object)

    A.every everyFn, O.keys(object)

  # Filter the contents of an object by its keys and return a new object with
  # all the keys matching the filter.
  filter: (fn, object) ->
    wrapped = (object) ->
      (new_object, key) ->
        new_object[key] = object[key]
        new_object

    A.reduce wrapped(object), {}, A.filter(fn, Object.keys(object))

  # Check whether given object's keys include the passed key.
  hasKey: (key, object) ->
    A.hasElement(key, Object.keys(object))

  # Check whether given object holds the passed value.
  hasValue: (value, object) ->
    wrapped = (value) -> (v) -> v == value

    O.some wrapped(value), object

  # Iterate over all key-value pairs one by one, store the result in a new
  # object and return it.
  #
  # The callback parameters are analogue to Array.forEach callback parameters:
  #  * value
  #  * key (index)
  #  * object
  #
  # NOTE: There is no way to stop/break an iteration done with `map`. Use
  #       `Array.some` or `Array.every` if that is needed.
  map: (fn, object) ->
    reduceFn = (seed, element, index, array) ->
        result       = fn(element, index, array)
        [key, value] = [result[0] || index, result[1] || result]
        seed[key]    = value

        seed

    O.reduce(wrapped(results, fn), {}, object)

  # Reduce given object by iterating over its keys and values. Uses
  # `Array.reduce` but replaces the index parameter of the callback to pass the
  # key.
  #
  # Takes a function, an initial value and the object to iterate over.
  #
  # Function parameters:
  #
  # * seed (previous value)
  # * current value (`object[key]`)
  # * current key
  # * original object
  #
  # The return value of each invocation of given function will be passed as seed
  # to the next invocation.
  #
  # Returns the result of the last function invocation.
  reduce: (fn, initialValue, object) ->
    reduceFn = (previous, key, index, keys) ->
        # Invoke given callback with:
        #
        #  * previous value
        #  * value for current key
        #  * current key as index
        #  * the original object
        fn(previous, key, object[key], object)

    A.reduce(reduceFn, initialValue, Object.keys(object))

  # TODO: DOCS
  some: (fn, object) ->
    someFn = (value, index, array) -> fn(object[value], value, object)

    A.some someFn, Object.keys(object)
}

module.exports = O
