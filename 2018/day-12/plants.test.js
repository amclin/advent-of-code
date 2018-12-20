/* eslint-env mocha */
const expect = require('chai').expect
const {
  Plants
} = require('./plants')

const initialState = '#..#.#..##......###...###'

describe('--- Day 12: Subterranean Sustainability ---', () => {
  describe('Plants:', () => {
    describe('new Plants()', () => {
      it('creates a Plants object with the initial state', () => {
        const expected = [
          { position: 0, state: '#' },
          { position: 1, state: '.' },
          { position: 2, state: '.' },
          { position: 3, state: '#' },
          { position: 4, state: '.' },
          { position: 5, state: '#' },
          { position: 6, state: '.' },
          { position: 7, state: '.' },
          { position: 8, state: '#' },
          { position: 9, state: '#' },
          { position: 10, state: '.' },
          { position: 11, state: '.' },
          { position: 12, state: '.' },
          { position: 13, state: '.' },
          { position: 14, state: '.' },
          { position: 15, state: '.' },
          { position: 16, state: '#' },
          { position: 17, state: '#' },
          { position: 18, state: '#' },
          { position: 19, state: '.' },
          { position: 20, state: '.' },
          { position: 21, state: '.' },
          { position: 22, state: '#' },
          { position: 23, state: '#' },
          { position: 24, state: '#' }
        ]
        let plantTracker = new Plants(initialState)
        const actual = plantTracker.generations[0]
        expect(actual).to.deep.equal(expected)
      })
    })
  })
})
