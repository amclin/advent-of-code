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
 */
const splitRule = (rule) => {
  const splitRow = rule.split(/-| /)

  return {
    min: Number(splitRow[0]),
    max: Number(splitRow[1]),
    char: String(splitRow[2])
  }
}

/**
 * Validates a password against the specified rule
 */
const isValidPassword = (rule, password) => {
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

const isValidRecord = (record) => {
  const { rule, password } = splitRecord(record)
  const { min, max, char } = splitRule(rule)
  return isValidPassword({ min, max, char }, password)
}

module.exports = {
  splitRecord,
  splitRule,
  isValidRecord,
  isValidPassword
}
