const pairs = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}

const lintLine = (line) => {
  let expected = ''
  let pos = 0
  while (pos < line.length) {
    const char = line[pos]

    // if opening bracket, add mate to the start of expected list
    if (pairs[char]) {
      expected += pairs[char]
    } else { // if closing bracket
      // if expected closing, clear from the expected list
      if (expected[expected.length - 1] === char) {
        expected = expected.slice(0, -1)
      } else { // otherwise, found an error to report
        return {
          char: pos,
          expected: expected[expected.length - 1],
          found: char
        }
      }
    }

    pos++
  }

  // if we run out of line, ignore per instructions for Step 1
  if (expected.length > 0) {
    // TODO - add the reporting when we need it in Step 2?
  }
}

const lintAll = (instructions) => {
  const errors = instructions.map(lintLine) // lint each line
    .map((error, idx) => {
      return { ...error, line: idx }
    }).filter((report) => !!(report.char)) // remove lines without errors

  console.log(`Linting found ${errors.length} errors in ${instructions.length} lines.`)
  console.debug(instructions)
  console.debug(errors)

  return errors
}

module.exports = {
  lintLine,
  lintAll
}
