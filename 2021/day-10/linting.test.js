/* eslint-env mocha */
const { expect } = require('chai')
const { lintLine, lintAll } = require('./linting')

const badChunks = [
  '(]',
  '{()()()>',
  '(((()))}',
  '<([]){()}[{}])'
]

const testData = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`

const autocomplete = {
  '[({(<(())[]>[[{[]{<()<>>': '}}]])})]',
  '[(()[<>])]({[<{<<[]>>(': ')}>]})',
  '(((({<>}<{<{<>}{[]{[]{}': '}}>}>))))',
  '{<[[]]>}<{[{[{[]{()[[[]': ']]}}]}]}>',
  '<{([{{}}[<[[[<>{}]]]>[]]': '])}>'
}

describe('--- Day 10: Syntax Scoring ---', () => {
  describe('Part 1', () => {
    describe('lintLine()', () => {
      it('finds instnces of closing brackets that mismatch the opening brackets', () => {
        expect(lintLine(badChunks[0])).to.deep.equal(
          {
            char: 1,
            expected: ')',
            found: ']'
          }
        )
        expect(lintLine(badChunks[1])).to.deep.equal(
          {
            char: 7,
            expected: '}',
            found: '>'
          }
        )
        expect(lintLine(badChunks[2])).to.deep.equal(
          {
            char: 7,
            expected: ')',
            found: '}'
          }
        )
        expect(lintLine(badChunks[3])).to.deep.equal(
          {
            char: 13,
            expected: '>',
            found: ')'
          }
        )
      })
    })
    describe('lintAll', () => {
      it('finds all lines with linting errors', () => {
        const errors = lintAll(testData.split('\n'))
          .filter((err) => (err.char))

        expect(errors.length).to.equal(5)
        expect(errors[0]).to.deep.equal({
          line: 2,
          char: 12,
          expected: ']',
          found: '}'
        })
        expect(errors[1]).to.deep.equal({
          line: 4,
          char: 8,
          expected: ']',
          found: ')'
        })
        expect(errors[2]).to.deep.equal({
          line: 5,
          char: 7,
          expected: ')',
          found: ']'
        })
        expect(errors[3]).to.deep.equal({
          line: 7,
          char: 10,
          expected: '>',
          found: ')'
        })
        expect(errors[4]).to.deep.equal({
          line: 8,
          char: 16,
          expected: ']',
          found: '>'
        })
      })
      it('provides autocomplete suggestions for incomplete lines', () => {
        const data = testData.split('\n')
        const errors = lintAll(data)
          .filter((err) => !!err.suggestion)

        expect(errors.length).to.equal(5)
        errors.forEach((err) => {
          expect(err.suggestion).to.equal(
            autocomplete[data[err.line]]
          )
        })
      })
      it('skips lines without errors', () => {
        const errors = lintAll([
          '[]',
          '[()]'
        ])
        expect(errors.length).to.equal(0)
      })
    })
  })
})
