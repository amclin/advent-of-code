/* eslint-env mocha */
const { expect } = require('chai')
const { move, navigate, aimedMove } = require('./navigate')

const TestRoute = [
  ['forward', 5],
  ['down', 5],
  ['forward', 8],
  ['up', 3],
  ['down', 8],
  ['forward', 2]
]

describe('--- Day 2: Dive! ---', () => {
  describe('Part 1', () => {
    describe('move()', () => {
      it('moves the submarine forward', () => {
        expect(move({ x: 0, d: 0 }, 'forward', 8)).to.deep.equal({
          x: 8,
          d: 0
        })
      })
      it('moves the submarine down', () => {
        expect(move({ x: 0, d: 0 }, 'down', 8)).to.deep.equal({
          x: 0,
          d: 8
        })
      })
      it('moves the submarine up', () => {
        expect(move({ x: 0, d: 0 }, 'up', 8)).to.deep.equal({
          x: 0,
          d: -8
        })
      })
      it('throws an error for an unexpected direction', () => {
        expect(() => {
          move({ x: 0, d: 0 }, 'garbage', 5)
        }).to.throw('Direction garbage is unsupported')
      })
    })
    describe('navigate()', () => {
      it('takes a series of directions and follows the route', () => {
        expect(navigate({ x: 0, d: 0 }, TestRoute)).to.deep.equal({
          x: 15,
          d: 10
        })
      })
    })
  })
  describe('Part 2', () => {
    describe('aimedMove()', () => {
      it('moves forward when the aim is 0', () => {
        expect(aimedMove({ x: 0, d: 0, a: 0 }, 'forward', 5)).to.deep.equal({
          x: 5,
          d: 0,
          a: 0
        })
      })
      it('aims down without moving', () => {
        expect(aimedMove({ x: 0, d: 0, a: 0 }, 'down', 5)).to.deep.equal({
          x: 0,
          d: 0,
          a: 5
        })
      })
      it('moves forward and down when aimed', () => {
        expect(aimedMove({ x: 0, d: 0, a: 5 }, 'forward', 8)).to.deep.equal({
          x: 8,
          d: 40,
          a: 5
        })
      })
      it('aims up without moving', () => {
        expect(aimedMove({ x: 0, d: 0, a: 5 }, 'up', 3)).to.deep.equal({
          x: 0,
          d: 0,
          a: 2
        })
      })
      it('throws an error for an unexpected direction', () => {
        expect(() => {
          aimedMove({ x: 0, d: 0, a: 5 }, 'garbage', 5)
        }).to.throw('Direction garbage is unsupported')
      })
    })
    describe('navigate()', () => {
      it('can navigate using aiming', () => {
        const destination = navigate({ x: 0, d: 0, a: 0 }, TestRoute, true)
        expect(destination.x).to.equal(15)
        expect(destination.d).to.equal(60)
      })
    })
  })
})
