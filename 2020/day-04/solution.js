const DEBUG = false;
const fs = require('fs')
const path = require('path')
const split2 = require('split2')
const filePath = path.join(__dirname, 'input.txt')
const { parseScan, validate } = require('./passports')

const answers = []

const part1 = () => {
  let recordBuffer = ''
  let validCount = 0
  let invalidCount = 0
  let totalCount = 0

  const processBuffer = () => {
    // Handle the record in the buffer
    const passport = parseScan(recordBuffer)
    try {
      if (validate(passport)) {
        validCount++
      }
    } catch (e) {
      invalidCount++
      if (DEBUG) {
        console.warn(e.message)
        console.debug('Invalid passport', passport)
      }
    }
    totalCount++
  }

  fs.createReadStream(filePath)
    .pipe(split2())
    .on('data', (data) => {
      // Emmpty line indicates record separator
      if (data.trim() === '') {
        processBuffer()
        // flush buffer
        recordBuffer = ''
        return
      }
      // Add the line to the buffer
      recordBuffer += data.trim() + '\n'
    })
    .on('end', () => {
      // get the final record from the buffer
      processBuffer()
      console.info('Total passports found:', totalCount)
      console.info('Invalid passports', invalidCount)
      answers.push(validCount)
      answers.push(part2())

      answers.forEach((ans, idx) => {
        console.info(`-- Part ${idx + 1} --`)
        console.info(`Answer: ${ans}`)
      })
    })

  console.debug('Invalid passports:', invalidCount)
  return validCount
}

const part2 = () => {
  return 'No answer yet'
}

part1()
