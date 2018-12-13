const chronalCalibrator = require('./chronalCalibrator')
const fs = require('fs')

fs.readFile('input.txt', (err, data) => {
  if (err) throw err
  let answer = chronalCalibrator(data)
  console.log(`Answer: ${answer}`)
})
