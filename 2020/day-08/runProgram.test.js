/* eslint-env mocha */
const { expect } = require('chai')
const { run, parseCommand, logEvent, displayLog } = require('./runProgram')

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
    // xdescribe('execInstruction()', () => {
    //   it('executes a specified command', () => {
    //     execInstruction()
    //     expect(false).to.equal(true)
    //   })
    //   it('steps to the next sequential command', () => {
    //     logEvent()
    //     expect(false).to.equal(true)
    //   })
    //   it('can execute a `nop` command which does nothing', () => {
    //     execInstruction('nop')
    //     expect(false).to.equal(true)
    //   })
    //   it('can execute a `acc` command which increments the accumulator', () => {
    //     execInstruction('acc')
    //     expect(false).to.equal(true)
    //   })
    //   it('can execute a `jmp` command which jumps to a different command in the instruction set', () => {
    //     execInstruction('jmp')
    //     expect(false).to.equal(true)
    //   })
    // })
    describe('parseCommand()', () => {
      it('parses an instruction string into a structured command object', () => {
        const instructions = [
          'jmp +4',
          'acc +3',
          'jmp -3',
          'acc -99'
        ]
        instructions.forEach((inst) => {
          const { cmd, arg } = parseCommand(inst)
          expect(`${cmd} ${arg}`).to.equal(inst)
        })
      })
    })
    describe('logEvent()', () => {
      it('records the step in the execution log', () => {
        const result = logEvent({ instKey: 500, evKey: 17 })
        expect(result).to.deep.equal([17])
      })
      it('tracks the state over multiple logging events', () => {
        const result = logEvent({ instKey: 500, evKey: 24 })
        expect(result).to.deep.equal([17, 24])
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
