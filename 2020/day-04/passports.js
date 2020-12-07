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

const rules = {
  byr: (byr) => {
    // byr (Birth Year) - four digits; at least 1920 and at most 2002
    return (
      String(byr).length === 4 &&
      Number(byr) >= 1920 &&
      Number(byr) <= 2002
    )
  },
  iyr: (iyr) => {
    // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    return (
      String(iyr).length === 4 &&
      Number(iyr) >= 2010 &&
      Number(iyr) <= 2020
    )
  },
  eyr: (eyr) => {
    // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    return (
      String(eyr).length === 4 &&
      Number(eyr) >= 2020 &&
      Number(eyr) <= 2030
    )
  },
  hgt: (hgt) => {
    // hgt (Height) - a number followed by either cm or in:
    //     If cm, the number must be at least 150 and at most 193.
    //     If in, the number must be at least 59 and at most 76.
    const unit = hgt.slice(hgt.length - 2)
    const value = hgt.slice(0, hgt.length - 2)
    return (
      (
        unit === 'cm' &&
        value >= 150 &&
        value <= 193
      ) || (
        unit === 'in' &&
        value >= 59 &&
        value <= 76
      )
    )
  },
  hcl: (hcl) => {
    // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    const regexp = /^#[0-9a-fA-F]+$/ // hex color
    return (
      regexp.test(hcl) &&
      hcl.length === 7
    )
  },
  ecl: (ecl) => {
    // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    const allowed = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
    return allowed.includes(ecl)
  },
  pid: (pid) => {
    // pid (Passport ID) - a nine-digit number, including leading zeroes.
    return (
      String(pid).length === 9 &&
      Number(pid) > 0
    )
  },
  cid: (cid) => {
    // cid (Country ID) - ignored, missing or not.
    return true
  }
}

const validate = (passport, checkFields = true) => {
  const fieldsToCheck = JSON.parse(JSON.stringify(requiredFields)) // quick deep copy
  // polar records don't have cid, but are otherwise valid
  if (getType(passport) === 'polar') {
    delete fieldsToCheck.splice([fieldsToCheck.indexOf('cid')], 1)
  }
  // Check for fields
  fieldsToCheck.forEach((field) => {
    // Check for required vield
    if (!passport[field]) {
      throw new Error(`Missing field ${field}`)
    }
    // Skip field validation when disabled
    if (!checkFields) {
      return
    }
    // Validate field against rules
    if (
      !rules[field](
        passport[field]
      )
    ) {
      throw new Error(`Invalid field value ${field}:${passport[field]}`)
    }
  })
  return true
}

module.exports = {
  parseScan,
  validate
}
