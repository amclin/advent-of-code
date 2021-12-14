/* eslint-env mocha */
const { expect } = require('chai')
const { school, ageFish, spawn, efficientSchool, efficientSpawn } = require('./fish')

describe('--- Day 6: Lanternfish ---', () => {
  describe('Part 1', () => {
    beforeEach(() => {
      // ensure flushed state
      school.state = [3, 4, 3, 1, 2]
      expect(school.state).to.deep.equal([3, 4, 3, 1, 2])
    })
    describe('spawn()', () => {
      it('adds new fish to the end of the list', () => {
        spawn(4)
        expect(school.state).to.deep.equal([3, 4, 3, 1, 2, 8, 8, 8, 8])
      })
    })
    describe('ageFish()', () => {
      it('ages a particular fish', () => {
        expect(ageFish(6)).to.equal(5)
        expect(ageFish(5)).to.equal(4)
        expect(ageFish(4)).to.equal(3)
        expect(ageFish(3)).to.equal(2)
        expect(ageFish(2)).to.equal(1)
        expect(ageFish(1)).to.equal(0)
        expect(ageFish(0)).to.equal(6)
        expect(ageFish(8)).to.equal(7)
        expect(ageFish(7)).to.equal(6)
      })
      it('throws an error if the fish is out of range', () => {
        expect(() => { ageFish(9) }).to.throw('Fish is too young')
        expect(() => { ageFish(-1) }).to.throw('Fish is too old')
      })
    })
    describe('advance()', () => {
      it('advances one day', () => {
        school.state = [3, 4, 3, 1, 2]
        school.advance()
        expect(school.state).to.deep.equal([2, 3, 2, 0, 1])
        school.advance()
        expect(school.state).to.deep.equal([1, 2, 1, 6, 0, 8])
        school.advance()
        expect(school.state).to.deep.equal([0, 1, 0, 5, 6, 7, 8])
        school.advance()
        expect(school.state).to.deep.equal([6, 0, 6, 4, 5, 6, 7, 8, 8])
        school.advance()
        expect(school.state).to.deep.equal([5, 6, 5, 3, 4, 5, 6, 7, 7, 8])
        school.advance()
        expect(school.state).to.deep.equal([4, 5, 4, 2, 3, 4, 5, 6, 6, 7])
        school.advance()
        expect(school.state).to.deep.equal([3, 4, 3, 1, 2, 3, 4, 5, 5, 6])
        school.advance()
        expect(school.state).to.deep.equal([2, 3, 2, 0, 1, 2, 3, 4, 4, 5])
        school.advance()
        expect(school.state).to.deep.equal([1, 2, 1, 6, 0, 1, 2, 3, 3, 4, 8])
        school.advance()
        expect(school.state).to.deep.equal([0, 1, 0, 5, 6, 0, 1, 2, 2, 3, 7, 8])
        school.advance()
        expect(school.state).to.deep.equal([6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 7, 8, 8, 8])
        school.advance()
        expect(school.state).to.deep.equal([5, 6, 5, 3, 4, 5, 6, 0, 0, 1, 5, 6, 7, 7, 7, 8, 8])
        school.advance()
        expect(school.state).to.deep.equal([4, 5, 4, 2, 3, 4, 5, 6, 6, 0, 4, 5, 6, 6, 6, 7, 7, 8, 8])
        school.advance()
        expect(school.state).to.deep.equal([3, 4, 3, 1, 2, 3, 4, 5, 5, 6, 3, 4, 5, 5, 5, 6, 6, 7, 7, 8])
        school.advance()
        expect(school.state).to.deep.equal([2, 3, 2, 0, 1, 2, 3, 4, 4, 5, 2, 3, 4, 4, 4, 5, 5, 6, 6, 7])
        school.advance()
        expect(school.state).to.deep.equal([1, 2, 1, 6, 0, 1, 2, 3, 3, 4, 1, 2, 3, 3, 3, 4, 4, 5, 5, 6, 8])
        school.advance()
        expect(school.state).to.deep.equal([0, 1, 0, 5, 6, 0, 1, 2, 2, 3, 0, 1, 2, 2, 2, 3, 3, 4, 4, 5, 7, 8])
        school.advance()
        expect(school.state).to.deep.equal([6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 0, 1, 1, 1, 2, 2, 3, 3, 4, 6, 7, 8, 8, 8, 8])
      })
    })
  })
  describe('Part 2', () => {
    beforeEach(() => {
      // ensure flushed state
      efficientSchool.state = [3, 4, 3, 1, 2]
      expect(efficientSchool.state).to.deep.equal([0, 1, 1, 2, 1, 0, 0, 0, 0])
    })
    describe('efficientSpawn()', () => {
      it('efficiently adds new fish to the school', () => {
        efficientSpawn(4)
        expect(efficientSchool.state).to.deep.equal([0, 1, 1, 2, 1, 0, 0, 0, 4])
      })
    })
    describe('efficientAdvance', () => {
      it('advances one day following the same pattern without tracking unique position', () => {
        const sum = (x, y) => x + y
        efficientSchool.state = [3, 4, 3, 1, 2]

        efficientSchool.advance()
        expect(efficientSchool.state.reduce(sum)).to.equal([2, 3, 2, 0, 1].length)
        efficientSchool.advance()
        expect(efficientSchool.state.reduce(sum)).to.equal([1, 2, 1, 6, 0, 8].length)
        efficientSchool.advance()
        expect(efficientSchool.state.reduce(sum)).to.equal([0, 1, 0, 5, 6, 7, 8].length)
        efficientSchool.advance()
        expect(efficientSchool.state.reduce(sum)).to.equal([6, 0, 6, 4, 5, 6, 7, 8, 8].length)
        efficientSchool.advance()
        expect(efficientSchool.state.reduce(sum)).to.equal([5, 6, 5, 3, 4, 5, 6, 7, 7, 8].length)
        efficientSchool.advance()
        expect(efficientSchool.state.reduce(sum)).to.equal([4, 5, 4, 2, 3, 4, 5, 6, 6, 7].length)
        efficientSchool.advance()
        expect(efficientSchool.state.reduce(sum)).to.equal([3, 4, 3, 1, 2, 3, 4, 5, 5, 6].length)
        efficientSchool.advance()
        expect(efficientSchool.state.reduce(sum)).to.equal([2, 3, 2, 0, 1, 2, 3, 4, 4, 5].length)
        efficientSchool.advance()
        expect(efficientSchool.state.reduce(sum)).to.equal([1, 2, 1, 6, 0, 1, 2, 3, 3, 4, 8].length)
        efficientSchool.advance()
        expect(efficientSchool.state.reduce(sum)).to.equal([0, 1, 0, 5, 6, 0, 1, 2, 2, 3, 7, 8].length)
        efficientSchool.advance()
        expect(efficientSchool.state.reduce(sum)).to.equal([6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 7, 8, 8, 8].length)
        efficientSchool.advance()
        expect(efficientSchool.state.reduce(sum)).to.equal([5, 6, 5, 3, 4, 5, 6, 0, 0, 1, 5, 6, 7, 7, 7, 8, 8].length)
        efficientSchool.advance()
        expect(efficientSchool.state.reduce(sum)).to.equal([4, 5, 4, 2, 3, 4, 5, 6, 6, 0, 4, 5, 6, 6, 6, 7, 7, 8, 8].length)
        efficientSchool.advance()
        expect(efficientSchool.state.reduce(sum)).to.equal([3, 4, 3, 1, 2, 3, 4, 5, 5, 6, 3, 4, 5, 5, 5, 6, 6, 7, 7, 8].length)
        efficientSchool.advance()
        expect(efficientSchool.state.reduce(sum)).to.equal([2, 3, 2, 0, 1, 2, 3, 4, 4, 5, 2, 3, 4, 4, 4, 5, 5, 6, 6, 7].length)
        efficientSchool.advance()
        expect(efficientSchool.state.reduce(sum)).to.equal([1, 2, 1, 6, 0, 1, 2, 3, 3, 4, 1, 2, 3, 3, 3, 4, 4, 5, 5, 6, 8].length)
        efficientSchool.advance()
        expect(efficientSchool.state.reduce(sum)).to.equal([0, 1, 0, 5, 6, 0, 1, 2, 2, 3, 0, 1, 2, 2, 2, 3, 3, 4, 4, 5, 7, 8].length)
        efficientSchool.advance()
        expect(efficientSchool.state.reduce(sum)).to.equal([6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 0, 1, 1, 1, 2, 2, 3, 3, 4, 6, 7, 8, 8, 8, 8].length)
      })
      it('advances efficiently for a large number of days', () => {
        efficientSchool.state = [3, 4, 3, 1, 2]
        for (let d = 1; d <= 256; d++) {
          efficientSchool.advance()
        }
        const sum = (x, y) => x + y
        efficientSchool.state.reduce(sum)
      })
    })
  })
})
