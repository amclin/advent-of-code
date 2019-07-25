const boxes = require('./boxes')
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')

fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
  if (err) throw err
  const answer = boxes.getChecksum(data)
  console.log(`-- Part 1 --`)
  console.log(`Answer: ${answer}`)

  const ids = boxes.getListFromData(data)
  const similar = boxes.findSimilarIDs(ids)
  const answer2 = boxes.getCommonLetters(similar[0], similar[1])
  console.log(`-- Part 2 --`)
  console.log(`Answer: ${answer2}`)
})
