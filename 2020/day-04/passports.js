// Convert a passport scan into a useable object
const parseScan = (scan) => {
  const passport = {}
  scan.trim()
    .split(/\s+/)
    .forEach((field) => {
      const parsed = field.split(':')
      passport[parsed[0]] = parsed[1]
    })
  return passport
}

const getType = (passport) => {
  if (passport.cid) {
    return 'normal'
  }
  return 'polar'
}

const requiredFields = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
  'cid'
]

const validate = (passport) => {
  const fieldsToCheck = JSON.parse(JSON.stringify(requiredFields)) // quick deep copy
  // polar records don't have cid, but are otherwise valid
  if (getType(passport) === 'polar') {
    delete fieldsToCheck.splice([fieldsToCheck.indexOf('cid')], 1)
  }
  // Check for fields
  fieldsToCheck.forEach((field) => {
    if (!passport[field]) {
      throw new Error(`Missing field ${field}`)
    }
  })
  return true
}

module.exports = {
  parseScan,
  validate
}
