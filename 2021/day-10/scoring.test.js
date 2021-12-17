/* eslint-env mocha */
const { expect } = require('chai')
const { findMiddleScore, scoreAutocomplete } = require('./scoring')

const scoreData = [
  288957,
  5566,
  1480781,
  995444,
  294
]

const autocompleteSuggestions = [
  '}}]])})]',
  ')}>]})',
  '}}>}>))))',
  ']]}}]}]}>',
  '])}>'
]

describe('--- Day 10: Syntax Scoring ---', () => {
  describe('Part 2', () => {
    describe('scoreAutocomplete()', () => {
      it('takes a single autocomplete suggestion and scores it', () => {
        autocompleteSuggestions.forEach((suggestion, idx) => {
          expect(scoreAutocomplete(suggestion)).to.equal(scoreData[idx])
        })
      })
    })
    describe('findMiddleScore()', () => {
      it('takes a list of scores and returns the middle entry after sorting', () => {
        expect(findMiddleScore(scoreData)).to.equal(288957)
      })
    })
  })
})
