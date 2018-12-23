const {
  calculateXAfterY,
  findPattern,
  Recipes
} = require('./recipes')

const input = 540561

let elves = [3, 7]
let recipes = new Recipes(elves[0])

elves.forEach((elf, idx) => {
  if (idx === 0) {
    elves[0] = recipes.head
  } else {
    elves[idx] = recipes.addRecipe(elf)
  }
})

const answer = calculateXAfterY(10, input, recipes, elves)

console.log(`-- Part 1 --`)
console.log(`Answer: ${answer}`)

elves = [3, 7]
recipes = new Recipes(elves[0])
elves.forEach((elf, idx) => {
  if (idx === 0) {
    elves[0] = recipes.head
  } else {
    elves[idx] = recipes.addRecipe(elf)
  }
})
const bufferSize = 10001
const answer2 = findPattern(input.toString(), recipes, elves, bufferSize)
console.log(`-- Part 2 --`)
console.log(`Answer: ${answer2}`)
