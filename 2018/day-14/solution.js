const {
  calculateXAfterY,
  Recipes
} = require('./recipes')

const input = 540561

const elves = [3, 7]
const recipes = new Recipes(elves[0])

elves.forEach((elf, idx) => {
  if (idx === 0) {
    elves[0] = recipes.head
  } else {
    elves[idx] = recipes.addRecipe(elf)
  }
})

const answer = calculateXAfterY(10, input, recipes, elves)
const answer2 = ''

console.log(`-- Part 1 --`)
console.log(`Answer: ${answer}`)
console.log(`-- Part 2 --`)
console.log(`Answer: ${answer2}`)
