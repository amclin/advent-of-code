/**
 * Circular linked list of recipes
 */
class Recipes {
  constructor (recipe) {
    this.head = null
    this.tail = null
    this.length = 0
    this.addFirst(recipe)
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
  for (let x = 1; x <= repeat; x++) {
    const score = totalDigitsInArray(elves.map((elf) => elf.value))
    recipes.scoreRecipes(score)
    elves.forEach((elf, idx) => {
      const distance = elf.value + 1
      for (let x = 0; x < distance; x++) {
        elf = elf.next
      }
      elves[idx] = elf
    })

    console.log(recipes.head.value)
  }
}

module.exports = {
  loopRecipesForElves,
  Recipes,
  totalDigitsInArray
}
