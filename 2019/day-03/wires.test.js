/* eslint-env mocha */
const expect = require('chai').expect
const { elfWireToSVGPath, findWireIntersections } = require('./wires')

describe('--- 2019 Day 3: Crossed Wires ---', () => {
  describe('Part 1', () => {
    describe('elfWiresToSVGPath()', () => {
      it('converts elfwire syntax to svg path syntax', () => {
        const wire = 'R75,D30,R83,U83,L12,D49,R71,U7,L72'
        const expected = 'M0,0 h75 v30 h83 v-83 h-12 v49 h71 v-7 h-72'
        const actual = elfWireToSVGPath(wire)
        expect(actual).to.equal(expected)
      })
    })
    describe('findWireIntersections()', () => {
      it('finds the intersection points of multiple wires', () => {
        const wires = [
          'R8,U5,L5,D3',
          'U7,R6,D4'
        ]
        const expected = [
          [3, 3],
          [6, 9]
        ]
        const actual = findWireIntersections(wires)
        expect(actual).to.deep.equal(expected)
      })
    })
  })
})
