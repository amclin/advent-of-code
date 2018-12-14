/* eslint-env mocha */
const expect = require('chai').expect
const { inputToArray } = require('./inputParser')

describe('inputParser', () => {
  describe('inputToArray()', () => {
    it('converts the contents of an input file to an array of strings, breaking on new lines', () => {
      const input = `
        abcdef
        bababc
        abbcde
        abcccd
        aabcdd
        abcdee
        ababab`
      const expected = [
        'abcdef',
        'bababc',
        'abbcde',
        'abcccd',
        'aabcdd',
        'abcdee',
        'ababab'
      ]
      const actual = inputToArray(input)
      expect(actual).to.deep.equal(expected)
    })
  })
})
