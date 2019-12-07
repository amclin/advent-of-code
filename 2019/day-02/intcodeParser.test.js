/* eslint-env mocha */
const expect = require('chai').expect
const { step, runProgram } = require('./intcodeParser')

describe('--- 2019 Day 2: 1202 Program Alarm ---', () => {
  describe('Part 1', () => {
    describe('intcodeParser', () => {
      describe('step()', () => {
        it('can add', () => {
          const oppcode = 1
          const data = [oppcode, 5, 6, 3, 99, 2, 3]
          step({ instructionPointer: 0, data })
          expect(data[3]).equals(5)
        })
        it('can multiply', () => {
          const oppcode = 2
          const data = [oppcode, 5, 6, 3, 99, 2, 3]
          step({ instructionPointer: 0, data })
          expect(data[3]).equals(6)
        })
        it('can terminate', () => {
          const oppcode = 99
          const data = [oppcode, 5, 6, 3, 99, 2, 3]
          step({ instructionPointer: 0, data })
          expect(data[3]).equals(3)
        })
      })
    })
    describe('runProgram()', () => {
      it('runs through sequential steps of an intCode program', () => {
        const testInputs = [
          [1, 0, 0, 0, 99],
          [2, 3, 0, 3, 99],
          [2, 4, 4, 5, 99, 0],
          [1, 1, 1, 4, 99, 5, 6, 0, 99]
        ]
        const testOutputs = [
          [2, 0, 0, 0, 99],
          [2, 3, 0, 6, 99],
          [2, 4, 4, 5, 99, 9801],
          [30, 1, 1, 4, 2, 5, 6, 0, 99]
        ]
        // Convert outputs to BigInts
        testOutputs.forEach((out, idx) => {
          out.forEach((value, idx2) => {
            // TODO: Standard chokes on this ES2020 feature. Remove eslint-disable
            // once fixed.
            // See https://github.com/standard/standard/issues/1436
            // eslint-disable-next-line no-undef
            testOutputs[idx][idx2] = BigInt(value)
          })
        })

        testInputs.forEach((data, idx) => {
          runProgram({ data })
          expect(data).to.deep.equal(testOutputs[idx])
        })
      })
    })
  })
})
