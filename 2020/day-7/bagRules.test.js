/* eslint-env mocha */
const { expect } = require('chai')
const { parseRule, findAllowedOuter } = require('./bagRules')

const testData = {
  rules: [
    'light red bags contain 1 bright white bag, 2 muted yellow bags.',
    'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
    'bright white bags contain 1 shiny gold bag.',
    'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
    'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
    'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
    'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
    'faded blue bags contain no other bags.',
    'dotted black bags contain no other bags.'
  ]
}

describe('--- Day 7: Handy Haversacks ---', () => {
  describe('Part 1', () => {
    describe('parseRule()', () => {
      it('converts a natural language rule into a useable object', () => {
        expect(parseRule(testData.rules[0])).to.deep.equal({
          outer: 'light red bag',
          inner: [
            {
              count: 1,
              color: 'bright white bag'
            }, {
              count: 2,
              color: 'muted yellow bag'
            }
          ]
        })
      })
      it('handles bags that do not accept children', () => {
        expect(parseRule(testData.rules[7])).to.deep.equal({
          outer: 'faded blue bag'
        })
      })
    })
    describe('findAllowedOuter()', () => {
      it('list bags the specified bag is allowed to be placed in', () => {
        const expectedColors = [
          'bright white bag',
          'muted yellow bag',
          'dark orange bag',
          'light red bag'
        ]
        const result = findAllowedOuter(
          testData.rules.map(parseRule),
          'shiny gold bag'
        )
        expectedColors.forEach(color => {
          expect(result[color]).to.equal(true)
        })
        expect(Object.keys(result).length).to.equal(expectedColors.length)
      })
    })
  })
})
