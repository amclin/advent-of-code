/**
 * Circular linked list of recipes
 */
class Recipes {
  constructor (recipes) {
    this.head = null
    this.tail = null
    this.length = 0
    this.addFirst(recipes[0])
    for (let x = 1; x < recipes.length; x++) {
      this.addRecipe(recipes[x])
    }
  }

  addFirst (recipe) {
    const newRecipe = { value: recipe }
    newRecipe.next = newRecipe
    newRecipe.prev = newRecipe
    this.head = newRecipe
    this.tail = newRecipe
    this.length++
    return this
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
 * @param {Array} elves list of elves
 * @param {LinkedList} recipes list of recipes
 * @param {Numbe} repeat count of desired iterations
 */
const loopRecipesForElves = (elves, recipes, repeat) => {
  let result = ''
  for (let x = 1; x <= repeat; x++) {
    const score = totalDigitsInArray(elves.map((elf) => elf.value))
    result += score.toString()
    recipes.scoreRecipes(score)
    elves.forEach((elf, idx) => {
      const distance = elf.value + 1
      for (let x = 0; x < distance; x++) {
        elf = elf.next
      }
      elves[idx] = elf
    })
  }
  return result
}

/**
 * Determines the next X recipes after the elves have generated Y recipes
 */
const calculateXAfterY = (x, y, recipes, elves) => {
  let iterator = recipes.head
  while (recipes.length <= y) {
    loopRecipesForElves(elves, recipes, 1)
  }

  if (recipes.length === y + 1) {
    iterator = recipes.head
  } else {
    // In case multidigit recipe results created more than Y
    iterator = recipes.head.prev
  }

  while (recipes.length < x + y) {
    loopRecipesForElves(elves, recipes, 1)
  }

  let result = ''
  while (result.length < x) {
    result += iterator.value.toString()
    iterator = iterator.next
  }
  return result
}

/**
 * Counts how many recipes are to the left of the specified pattern
 * @param {String} pattern to search for
 * @param {LinkedList} recipes recipe list
 * @param {Array} elves doing the work
 * @param {Number} bufferSize bucket size to search. Tuning bucket size can improve speed but may risk missing match if the match crosses buckets.
 */
const findPattern = (pattern, recipes, elves, bufferSize) => {
  bufferSize = bufferSize || 101
  let matched = false
  let position = recipes.length
  while (matched !== true) {
    let haystack = loopRecipesForElves(elves, recipes, bufferSize)
    let offset = haystack.indexOf(pattern)
    if (offset > -1) {
      position += offset
      console.log(`Found ${pattern} at ${haystack.substr(0, offset + pattern.length)}`)
      matched = true
    } else {
      position += bufferSize
      console.log(`Did not find ${pattern} before ${position}`)
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
