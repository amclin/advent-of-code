/* eslint-env mocha */
const { expect } = require('chai')
const { parseRule, findAllowedOuter, countInner } = require('./bagRules')

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
  ],
  part2Rules: [
    'shiny gold bags contain 2 dark red bags.',
    'dark red bags contain 2 dark orange bags.',
    'dark orange bags contain 2 dark yellow bags.',
    'dark yellow bags contain 2 dark green bags.',
    'dark green bags contain 2 dark blue bags.',
    'dark blue bags contain 2 dark violet bags.',
    'dark violet bags contain no other bags.'
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
  describe('Part 2', () => {
    describe('countInner()', () => {
      it('provides a list of child bags and with quantity of each', () => {
        const result1 = Object.values(
          countInner(testData.rules.map(parseRule), 'shiny gold bag')
        ).reduce((a, b) => a + b, 0)
        expect(result1).to.equal(32)

        const result2 = Object.values(
          countInner(testData.part2Rules.map(parseRule), 'shiny gold bag')
        ).reduce((a, b) => a + b, 0)
        expect(result2).to.equal(126)
      })
    })
  })
})
