/* eslint-env mocha */
const { expect } = require('chai')
const { findElfWithMost, parseCalorieData, sortElvesByCalories } = require('./calories')

const calorieData = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`
const parsedCalorieData = [
  [1000, 2000, 3000],
  [4000],
  [5000, 6000],
  [7000, 8000, 9000],
  [10000]
]

describe('--- Day 1: Calorie Counting ---', () => {
  describe('Part 1', () => {
    describe('parseCalorieData', () => {
      it('Splits data into a list of elves with provisions', () => {
        expect(parseCalorieData(calorieData))
          .to.deep.equal(parsedCalorieData)
      })
    })
    describe('findElfWithMost()', () => {
      it('Identifies the elf with the most total calories', () => {
        expect(findElfWithMost(parsedCalorieData)
          .reduce((a, b) => a + b))
          .to.equal(24000)
      })
    })
    describe('sortElvesByCalories()', () => {
      it('Sorts the list of elves by calories carried, maximum first', () => {
        expect(sortElvesByCalories(parsedCalorieData))
          .to.deep.equal([
            [7000, 8000, 9000],
            [5000, 6000],
            [10000],
            [1000, 2000, 3000],
            [4000]
          ])
      })
    })
  })
})
