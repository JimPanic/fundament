A = {
  # Create a clone of given array and return it.
  clone: (array) -> array.slice(0)

  # Concatinate multiple values and arrays. The last argument must be an array
  # and is considered the base to concatinate to.
  #
  # NOTE: This is a composable wrapper for `Array.prototype.concat`
  concat: (args..., array) -> array.concat.apply(null, args)

  # Iterate over all elements of given array.
  #
  # The callback parameters are the same as for `Array.prototype.forEach`:
  #  * value
  #  * index
  #  * array
  #
  # NOTE: This is just a composable wrapper for `Array.prototype.forEach`.
  each: (fn, array) ->
    array.forEach(fn)

    return undefined

  # Compares length & value equality of two arrays.
  #
  # NOTE: This method also takes the order into account.
  equals: (a, b) ->
    return false if a.length isnt b.length

    a.reduce (previous, current, index) ->
       previous and b[index] == current

  # Composable wrapper for `Array.prototype.every`
  #
  # NOTE: Instead of "falsy" or true, it always returns an actual Boolean value.
  every: (fn, array) -> true == array.every(fn)

  # Shorthand and composable wrapper for `Array.prototype.filter`
  filter: (fn, array) -> array.filter fn

  first: (array) ->
    return undefined if !array? or array.length is 0

    array[0]

  # Transform nested arrays into one flat, continuous array
  flatten: (array) -> A.reduce array, [], (a, b) -> a.concat(b)

  # Find out whether the array holds a given value.
  hasElement: (element, array) -> -1 != array.indexOf(element)

  # Composable wrapper for `Array.prototype.indexOf`
  indexOf: (element, array) -> array.indexOf(element)

  isEmpty: (array) -> !array? and array.length == 0

  # Composable wrapper for `Array.prototype.join`
  join: (seperator, array) -> array.join(seperator)

  # Composable wrapper for `Array.prototype.lastIndexOf`
  lastIndexOf: (element, array) -> array.lastIndexOf(element)

  # Composable wrapper for `Array.prototype.map`
  map: (fn, array) -> array.map(fn)

  # Composable wrapper for `Array.prototype.reduce`
  reduce: (fn, initial_value, array) -> array.reduce(fn, initial_value)

  # Composable wrapper for `Array.reduceRight`
  reduceRight: (fn, initial_value, array) -> array.reduceRight(fn, initial_value)

  # Create a copy and replace `n` elements with given `replace_with` array
  # at a given `index`.
  #
  # NOTE: This is a composable wrapper for `Array.splice`, which replaces items
  #       in-place. The names deliberately differ.
  replace: (index, n, replace_with, array) ->
    A.clone(array).splice(index, n, replace_with)

  # Create a reversed version of the array and return it.
  #
  # NOTE: This is just a wrapper for `Array.reverse`, which reverses the array
  #       in-place.
  reverse: (array) -> A.clone(array).reverse()

  # Composable wrapper for `Array.slice`
  slice: (begin_end..., array) -> array.slice.apply(null, begin_end)

  # Composable wrapper for `Array.some`
  some: (fn, array) -> array.some(fn)

  # Create a sorted copy of given array.
  #
  # NOTE: This is a composable wrapper for `Array.sort`, which sorts the array
  #       in-place.
  sort: (array) -> A.clone(array).sort()

  # Create a copy and sort given array by given sort function.
  #
  # NOTE: This is a composable wrapper for `Array.sort`, which sorts the array
  #       in-place.
  sortBy: (fn, array) -> A.clone(array).sort(fn)
}

module.exports = A
