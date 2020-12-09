/* eslint-env mocha */
const { expect } = require('chai')
const { run, executeStep, logStep, displayLog } = require('./runProgram')

xdescribe('--- Day 8: Handheld Halting ---', () => {
  describe('Part 1', () => {
    describe('run()', () => {
      it('executes the steps of a given program', () => {
        run()
        expect(false).to.equal(true)
      })
    })
    describe('executeStep()', () => {
      it('executes a specified command', () => {
        executeStep()
        expect(false).to.equal(true)
      })
      it('steps to the next sequential command', () => {
        logStep()
        expect(false).to.equal(true)
      })
      it('can execute a `nop` command which does nothing', () => {
        executeStep('nop')
        expect(false).to.equal(true)
      })
      it('can execute a `acc` command which increments the accumulator', () => {
        executeStep('acc')
        expect(false).to.equal(true)
      })
      it('can execute a `jmp` command which jumps to a different command in the instruction set', () => {
        executeStep('jmp')
        expect(false).to.equal(true)
      })
    })
    describe('logStep()', () => {
      it('records the step in the execution log', () => {
        logStep()
        expect(false).to.equal(true)
      })
    })
    describe('displayLog()', () => {
      it('renders the output of the execution log', () => {
        displayLog()
        expect(false).to.equal(true)
      })
    })
  })
})
