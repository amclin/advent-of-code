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
  \\------/   `.trim()

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
          direction: '>'
        }, {
          x: 9,
          y: 3,
          direction: 'v'
        }]
        const track = new Track(data)
        const actual = track.carts
        expect(actual).to.deep.equal(expected)
      })
    })
    describe('advance()', () => {
      it.skip('iterates the state of the track')
    })
    describe('display()', () => {
      it('renders the current track state', () => {
        const expected = data
        const track = new Track(data)
        const actual = track.display()
        expect(actual).to.equal(expected)
      })
    })
    describe('getSegmentType(x,y)', () => {
      it.skip('queries the type of segment at location x,y', () => {
        const expected = '-'
        const track = new Track(data)
        const actual = track.getSegmentType(5, 2)
        expect(actual).to.equal(expected)
      })
    })
  })
})
