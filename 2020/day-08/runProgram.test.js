/* eslint-env mocha */
const { expect } = require('chai')
const { run, getPosition, getAccumulator, execInstruction, parseCommand, logEvent, displayLog } = require('./runProgram')

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
    describe('execInstruction()', () => {
      it('executes a specified command', () => {
        expect(getPosition()).to.equal(1)
        expect(execInstruction('acc +3', 300, 600)).to.equal(301)
        expect(getAccumulator()).to.equal(3)
        expect(getPosition()).to.equal(301)
      })
      xit('steps to the next sequential command', () => {
      //     logEvent()
      //     expect(false).to.equal(true)
      })
      it('can execute a `nop` command which does nothing', () => {
        const acc = getAccumulator()
        expect(execInstruction('nop +3', 999, 600)).to.equal(1000)
        expect(getPosition()).to.equal(1000)
        expect(getAccumulator()).to.equal(acc)
      })
      it('can execute a `acc` command which increments the accumulator', () => {
        const acc = getAccumulator()
        expect(execInstruction('acc +100', 1234, 600)).to.equal(1235)
        expect(getPosition()).to.equal(1235)
        expect(getAccumulator()).to.equal(acc + 100)
      })
      it('can execute a `jmp` command which jumps to a different command in the instruction set', () => {
        const acc = getAccumulator()
        expect(execInstruction('jmp -23', 400, 600)).to.equal(377)
        expect(getPosition()).to.equal(377)
        expect(getAccumulator()).to.equal(acc)
      })
    })
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
