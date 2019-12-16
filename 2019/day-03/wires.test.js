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
    it('can be used to find the distance to the closest intersection', () => {
      const wiresets = [
        [
          'R75,D30,R83,U83,L12,D49,R71,U7,L72',
          'U62,R66,U55,R34,D71,R55,D58,R83'
        ], [
          'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
          'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
        ]
      ]
      const distances = [159, 135]
      wiresets.forEach((wires, idx) => {
        expect(getClosesetIntersection(findWireIntersections(wires)).distance).to.equal(distances[idx])
      })
    })
    describe('getIntersectionWireDistance()', () => {
      it('calculates the summed total wire length to reach the specified intersection', () => {
        const wires = [
          'R8,U5,L5,D3',
          'U7,R6,D4,L4'
        ]
        const expected = [
          40, 30
        ]
        const intersections = findWireIntersections(...wires)
        const actual = intersections.map((inter) => getIntersectionWireDistance({ wires, intersection: inter }))
        expect(actual).to.deep.equal(expected)
      })
    })
    describe('getClosestIntersectionByWire()', () => {
      it('can be used to find the wire distance to the closest intersection', () => {
        const wiresets = [
          [
            'R75,D30,R83,U83,L12,D49,R71,U7,L72',
            'U62,R66,U55,R34,D71,R55,D58,R83'
          ], [
            'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
            'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
          ]
        ]
        const distances = [610, 410]
        wiresets.forEach((wires, idx) => {
          const intersections = findWireIntersections(wires)
          expect(getClosesetIntersectionByWire({ intersections, wires }).distance).to.equal(distances[idx])
        })
      })
    })
  })
})
