/* eslint-env mocha */
const expect = require('chai').expect
const {
  parseLine
} = require('./helpers')
const {
  Beacon
} = require('./beacons')

const testData = `position=< 9,  1> velocity=< 0,  2>
position=< 7,  0> velocity=<-1,  0>
position=< 3, -2> velocity=<-1,  1>
position=< 6, 10> velocity=<-2, -1>
position=< 2, -4> velocity=< 2,  2>
position=<-6, 10> velocity=< 2, -2>
position=< 1,  8> velocity=< 1, -1>
position=< 1,  7> velocity=< 1,  0>
position=<-3, 11> velocity=< 1, -2>
position=< 7,  6> velocity=<-1, -1>
position=<-2,  3> velocity=< 1,  0>
position=<-4,  3> velocity=< 2,  0>
position=<10, -3> velocity=<-1,  1>
position=< 5, 11> velocity=< 1, -2>
position=< 4,  7> velocity=< 0, -1>
position=< 8, -2> velocity=< 0,  1>
position=<15,  0> velocity=<-2,  0>
position=< 1,  6> velocity=< 1,  0>
position=< 8,  9> velocity=< 0, -1>
position=< 3,  3> velocity=<-1,  1>
position=< 0,  5> velocity=< 0, -1>
position=<-2,  2> velocity=< 2,  0>
position=< 5, -2> velocity=< 1,  2>
position=< 1,  4> velocity=< 2,  1>
position=<-2,  7> velocity=< 2, -2>
position=< 3,  6> velocity=<-1, -1>
position=< 5,  0> velocity=< 1,  0>
position=<-6,  0> velocity=< 2,  0>
position=< 5,  9> velocity=< 1, -2>
position=<14,  7> velocity=<-2,  0>
position=<-3,  6> velocity=< 2, -1>`.split('\n').map(parseLine)

describe('--- Day 10: The Stars Align ---', () => {
  describe('Beacons:', () => {
    describe('new Beacons()', () => {
      it('initializes a beacon tracker object, cacheing the input data', () => {
        const expected = [
          { position: { x: 9, y: 1 }, velocity: { x: 0, y: 2 } },
          { position: { x: 7, y: 0 }, velocity: { x: -1, y: 0 } },
          { position: { x: 3, y: -2 }, velocity: { x: -1, y: 1 } },
          { position: { x: 6, y: 10 }, velocity: { x: -2, y: -1 } },
          { position: { x: 2, y: -4 }, velocity: { x: 2, y: 2 } },
          { position: { x: -6, y: 10 }, velocity: { x: 2, y: -2 } },
          { position: { x: 1, y: 8 }, velocity: { x: 1, y: -1 } },
          { position: { x: 1, y: 7 }, velocity: { x: 1, y: 0 } },
          { position: { x: -3, y: 11 }, velocity: { x: 1, y: -2 } },
          { position: { x: 7, y: 6 }, velocity: { x: -1, y: -1 } },
          { position: { x: -2, y: 3 }, velocity: { x: 1, y: 0 } },
          { position: { x: -4, y: 3 }, velocity: { x: 2, y: 0 } },
          { position: { x: 10, y: -3 }, velocity: { x: -1, y: 1 } },
          { position: { x: 5, y: 11 }, velocity: { x: 1, y: -2 } },
          { position: { x: 4, y: 7 }, velocity: { x: 0, y: -1 } },
          { position: { x: 8, y: -2 }, velocity: { x: 0, y: 1 } },
          { position: { x: 15, y: 0 }, velocity: { x: -2, y: 0 } },
          { position: { x: 1, y: 6 }, velocity: { x: 1, y: 0 } },
          { position: { x: 8, y: 9 }, velocity: { x: 0, y: -1 } },
          { position: { x: 3, y: 3 }, velocity: { x: -1, y: 1 } },
          { position: { x: 0, y: 5 }, velocity: { x: 0, y: -1 } },
          { position: { x: -2, y: 2 }, velocity: { x: 2, y: 0 } },
          { position: { x: 5, y: -2 }, velocity: { x: 1, y: 2 } },
          { position: { x: 1, y: 4 }, velocity: { x: 2, y: 1 } },
          { position: { x: -2, y: 7 }, velocity: { x: 2, y: -2 } },
          { position: { x: 3, y: 6 }, velocity: { x: -1, y: -1 } },
          { position: { x: 5, y: 0 }, velocity: { x: 1, y: 0 } },
          { position: { x: -6, y: 0 }, velocity: { x: 2, y: 0 } },
          { position: { x: 5, y: 9 }, velocity: { x: 1, y: -2 } },
          { position: { x: 14, y: 7 }, velocity: { x: -2, y: 0 } },
          { position: { x: -3, y: 6 }, velocity: { x: 2, y: -1 } }
        ]
        const beaconTracker = new Beacon(testData)
        const actual = beaconTracker.start
        expect(actual).to.deep.equal(expected)
      })
    })
    describe('get(frame)', () => {
      it('Calculates the positions of the beacons for the specified frame', () => {
        const expected = [
          { x: 9, y: 13 },
          { x: 1, y: 0 },
          { x: -3, y: 4 },
          { x: -6, y: 4 },
          { x: 14, y: 8 },
          { x: 6, y: -2 },
          { x: 7, y: 2 },
          { x: 7, y: 7 },
          { x: 3, y: -1 },
          { x: 1, y: 0 },
          { x: 4, y: 3 },
          { x: 8, y: 3 },
          { x: 4, y: 3 },
          { x: 11, y: -1 },
          { x: 4, y: 1 },
          { x: 8, y: 4 },
          { x: 3, y: 0 },
          { x: 7, y: 6 },
          { x: 8, y: 3 },
          { x: -3, y: 9 },
          { x: 0, y: -1 },
          { x: 10, y: 2 },
          { x: 11, y: 10 },
          { x: 13, y: 10 },
          { x: 10, y: -5 },
          { x: -3, y: 0 },
          { x: 11, y: 0 },
          { x: 6, y: 0 },
          { x: 11, y: -3 },
          { x: 2, y: 7 },
          { x: 9, y: 0 }
        ]
        const beaconTracker = new Beacon(testData)
        const actual = beaconTracker.getFrame(6).contents
        expect(actual).to.deep.equal(expected)
      })
      it('Calculates the focus value for the frame', () => {
        const expected = 728
        const beaconTracker = new Beacon(testData)
        const actual = beaconTracker.getFrame(8).meta.focus
        expect(actual).to.equal(expected)
      })
      it('Calculates the dimensions of the region containing content in the specified frame', () => {
        const expected = { origin: [ -10, -9 ], dim: [ 28, 26 ] }
        const beaconTracker = new Beacon(testData)
        const actual = beaconTracker.getFrame(8).meta.dims
        expect(actual).to.deep.equal(expected)
      })
    })
  })
})
