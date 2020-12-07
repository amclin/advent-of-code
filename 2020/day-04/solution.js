const DEBUG = true
const fs = require('fs')
const path = require('path')
const split2 = require('split2')
const filePath = path.join(__dirname, 'input.txt')
const { parseScan, validate } = require('./passports')

const answers = []

const scanPassports = () => {
  let recordBuffer = ''
  let validCount = 0
  let validWithFieldsCount = 0
  let invalidCount = 0
  let totalCount = 0

  const processBuffer = () => {
    // Handle the record in the buffer
    const passport = parseScan(recordBuffer)
    try {
      if (validate(passport, false)) {
        validCount++
      }
      if (validate(passport)) {
        validWithFieldsCount++
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
      answers.push(validWithFieldsCount)

      answers.forEach((ans, idx) => {
        console.info(`-- Part ${idx + 1} --`)
        console.info(`Answer: ${ans}`)
      })
    })

  console.debug('Invalid passports:', invalidCount)
  return validCount
}

scanPassports()
