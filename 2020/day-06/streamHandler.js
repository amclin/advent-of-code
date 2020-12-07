const fs = require('fs')
const split2 = require('split2')

const defaultProcessor = (data) => {
  console.info('Data chunk:')
  console.debug(data)
  console.info('-----------')
  return 1
}

const streamHandler = ({ filePath, processor = defaultProcessor }) => {
  let checksum = 0
  let buffer = ''

  return new Promise((resolve, reject) => {
    return fs.createReadStream(filePath)
      .pipe(split2())
      .on('data', (data) => {
        // Emmpty line indicates record separator
        if (data.trim() === '') {
          checksum += processor(buffer)
          // flush buffer
          buffer = ''
          return
        }
        // Add the line to the buffer
        buffer += data.trim() + '\n'
      })
      .on('end', (data) => {
        // get the final record from the buffer
        checksum += processor(buffer)
        console.debug('Finished stream. Checksum:', checksum)
        resolve({ checksum })
      })
      .on('error', reject)
  })
}

module.exports = {
  streamHandler
}
