/* eslint-env mocha */
const { expect } = require('chai')
const { distance } = require('../../2018/day-06/coordinates')
const { move, route } = require('./ferry')

describe('--- Day 11: Seating System ---', () => {
  describe('Part 1', () => {
    describe('move()', () => {
      let origin

      beforeEach(() => {
        origin = {
          x: 0,
          y: 0,
          d: 90 // Starting direction is east
        }
      })
      it('can move North without turning', () => {
        const command = 'N5'
        expect(
          move({ position: origin, command })
        ).to.deep.equal({ x: 0, y: 5, d: 90 })
      })
      it('can move South without turning', () => {
        const command = 'S5'
        expect(
          move({ position: origin, command })
        ).to.deep.equal({ x: 0, y: -5, d: 90 })
      })
      it('can move East without turning', () => {
        const command = 'E5'
        expect(
          move({ position: origin, command })
        ).to.deep.equal({ x: 5, y: 0, d: 90 })
      })
      it('can move West without turning', () => {
        const command = 'W5'
        expect(
          move({ position: origin, command })
        ).to.deep.equal({ x: -5, y: 0, d: 90 })
      })
      it('can turn left (counterclockwise) without moving', () => {
        const command = 'L90'
        expect(
          move({ position: origin, command })
        ).to.deep.equal({ x: 0, y: 0, d: 0 })
      })
      it('can turn right (clockwise) without moving', () => {
        const command = 'R90'
        expect(
          move({ position: origin, command })
        ).to.deep.equal({ x: 0, y: 0, d: 180 })
      })
      it('can move forward in the direction it is pointing', () => {
        const command = 'F10'
        expect(
          move({ position: origin, command })
        ).to.deep.equal({ x: 10, y: 0, d: 90 })
        expect(
          move({ position: { x: 0, y: 0, d: 0 }, command })
        ).to.deep.equal({ x: 0, y: 10, d: 0 })
        expect(
          move({ position: { x: 0, y: 0, d: 270 }, command })
        ).to.deep.equal({ x: -10, y: 0, d: 270 })
        expect(
          move({ position: { x: 0, y: 0, d: 180 }, command })
        ).to.deep.equal({ x: 0, y: -10, d: 180 })
      })
      it('cannot handle non-cardoma; directions', () => {
        expect(() => {
          move({ position: { x: 0, y: 0, d: 13 }, command: 'F10' })
        }).to.throw('Non-cardinal compass direction')
      })
      it('defaults to 0,0 facing East', () => {
        expect(move({ command: 'F10' }))
          .to.deep.equal({ x: 10, y: 0, d: 90 })
      })
      it('can be rotated more than 360 degrees', () => {
        expect(move({ command: 'L720' }))
          .to.deep.equal({ x: 0, y: 0, d: 90 })
        expect(move({ position: { x: 0, y: 0, d: -810 }, command: 'R720' }))
          .to.deep.equal({ x: 0, y: 0, d: 270 })
      })
    })
    describe('route()', () => {
      it('can follow a list of instructions', () => {
        const instructions = [
          'F10',
          'N3',
          'F7',
          'R90',
          'F11'
        ]
        const result = route({ instructions })
        expect(result)
          .to.deep.equal({ x: 17, y: -8, d: 180 })
        // manhattan distance from origin
        expect(distance({ x: 0, y: 0 }, result)).to.equal(25)
      })
    })
  })
  describe('Part 2', () => {
    describe('move()', () => {
      let origin
      let waypoint
      let mode

      beforeEach(() => {
        mode = 'waypoint'
        origin = {
          x: 0,
          y: 0,
          d: 90 // Starting direction is east
        }
        waypoint = {
          x: 10,
          y: 1
        }
      })
      it('waypoint: can move North without turning', () => {
        const command = 'N5'
        expect(
          move({ position: origin, waypoint, command, mode })
        ).to.deep.equal({
          position: { x: 0, y: 0, d: 90 },
          waypoint: { x: 10, y: 6 }
        })
      })
      it('waypoint: can move South without turning', () => {
        const command = 'S5'
        expect(
          move({ position: origin, waypoint, command, mode })
        ).to.deep.equal({
          position: { x: 0, y: 0, d: 90 },
          waypoint: { x: 10, y: -4 }
        })
      })
      it('waypoint: can move East without turning', () => {
        const command = 'E5'
        expect(
          move({ position: origin, waypoint, command, mode })
        ).to.deep.equal({
          position: { x: 0, y: 0, d: 90 },
          waypoint: { x: 15, y: 1 }
        })
      })
      it('waypoint: can move West without turning', () => {
        const command = 'W5'
        expect(
          move({ position: origin, waypoint, command, mode })
        ).to.deep.equal({
          position: { x: 0, y: 0, d: 90 },
          waypoint: { x: 5, y: 1 }
        })
      })
      it('waypoint: can turn left (counterclockwise) without moving', () => {
        const command = 'L90'
        expect(
          move({ position: origin, waypoint, command, mode })
        ).to.deep.equal({
          position: { x: 0, y: 0, d: 90 },
          waypoint: { x: -1, y: 10 }
        })
      })
      it('waypoint: can turn right (clockwise) without moving', () => {
        const command = 'R90'
        expect(
          move({ position: origin, waypoint, command, mode })
        ).to.deep.equal({
          position: { x: 0, y: 0, d: 90 },
          waypoint: { x: 1, y: -10 }
        })
      })
      it('waypoint: can move forward in the direction it is pointing', () => {
        const command = 'F10'
        expect(
          move({ position: origin, waypoint, command, mode })
        ).to.deep.equal({
          position: { x: 100, y: 10, d: 90 },
          waypoint: { x: 110, y: 11 }
        })
      })
    })
    describe('route()', () => {
      let mode

      beforeEach(() => {
        mode = 'waypoint'
      })
      it('waypoint: can follow a list of instructions', () => {
        const instructions = [
          'F10',
          'N3',
          'F7',
          'R90',
          'F11'
        ]
        const result = route({ instructions, mode })
        expect(result)
          .to.deep.equal({ x: 214, y: -72, d: 90 })
        // manhattan distance from origin
        expect(distance({ x: 0, y: 0 }, result)).to.equal(286)
      })
    })
  })
})
