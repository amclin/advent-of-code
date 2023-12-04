/* eslint-env mocha */
const { expect } = require('chai')
const { checksumSet, checksumUnSanitizedSet, checksumLine, sanitizeLine } = require('./checksum')
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { inputToArray } = require('../../2018/inputParser')

describe('--- Day 1: Trebuchet?! ---', () => {
  describe('Part 1', () => {
    describe('checksum', () => {
      it('calculates the checksum for a string by concatentating the first and last number', () => {
        // provided
        expect(checksumLine('1abc2')).to.equal(12)
        expect(checksumLine('pqr3stu8vwx')).to.equal(38)
        expect(checksumLine('a1b2c3d4e5f')).to.equal(15)
      })
      it('handles the edge case of a line with only a single digit', () => {
        // provided
        expect(checksumLine('treb7uchet')).to.equal(77)
      })
    })
    describe('checksumSet', () => {
      it('calculates the checksum for a set of lines by summing the checksum of each line', () => {
        // provided
        const set = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet']
        expect(checksumSet(set)).to.equal(142)
      })
    })
  })
  describe('Part 2', () => {
    describe('sanitizeLine', () => {
      const set = [
        'two1nine',
        'eightwothree',
        'abcone2threexyz',
        'xtwone3four',
        '4nineeightseven2',
        'zoneight234',
        '7pqrstsixteen'
      ]
      const result = [29, 83, 13, 24, 42, 14, 76]
      it('cleans up a string when digits are spelled out', () => {
        for (let x = 0; x < set.length; x++) {
          expect(checksumLine(sanitizeLine(set[x]))).to.equal(result[x])
        }
      })
      it('handles first matches, and doesn\'t allow for multiple words to share letters', () => {
        expect(sanitizeLine('eightwothree')).to.equal('8wo3')
      })
    })
    describe('checksumUnSanitizedSet', () => {
      it('calculates the checksum for a set of lines by summing the checksum of each sanitized line', () => {
        const set = [
          'two1nine',
          'eightwothree',
          'abcone2threexyz',
          'xtwone3four',
          '4nineeightseven2',
          'zoneight234',
          '7pqrstsixteen'
        ]
        expect(checksumUnSanitizedSet(set)).to.equal(281)
      })
    })
    describe('integeration', () => {
      it('53853 is too low for part 2', (done) => {
        let data
        fs.readFile(filePath, { encoding: 'utf8' }, (err, initData) => {
          if (err) throw err
          initData = inputToArray(initData.trim())
          // Deep copy to ensure we aren't mutating the original data
          data = JSON.parse(JSON.stringify(initData))
          expect(checksumUnSanitizedSet(data)).to.be.greaterThan(53853)
          done()
        })
      })
    })
  })
})
