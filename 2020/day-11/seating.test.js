/* eslint-env mocha */
const { expect } = require('chai')
const { format, parse, advance } = require('./seating')

const testData = [
`L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`
]
testData.push(
`#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##`
)
testData.push(
`#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##`
)
testData.push(
`#.##.L#.##
#L###LL.L#
L.#.#..#..
#L##.##.L#
#.##.LL.LL
#.###L#.##
..#.#.....
#L######L#
#.LL###L.L
#.#L###.##`
)
testData.push(
`#.#L.L#.##
#LLL#LL.L#
L.L.L..#..
#LLL.##.L#
#.LL.LL.LL
#.LL#L#.##
..L.L.....
#L#LLLL#L#
#.LLLLLL.L
#.#L#L#.##`
)
testData.push(
`#.#L.L#.##
#LLL#LL.L#
L.#.L..#..
#L##.##.L#
#.#L.LL.LL
#.#L#L#.##
..L.L.....
#L#L##L#L#
#.LLLLLL.L
#.#L#L#.##`
)

describe('--- Day 11: Seating System ---', () => {
  describe('Part 1', () => {
    describe('advance()', () => {
      it('advances the seating state', () => {
        const results = testData.map((data) => {
          return format(
            advance(
              parse(data)
            )
          )
        })

        for (let x = 1; x < testData.length; x++) {
          console.debug('Step', x)
          expect(results[x - 1]).to.equal(testData[x])
        }
        const finalOccupancy = (results[results.length - 1].match(/#/g) || []).length
        expect(finalOccupancy).to.equal(37)
      })
    })
  })
})
