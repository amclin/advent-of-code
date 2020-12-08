/* eslint-env mocha */
const { expect } = require('chai')
const path = require('path')
// const { groupChecksum } = require('./questions')
const { streamHandler } = require('./streamHandler')

const filePath = path.join(__dirname, 'testData.txt')

describe('--- Day 6: Custom Customs ---', () => {
  describe('Part 1', () => {
    describe('streamHandler()', () => {
      it('parses a stream processing a running checksum', (done) => {
        streamHandler({ filePath })
          .then(({ checksum }) => {
            expect(checksum).to.equal(5)
            done()
          })
      })
      it('accepts a custom function to calculate checksums', (done) => {
        const processor = () => { return 2 }
        streamHandler({ filePath, processor })
          .then(({ checksum }) => {
            expect(checksum).to.equal(5 * 2)
            done()
          })
      })
    })
  })
})
