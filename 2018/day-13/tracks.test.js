/* eslint-env mocha */
const expect = require('chai').expect
const {
  Track
} = require('./tracks')

const data = `/->-\\
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/   `

describe('--- Day 13: Mine Cart Madness ---', () => {
  describe('Part 1:', () => {
    describe('new Track(layout)', () => {
      it('Initializes a new track with layout', () => {
        const track = new Track(data)
        expect(track.layout[4][12]).to.equal('/')
      })
      it('splits out and stores the carts as addressable data', () => {
        const expected = [{
          x: 2,
          y: 0,
          direction: '>',
          lastIntersections: [1, 0]
        }, {
          x: 9,
          y: 3,
          direction: 'v',
          lastIntersections: [1, 0]
        }]
        const track = new Track(data)
        const actual = track.carts
        expect(actual).to.deep.equal(expected)
      })
    })
    describe('advance()', () => {
      it('moves forward all carts on the layout', () => {
        const test = `/---\\
|   |  /----\\
| /-+>-+-\\  |
| | |  | |  ^
\\-+-/  \\-+--/
  \\------/   `
        const expected = `/---\\
|   |  /----\\
| /-+->+-\\  ^
| | |  | |  |
\\-+-/  \\-+--/
  \\------/   `.trim()
        const track = new Track(test)
        track.advance()
        const actual = track.display().trim()
        expect(actual).to.equal(expected)
        expect(track.frame).to.equal(1)
      })
    })
    describe('moveCart(cart)', () => {
      it('moves an individual cart right', () => {
        const test = `->--`
        const track = new Track(test)
        const expected = `-->-`
        track.moveCart(track.carts[0])
        const actual = track.display().trim()
        expect(actual).to.equal(expected)
      })
      it('moves an individual cart left', () => {
        const test = `--<-`
        const track = new Track(test)
        const expected = `-<--`
        track.moveCart(track.carts[0])
        const actual = track.display().trim()
        expect(actual).to.equal(expected)
      })
      it('moves an individual cart down', () => {
        const test = `|\nv\n|\n|`
        const track = new Track(test)
        const expected = `|\n|\nv\n|`
        track.moveCart(track.carts[0])
        const actual = track.display().trim()
        expect(actual).to.equal(expected)
      })
      it('moves an individual cart up', () => {
        const test = `|\n|\n^\n|`
        const track = new Track(test)
        const expected = `|\n^\n|\n|`
        track.moveCart(track.carts[0])
        const actual = track.display().trim()
        expect(actual).to.equal(expected)
      })
      it('rotates a cart when it enters turns', () => {
        const tests = [
          `->-\\-`,
          `->-/-`,
          `-/-<-`,
          `-\\-<-`,
          `|\nv\n|\n\\\n|`,
          `|\nv\n|\n/\n|`,
          `|\n/\n|\n^\n|`,
          `|\n\\\n|\n^\n|`
        ]
        const expected = [
          `---v-`,
          `---^-`,
          `-v---`,
          `-^---`,
          `|\n|\n|\n>\n|`,
          `|\n|\n|\n<\n|`,
          `|\n>\n|\n|\n|`,
          `|\n<\n|\n|\n|`
        ]
        tests.forEach((test, idx) => {
          const track = new Track(test)
          track.moveCart(track.carts[0])
          track.moveCart(track.carts[0])
          const actual = track.display().trim()
          expect(actual).to.equal(expected[idx])
        })
      })
      it('rotates a cart when it enters an intersection', () => {
        const test = `->-+-`
        const track = new Track(test)
        const expected = `---^-`
        track.moveCart(track.carts[0])
        track.moveCart(track.carts[0])
        const actual = track.display().trim()
        expect(actual).to.equal(expected)
      })
      it('tracks the direction through multiple intersections following the sequential rotation rules: left, straight, right', () => {
        const expected = `
     ^
     |
   +-+
   |
   +
   |
---+`.trim()
        const test = `
     |
     |
   +-+
   |
   +
   |
->-+`
        const track = new Track(test)

        for (let i = 0; i < 10; i++) {
          track.moveCart(track.carts[0])
        }
        const actual = track.display().trim()
        expect(actual).to.equal(expected)
      })
      it('only moves the specified cart', () => {
        const test = `->--<-`
        const expected = `---><-`
        const track = new Track(test)
        track.moveCart(track.carts[0])
        track.moveCart(track.carts[0])
        const actual = track.display().trim()
        expect(actual).to.equal(expected)
      })
      it('throws an error if the cart runs off the rails', () => {
        const test = `->- -`
        const track = new Track(test)
        try {
          track.moveCart(track.carts[0])
        } catch (err) {
          expect(err).to.be.an('error')
        }
      })
      it('registers a collision', () => {
        const test = `->-<-`
        const expected = `---X-`
        const track = new Track(test)
        try {
          track.moveCart(track.carts[0])
          track.moveCart(track.carts[0])
        } catch (err) {
          const actual = track.display().trim()
          expect(actual).to.equal(expected)
          expect(track.collision).to.deep.equal({ x: 3, y: 0 })
        }
      })
    })
    describe('display()', () => {
      it('renders the current track state', () => {
        const expected = data.trim()
        const track = new Track(data)
        const actual = track.display().trim()
        expect(actual).to.equal(expected)
      })
    })
    describe('getSegment(x,y)', () => {
      it('queries the type of segment at location x,y', () => {
        const expected = '-'
        const track = new Track(data)
        const actual = track.getSegment(5, 2)
        expect(actual).to.equal(expected)
      })
    })
  })
  describe('Part 2:', () => {
    describe('new Track(layout, options)', () => {
      it('removes crashed carts when enabled', () => {
        const testData = `/>-<\\
|   |
| /<+-\\
| | | v
\\>+</ |
  |   ^
  \\<->/`
        const expected = `/---\\
|   |
| /-+-\\
| | | |
\\-+-/ ^
  |   |
  \\---/`.trim()
        const track = new Track(testData, { removeCrashedCarts: true })
        while (track.carts.length > 1) {
          track.advance()
        }
        const actual = track.display().trim()
        expect(actual).to.equal(expected)
        expect(track.carts[0].x).to.equal(6)
        expect(track.carts[0].y).to.equal(4)
        expect(track.frame).to.equal(3)
      })
    })
  })
})
