/* eslint-env mocha */
const { expect } = require('chai')
const { checksumSet, checksumLine, sanitizeLine, lazyChecksumLine } = require('./checksum')
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
      const data = [
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
        const set = JSON.parse(JSON.stringify(data))
        for (let x = 0; x < set.length; x++) {
          expect(checksumLine(sanitizeLine(set[x]))).to.equal(result[x])
          // expect(checksumLine(sanitizeLine(set[x], 'sanitizeByRegex'))).to.equal(result[x])
          // expect(checksumLine(sanitizeLine(set[x], 'sanitizeFirstLast'))).to.equal(result[x])
        }
      })
      it('allows for skipping sanitation', () => {
        const set = JSON.parse(JSON.stringify(data))
        for (let x = 0; x < set.length; x++) {
          expect(sanitizeLine(set[x], 'none')).to.equal(data[x])
        }
      })
    })
    describe('checksumSet', () => {
      const data = [
        'two1nine',
        'eightwothree',
        'abcone2threexyz',
        'xtwone3four',
        '4nineeightseven2',
        'zoneight234',
        '7pqrstsixteen'
      ]
      it('can sanitize', () => {
        expect(checksumSet(data, true)).to.equal(281)
      })
    })
    describe('lazyChecksumLine', () => {
      const data = [
        'two1nine',
        'eightwothree',
        'abcone2threexyz',
        'xtwone3four',
        '4nineeightseven2',
        'zoneight234',
        '7pqrstsixteen'
      ]
      const result = [29, 83, 13, 24, 42, 14, 76]
      it('can match text or numeric for checksum calcs', () => {
        const set = JSON.parse(JSON.stringify(data))
        for (let x = 0; x < set.length; x++) {
          expect(lazyChecksumLine(set[x])).to.equal(result[x])
        }
      })
    })

    //   it('doesn`t sanitize by default', () => {
    //     const set = [
    //       'two1nine',
    //       'eightwothree',
    //       'abcone2threexyz',
    //       'xtwone3four',
    //       '4nineeightseven2',
    //       'zoneight234',
    //       '7pqrstsixteen'
    //     ]
    //     expect(checksumSet(set)).to.be.NaN
    //   })
    //   it('allows for sanitizing to be explicitly disabled', () => {
    //     const set = [
    //       'two1nine',
    //       'eightwothree',
    //       'abcone2threexyz',
    //       'xtwone3four',
    //       '4nineeightseven2',
    //       'zoneight234',
    //       '7pqrstsixteen'
    //     ]
    //     expect(checksumSet(set, 'none')).to.be.NaN
    //   })
    //   // it('calculates the checksum for a set of lines by summing the checksum of each line', () => {
    //   //   const set = [
    //   //     'two1nine',
    //   //     'eightwothree',
    //   //     'abcone2threexyz',
    //   //     'xtwone3four',
    //   //     '4nineeightseven2',
    //   //     'zoneight234',
    //   //     '7pqrstsixteen'
    //   //   ]
    //   //   expect(checksumSet(set)).to.equal(281)
    //   // })
    // })
    describe('integeration', () => {
      let initData
      before((done) => {
        fs.readFile(filePath, { encoding: 'utf8' }, (err, rawData) => {
          if (err) throw err
          initData = inputToArray(rawData.trim())
          // Deep copy to ensure we aren't mutating the original data
          // data = JSON.parse(JSON.stringify(initData))
          done()
        })
      })

      it('is not done without sanitation, since that matches part 1', () => {
        const data = JSON.parse(JSON.stringify(initData))
        const result = checksumSet(data, true)
        expect(result).to.not.equal(54953)
      })

      it('is not done with a one-time regex', () => {
        const data = JSON.parse(JSON.stringify(initData))
        const result = checksumSet(data, true)
        expect(result).to.not.equal(53885) // result of one-time regex
      })

      it('is not done by sanitizing just the first and last strings', () => {
        const data = JSON.parse(JSON.stringify(initData))
        const result = checksumSet(data, true)
        expect(result).to.not.equal(53853) // result of first/last substitution onlye
      })
    })
  })
})
