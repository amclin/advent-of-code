/* eslint-env mocha */
const { expect } = require('chai')
const { run, executeStep, logStep, displayLog } = require('./runProgram')

const exampleLog = `
nop +0  | 1
acc +1  | 2, 8(!)
jmp +4  | 3
acc +3  | 6
jmp -3  | 7
acc -99 | 
acc +1  | 4
jmp -4  | 5
acc +6  | `

describe('--- Day 8: Handheld Halting ---', () => {
  describe('Part 1', () => {
    xdescribe('run()', () => {
      it('executes the steps of a given program', () => {
        run()
        expect(false).to.equal(true)
      })
    })
    xdescribe('executeStep()', () => {
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
    xdescribe('logStep()', () => {
      it('records the step in the execution log', () => {
        logStep()
        expect(false).to.equal(true)
      })
    })
    describe('displayLog()', () => {
      it('renders the output of the execution log', () => {
        expect(
          displayLog()
        ).to.equal(
          exampleLog
        )
      })
    })
  })
})
