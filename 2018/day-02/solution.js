const boxes = require('./boxes')
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')

fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
  if (err) throw err
  let answer = boxes.getChecksum(data)
  console.log(`-- Part 1 --`)
  console.log(`Answer: ${answer}`)

  let ids = boxes.getListFromData(data)
  let similar = boxes.findSimilarIDs(ids)
  let answer2 = boxes.getCommonLetters(similar[0], similar[1])
  console.log(`-- Part 2 --`)
  console.log(`Answer: ${answer2}`)
})
