/* eslint-env mocha */
const { expect } = require('chai')
const { distance } = require('../../2018/day-06')
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
      it('can move forward', () => {
        const command = 'F10'
        expect(
          move({ position: origin, command })
        ).to.deep.equal({ x: 10, y: 0, d: 90 })
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
        expect(distance(result.x, result.y)).to.equal(25)
      })
    })
  })
})
