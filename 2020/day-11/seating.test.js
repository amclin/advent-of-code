/* eslint-env mocha */
const { expect } = require('chai')
const { format, parse, advance, occupiedLineOfSite } = require('./seating')

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

const testDataPart2 = testData.slice(0, 2)
testDataPart2.push(
`#.LL.LL.L#
#LLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLLL.L
#.LLLLL.L#`
)
testDataPart2.push(
`#.L#.##.L#
#L#####.LL
L.#.#..#..
##L#.##.##
#.##.#L.##
#.#####.#L
..#.#.....
LLL####LL#
#.L#####.L
#.L####.L#`
)
testDataPart2.push(
`#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##LL.LL.L#
L.LL.LL.L#
#.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLL#.L
#.L#LL#.L#`
)
testDataPart2.push(
`#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.#L.L#
#.L####.LL
..#.#.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#`
)
testDataPart2.push(
`#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.LL.L#
#.LLLL#.LL
..#.L.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#`
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
  describe('Part 2', () => {
    describe('occupiedLineOfSite()', () => {
      it('counts the occupied seats visible in each direction', () => {
        const data =
`.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....`
        expect(occupiedLineOfSite({ x: 1, y: 1, seatMap: data })).to.equal(8)
      })
      it('cannot see occupied seats past an available seat', () => {
        const data =
`.............
.L.L.#.#.#.#.
.............`
        expect(occupiedLineOfSite({ x: 3, y: 4, seatMap: data })).to.equal(0)
      })
      it('can look in all compass directions', () => {
        const data =
`.##.##.
#.#.#.#
##...##
...L...
##...##
#.#.#.#
.##.##.`
        expect(occupiedLineOfSite({ x: 3, y: 3, seatMap: data })).to.equal(0)
      })
    })
    describe('advance()', () => {
      it('accepts visibility rules instead of proximity', () => {
        const results = testDataPart2.map((data) => {
          return format(
            advance(
              parse(data), 'visible'
            )
          )
        })

        for (let x = 1; x < testDataPart2.length; x++) {
          console.debug('Step', x)
          expect(results[x - 1]).to.equal(testDataPart2[x])
        }
        const finalOccupancy = (results[results.length - 1].match(/#/g) || []).length
        expect(finalOccupancy).to.equal(26)
      })
    })
  })
})
