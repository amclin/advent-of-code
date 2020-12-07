/* eslint-env mocha */
const { expect } = require('chai')
const { positionHasTree, countTreesOnRoute } = require('./airportRoute')
const testData = [
  '..##.......',
  '#...#...#..',
  '.#....#..#.',
  '..#.#...#.#',
  '.#...##..#.',
  '..#.##.....',
  '.#.#.#....#',
  '.#........#',
  '#.##...#...',
  '#...##....#',
  '.#..#...#.#'
]

describe('--- Day 3: Toboggan Trajectory ---', () => {
  describe('Part 1', () => {
    describe('positionHasTree()', () => {
      it('can find a tree', () => {
        expect(positionHasTree({ map: { rows: testData }, position: [4, 5] })).to.equal(true)
        expect(positionHasTree({ map: { rows: testData }, position: [8, 9] })).to.equal(false)
      })
      it('can handle the horizontal terrain repeat', () => {
        expect(positionHasTree({ map: { rows: testData }, position: [25, 5] })).to.equal(false)
      })
    })
    describe('countTreesOnRoute()', () => {
      it('tallies the number of trees on the route', () => {
        expect(
          countTreesOnRoute({
            map: { rows: testData }
          })
        ).to.equal(7)
      })
    })
  })
})
