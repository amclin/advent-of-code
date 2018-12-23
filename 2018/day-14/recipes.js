class Elf {
  constructor (location) {
    this.location = location
  }

  move (distance) {
    for (let x = 0; x < distance; x++) {
      this.location = this.location.next
    }
  }
}

/**
 * Circular linked list of recipes
 * @param {Array} recipes list of initial recipe values
 */
class Recipes {
  constructor (recipes) {
    this.head = null
    this.tail = null
    this.length = 0
    this.elves = []
    this._addFirst(recipes[0])
    for (let x = 1; x < recipes.length; x++) {
      this.addRecipe(recipes[x])
    }
    this.addElf(this.tail)
    this.addElf(this.head)
  }

  /**
   * @private
   */
  _addFirst (recipe) {
    const newRecipe = { value: recipe }
    newRecipe.next = newRecipe
    newRecipe.prev = newRecipe
    this.head = newRecipe
    this.tail = newRecipe
    this.length++
    return this
  }

  /**
   * Adds an elf (location marker) to the linked list for easier iterative tracking
   * @param {*} location Item on the linked list that the elf is positioned at
   */
  addElf (location) {
    this.elves.push(new Elf(location))
  }

  /**
   * Adds a recipe to the linked list
   * @param {Number} recipe value
   */
  addRecipe (recipe) {
    const newRecipe = { value: recipe }
    newRecipe.next = this.tail // link new recipe to tail
    this.tail.prev = newRecipe
    newRecipe.prev = this.head // link new recipe to old head
    this.head.next = newRecipe
    this.head = newRecipe // make new recipe the new head
    this.length++
    return this.head
  }

  /**
   * Scoring the current recipes means adding new recipies base on the score value
   * @param {Number} score of current recipe
   */
  scoreRecipes (score) {
    score.toString().split('').forEach((recipe) => {
      this.addRecipe(parseInt(recipe))
    })
  }
}

/**
 * Takes an array of numbers and totals the digits
 * @param
 */
const totalDigitsInArray = (arr) => {
  return arr.reduce(
    (acc, num) => acc + num.toString().split('')
      .reduce((sub, digit) => sub + parseInt(digit), 0), 0)
}

/**
 * Loops the elves through the recipes list the specified number of times
 * @param {LinkedList} recipes list of recipes
 * @param {Number} repeat count of desired iterations
 */
const loopRecipesForElves = (recipes, repeat) => {
  let result = ''
  for (let x = 1; x <= repeat; x++) {
    const score = totalDigitsInArray(recipes.elves.map((elf) => elf.location.value))
    result += score.toString()
    recipes.scoreRecipes(score)
    recipes.elves.forEach((elf, idx) => {
      const distance = elf.location.value + 1
      elf.move(distance)
    })
  }
  return result
}

/**
 * Determines the next X recipes after the elves have generated Y recipes
 */
const calculateXAfterY = (x, y, recipes) => {
  let iterator = recipes.head
  let counter = recipes.length
  while (counter < y) {
    loopRecipesForElves(recipes, 1)
    counter = recipes.length
  }

  // In case multidigit recipe results created more than Y
  iterator = (recipes.length > y) ? recipes.head.prev : recipes.head

  // Add enough recipes to cover X
  while (recipes.length < x + y) {
    loopRecipesForElves(recipes, x + y - recipes.length)
  }

  let result = ''
  while (result.length < x) {
    iterator = iterator.next
    result += iterator.value.toString()
  }
  return result
}

/**
 * Counts how many recipes are to the left of the specified pattern
 * @param {String} pattern to search for
 * @param {LinkedList} recipes recipe list
 * @param {Number} bufferSize bucket size to search. Tuning bucket size can improve speed by adjusting memory usage.
 */
const findPattern = (pattern, recipes, bufferSize) => {
  bufferSize = bufferSize || 101
  let matched = false
  let position = recipes.length
  let overlapBuffer = ''

  while (matched !== true) {
    console.log(`Checking for ${pattern} in segement starting at ${position}`)
    let haystack = loopRecipesForElves(recipes, bufferSize)

    let offset = haystack.indexOf(pattern)

    position = (offset >= 0) ? position + offset : recipes.length
    if (offset > -1) {
      // console.log(`Found ${pattern} at ${haystack.substr(0, offset + pattern.length)}`)
      matched = true
    }
    // Use another small buffer to check the string that overlaps the split between buffer segements
    overlapBuffer = overlapBuffer.substr(overlapBuffer.length - 1 - pattern.length, pattern.length)
    overlapBuffer += haystack.substr(0, pattern.length)
    if (overlapBuffer.indexOf(pattern) > -1) {
      position = position - pattern.length + overlapBuffer.indexOf(pattern)
      matched = true
    }
  }

  return position
}

module.exports = {
  calculateXAfterY,
  findPattern,
  loopRecipesForElves,
  Recipes,
  totalDigitsInArray
}
