/**
 * Splits a password record into its component parts
 */
const splitRecord = (row) => {
  const record = row.split(': ')
    .map((el) => el.trim())

  return {
    rule: record[0],
    password: record[1]
  }
}

/**
 * Splits a password validation rule into its component parts
 * using the original rules
 */
const oldSplitRule = (rule) => {
  const splitRow = rule.split(/-| /)

  return {
    min: Number(splitRow[0]),
    max: Number(splitRow[1]),
    char: String(splitRow[2])
  }
}

/**
 * Splits a password validation rule into its component parts
 * using the new rules
 */
const newSplitRule = (rule) => {
  const splitRow = rule.split(/-| /)

  return {
    positions: [
      Number(splitRow[0]),
      Number(splitRow[1])
    ],
    char: String(splitRow[2])
  }
}

/**
 * Validates a password against the specified rule
 * using the original rules
 */
const oldIsValidPassword = (rule, password) => {
  // count how many times `rule.char` exists in `password`
  const count = (
    password.match(
      new RegExp(rule.char, 'g')
    ) || []
  ).length
  // check the conditions
  if (count < rule.min) return false
  if (count > rule.max) return false
  return true
}

/**
 * Validates a password against the specified rule
 * using the new rules
 */
const newIsValidPassword = (rule, password) => {
  let matches = 0
  rule.positions.forEach((pos) => {
    // index starts with 1
    if (password[pos - 1] === rule.char) {
      matches++
    }
  })
  // Only one match allowed, not 2, not 0
  return (matches === 1)
}

const oldIsValidRecord = (record) => {
  const { rule, password } = splitRecord(record)
  const parsedRule = oldSplitRule(rule)
  return oldIsValidPassword(parsedRule, password)
}

const newIsValidRecord = (record) => {
  const { rule, password } = splitRecord(record)
  const parsedRule = newSplitRule(rule)
  return newIsValidPassword(parsedRule, password)
}

module.exports = {
  old: {
    splitRule: oldSplitRule,
    isValidPassword: oldIsValidPassword,
    isValidRecord: oldIsValidRecord
  },
  cur: {
    splitRule: newSplitRule,
    isValidPassword: newIsValidPassword,
    isValidRecord: newIsValidRecord
  },
  splitRecord
}
