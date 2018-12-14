/* eslint-env mocha */
const expect = require('chai').expect
const boxes = require('./boxes')

describe('--- Day 2: Inventory Management System ---', () => {
  describe('Part 1', () => {
    const ids = `
      abcdef
      bababc
      abbcde
      abcccd
      aabcdd
      abcdee
      ababab`

    describe('getChecksum', () => {
      it('Generates a checksum from a list of IDs', () => {
        const expected = 12
        const actual = boxes.getChecksum(ids)
        expect(actual).to.equal(expected)
      })
    })

    describe('getDataFromList', () => {
      it('Converts the input data into an array', () => {
        const expected = ['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab']
        const actual = boxes.getListFromData(ids)
        expect(actual).to.deep.equal(expected)
      })
    })

    describe('hasNRepatedChars(haystack, N)', () => {
      it('does not count matches if no letters are repeated', () => {
        const test = 'abcdef'
        const actual = boxes.hasNRepeatedChars(test, 2)
        expect(actual).to.equal(false)
      })
      it('counts matches when a letter is repeated N times', () => {
        const test = 'bababc'
        const actual1 = boxes.hasNRepeatedChars(test, 2)
        const actual2 = boxes.hasNRepeatedChars(test, 3)
        expect(actual1).to.equal(true)
        expect(actual2).to.equal(true)
      })
      it('counts matches only when a letter is repeated exactly N times', () => {
        const test = 'abbcde'
        const actual1 = boxes.hasNRepeatedChars(test, 2)
        const actual2 = boxes.hasNRepeatedChars(test, 3)
        expect(actual1).to.equal(true)
        expect(actual2).to.equal(false)
      })
      it('does not count the match if the letter exists more than N times', () => {
        const test = 'abcccd'
        const actual1 = boxes.hasNRepeatedChars(test, 2)
        const actual2 = boxes.hasNRepeatedChars(test, 3)
        expect(actual1).to.equal(false)
        expect(actual2).to.equal(true)
      })
      it('counts matches only once when multiple letters are repeated exactly 2 times', () => {
        const test = 'aabcdd'
        const actual1 = boxes.hasNRepeatedChars(test, 2)
        const actual2 = boxes.hasNRepeatedChars(test, 3)
        expect(actual1).to.equal(true)
        expect(actual2).to.equal(false)
      })
      it('counts matches only when a letter is repeated exactly N times', () => {
        const test = 'abcdee'
        const actual1 = boxes.hasNRepeatedChars(test, 2)
        const actual2 = boxes.hasNRepeatedChars(test, 3)
        expect(actual1).to.equal(true)
        expect(actual2).to.equal(false)
      })
      it('counts matches only once when multiple letters are repeated exactly 3 times', () => {
        const test = 'ababab'
        const actual1 = boxes.hasNRepeatedChars(test, 2)
        const actual2 = boxes.hasNRepeatedChars(test, 3)
        expect(actual1).to.equal(false)
        expect(actual2).to.equal(true)
      })
    })

    describe('scoreIDs(id, id)', () => {
      it('compares 2 input strings and outputs the number of characters that differ', () => {
        const id1 = 'abcde'
        const id2 = 'axcye'
        expect(boxes.scoreIDs(id1, id2)).to.equal(2)
      })
      it('compares 2 input strings and outputs the number of characters that differ', () => {
        const id1 = 'fghij'
        const id2 = 'fguij'
        expect(boxes.scoreIDs(id1, id2)).to.equal(1)
      })
    })
  })
})
