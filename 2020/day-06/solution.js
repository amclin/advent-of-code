const path = require('path')
const { streamHandler } = require('./streamHandler')
const { groupChecksum, groupChecksumEveryone } = require('./questions')

const filePath = path.join(__dirname, 'input.txt')
const answers = []

const results = () => {
  answers.forEach((ans, idx) => {
    console.info(`-- Part ${idx + 1} --`)
    console.info(`Answer: ${ans}`)
  })
}

streamHandler({ filePath, processor: groupChecksum })
  .then(({ checksum }) => {
    console.info('Scanned all passenger answers')
    answers.push(checksum)
  })
  .then(() => {
    return streamHandler({ filePath, processor: groupChecksumEveryone })
  })
  .then(({ checksum }) => {
    console.info('Scanned all passenger answers for everyone answered')
    answers.push(checksum)
  })
  .then(results)
