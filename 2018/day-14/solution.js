const {
  calculateXAfterY,
  findPattern,
  loopRecipesForElves,
  Recipes
} = require('./recipes')

const input = 540561

let recipes = new Recipes([3, 7])

const answer = calculateXAfterY(10, input, recipes)

console.log(`-- Part 1 --`)
console.log(`Answer: ${answer}`)

recipes = new Recipes([3, 7])
while (recipes.length < 3000) {
  loopRecipesForElves(recipes, 1)
}

recipes = new Recipes([3, 7])
const bufferSize = 10000
const answer2 = findPattern(input.toString(), recipes, bufferSize)
console.log(`-- Part 2 --`)
console.log(`Answer: ${answer2}`)
