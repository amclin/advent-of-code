/* eslint-env mocha */
const { expect } = require('chai')
const { splitRecord, splitRule, isValidPassword, isValidRecord } = require('./cleanupPasswords')

const testData = [
  '1-3 a: abcde',
  '1-3 b: cdefg',
  '2-9 c: ccccccccc'
]

describe('--- Day 2: Password Philosophy ---', () => {
  describe('Part 1', () => {
    describe('splitRecord()', () => {
      it('splits a password record into components parts', () => {
        testData.forEach((row, idx) => {
          const { rule, password } = splitRecord(row)
          expect(`${rule}: ${password}`).to.equal(testData[idx])
        })
      })
    })
    describe('splitRule()', () => {
      it('splits a password formatting rule into component parts', () => {
        testData.forEach((row, idx) => {
          const { rule, password } = splitRecord(row)
          const { min, max, char } = splitRule(rule)
          expect(`${min}-${max} ${char}: ${password}`).to.equal(testData[idx])
        })
      })
    })
    describe('isValidPassword()', () => {
      it('checks if a specified password matches the specified rule', () => {
        const expectedResults = [true, false, true]
        testData.forEach((row, idx) => {
          const { rule, password } = splitRecord(row)
          const { min, max, char } = splitRule(rule)
          expect(isValidPassword({ min, max, char }, password))
            .to.equal(expectedResults[idx])
        })
      })
      it('won\'t allow more than the specified character count', () => {
        const badPass = 'abcabcabcabc'
        expect(isValidPassword({ min: 2, max: 3, char: 'a' }, badPass))
          .to.equal(false)
      })
    })
    describe('isValidRecord()', () => {
      it('checks if a specified record contains valid rule and password', () => {
        const expectedResults = [true, false, true]
        testData.forEach((row, idx) => {
          expect(isValidRecord(row))
            .to.equal(expectedResults[idx])
        })
      })
    })
  })
})
