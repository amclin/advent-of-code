const chronalCalibrator = require('./chronalCalibrator')
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../input.txt')

fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
  if (err) throw err
  const answer = chronalCalibrator(data)
  console.log(`Answer: ${answer}`)
})
