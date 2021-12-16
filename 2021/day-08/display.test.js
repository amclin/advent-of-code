/* eslint-env mocha */
const { expect } = require('chai')
const { descrambleSignal, decodeSignal, parseEntry } = require('./display')

const testSingle = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'

const testMultiple = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`.split('\n')

describe('--- Day 8: Seven Segment Search ---', () => {
  describe('Part 1', () => {
    describe('descrambleSignal()', () => {
      const testData = testSingle.split('|')[0].trim()
      const { segmentCodes, charCodes } = descrambleSignal(testData)

      it('takes scambled string of 10 codes and identifies the letters matching each seven-digit-display segment', () => {
        expect(segmentCodes.length).to.equal(7)
        expect(segmentCodes.filter((code) => !['a', 'b', 'c', 'd', 'e', 'f', 'g'].includes(code)).length).to.equal(0)
      })

      it('produces a list of character codes for each number that can be displayed', () => {
        // There should be exactly 10 numbers
        expect(charCodes.length).to.equal(10)
        // lengths of each code is predictable as each number has a specific count of segments
        const expectedLengths = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6]
        expect(charCodes.map(code => code.length)).to.deep.equal(expectedLengths)
      })
    })
    describe('decodeSignal()', () => {
      const testData = testMultiple[0].split('|').map((a) => a.trim())
      const { charCodes } = descrambleSignal(testData[0])

      it('decodes a display pattern using the provided map of display codes', () => {
        const result = decodeSignal(charCodes, testData[1])
        expect(result[0]).to.equal(8)
        expect(result[3]).to.equal(4)
      })
      it('throws an error if a digit doesn`t have a matching code', () => {
        expect(
          () => decodeSignal(
            [['a']],
            'dcb'
          )
        ).to.throw(
          'No match found for dcb when cleaned up to b,c,d'
        )
      })
      it('throws an error if a digit has multiple matches (meaning a bad codes map)', () => {
        expect(
          () => decodeSignal(
            [['a'], ['d', 'c', 'b'], ['b', 'c', 'd']],
            'dcb'
          )
        ).to.throw(
          'Too many matches for dcb when cleaned up to b,c,d. This most likely indicates a bad list of character codes.'
        )
      })
    })
  })
  describe('Part 2', () => {
    describe('parseEntry()', () => {
      it('parses a set of scrambled codes and signal to produce a number for display', () => {
        expect(
          parseEntry(
            testSingle.split('|').map((x) => x.trim())
          )
        ).to.equal(5353)

        const testData = testMultiple.map(
          (entry) => entry.split('|')
            .map((x) => x.trim())
        ).map(parseEntry)

        expect(testData.reduce((a, b) => a + b)).to.equal(61229)
      })
    })
  })
})
