const claims = require('./claims')
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const inputParser = require('../inputParser')

fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
  if (err) throw err

  const claimsList = inputParser.linesToArray(data)
  claimsList.forEach((claim) => claims.makeClaim(claims.parseClaim(claim)))
  const answer = claims.countConflicts()
  const answer2 = claims.findNonOverlappingClaims()
  console.log('-- Part 1 --')
  console.log(`Answer: ${answer}`)
  console.log('-- Part 2 --')
  console.log(`Answer: ${answer2}`)
})
