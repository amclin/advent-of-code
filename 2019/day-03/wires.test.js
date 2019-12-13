/* eslint-env mocha */
const expect = require('chai').expect
const { elfWireToSVGPath, findWireIntersections, getClosesetIntersection } = require('./wires')

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
          'U7,R6,D4,L4'
        ]
        const expected = [
          { x: 0, y: 0, distance: 0 },
          { x: 3, y: -3, distance: 6 },
          { x: 6, y: -5, distance: 11 }
        ]
        const actual = findWireIntersections(wires)
        expect(actual).to.deep.equal(expected)
      })
    })
    describe('getClosestIntersection()', () => {
      it('finds the closest intersection in a list of intersections', () => {
        const intersections = [
          { x: 23, y: 45 },
          { x: 48, y: -10 },
          { x: 3, y: 3 },
          { x: 3, y: 3 }
        ]
        const expected = { x: 3, y: 3, distance: 6 }
        const actual = getClosesetIntersection(intersections)
        expect(actual).to.deep.equal(expected)
      })
    })
  })
})
