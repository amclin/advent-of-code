const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { reducePolymer, cleanProblemUnits } = require('./polymer')

fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
  if (err) throw err

  data = data.trim()

  const answer = reducePolymer(data).length

  // Try removing each potential problem pair, and see which gets to the smallest polymer
  let answer2 = answer
  for (let i = 65; i < 91; i++) { // ASCII charset 65 = A, 91 = Z
    answer2 = Math.min(
      answer2,
      reducePolymer(
        cleanProblemUnits(
          String.fromCharCode(i)
          , data)
      ).length
    )
  }

  console.log('-- Part 1 --')
  console.log(`Answer: ${answer}`)
  console.log('-- Part 2 --')
  console.log(`Answer: ${answer2}`)
})
