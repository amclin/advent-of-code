/* eslint-env mocha */
const expect = require('chai').expect
const {
  calculateXAfterY,
  findPattern,
  loopRecipesForElves,
  Recipes,
  totalDigitsInArray
} = require('./recipes')

describe('--- Day 14: Chocolate Charts ---', () => {
  let recipes
  describe('Part 1:', () => {
    beforeEach(() => {
      recipes = new Recipes([3, 7])
    })
    describe('new Recipes()', () => {
      it('builds a linked list', () => {
        expect(recipes.head.value).to.equal(7)
        for (let x = 1; x <= 5; x++) {
          recipes.addRecipe(x)
        }
        expect(recipes.length).to.equal(7)
        expect(recipes.head.value).to.equal(5)
        expect(recipes.tail.value).to.equal(3)
        expect(recipes.tail.prev).to.equal(recipes.head) // circular linked list for prev
        expect(recipes.head.next).to.equal(recipes.tail) // circular linked list for next
      })
      describe('scoreRecipes()', () => {
        it('adds new recipes based on the provided score', () => {
          for (let x = 1; x <= 5; x++) {
            recipes.addRecipe(x)
          }
          recipes.scoreRecipes(37)
          expect(recipes.head.value).to.equal(7)
          expect(recipes.head.prev.value).to.equal(3)
          expect(recipes.head.prev.prev.value).to.equal(5)
          expect(recipes.head.next).to.equal(recipes.tail)
        })
      })
    })
    describe('totalDigitsInArray()', () => {
      it('calculates the total value of all the digits of all the numbers in the provided array', () => {
        const expected = 34
        const test = [1, 5, 13, 22, 3, 0, 971]
        const actual = totalDigitsInArray(test)
        expect(actual).to.equal(expected)
      })
    })
    describe('loopRecipeForEleves()', () => {
      it('loops through the recipe object for the specified elves the specified number of times', () => {
        const expected = '37101012451589167792' // list of recipe values in the last iteration of the example

        loopRecipesForElves(recipes, 15)
        let actual = recipes.tail.value.toString()
        let iterator = recipes.tail.next
        while (iterator !== recipes.tail) {
          actual += iterator.value.toString()
          iterator = iterator.next
        }

        expect(expected).to.equal(actual)
      })
      it('handles when the score is multidigit', () => {
        const expected = '3710101245158916'

        loopRecipesForElves(recipes, 10)
        // next should be multidigit
        loopRecipesForElves(recipes, 1)
        let actual = recipes.tail.value.toString()
        let iterator = recipes.tail.next
        while (iterator !== recipes.tail) {
          actual += iterator.value.toString()
          iterator = iterator.next
        }
        expect(recipes.length).to.equal(expected.length)
        expect(expected).to.equal(actual)
      })
    })
    describe('calculateXAfterY(x, y, recipe)', () => {
      it('predicts the next X results after the elves have executed Y', () => {
        const actual = calculateXAfterY(10, 9, recipes)
        expect(actual).to.equal('5158916779')
      })
      it('predicts the next X results after the elves have executed Y', () => {
        const actual = calculateXAfterY(10, 5, recipes)
        expect(actual).to.equal('0124515891')
      })
      it('predicts the next X results after the elves have executed Y', () => {
        const actual = calculateXAfterY(10, 18, recipes)
        expect(actual).to.equal('9251071085')
      })
      it('predicts the next X results after the elves have executed Y', () => {
        const actual = calculateXAfterY(10, 2018, recipes)
        expect(actual).to.equal('5941429882')
      })
      it('positions results correctly if X triggers 2 recipes being added', () => {
        const actual = calculateXAfterY(3, 15, recipes)
        expect(actual).to.equal('677')
      })
    })
    describe('findPattern()', () => {
      it('counts the number of recipes to the left of the specified pattern', () => {
        const actual = findPattern('51589', recipes)
        expect(actual).to.equal(9)
      })
      it('counts the number of recipes to the left of the specified pattern', () => {
        const actual = findPattern('01245', recipes)
        expect(actual).to.equal(5)
      })
      it('counts the number of recipes to the left of the specified pattern', () => {
        const actual = findPattern('92510', recipes)
        expect(actual).to.equal(18)
      })
      it('counts the number of recipes to the left of the specified pattern', () => {
        const actual = findPattern('59414', recipes)
        expect(actual).to.equal(2018)
      })
      it('accepts small search buffer sizes', () => {
        const actual = findPattern('59414', recipes, 20)
        expect(actual).to.equal(2018)
      })
      it('accepts large search buffer sizes', () => {
        const actual = findPattern('59414', recipes, 50000)
        expect(actual).to.equal(2018)
      })
    })
  })
})
