const alphabet = [...'abcdefghijklmnopqrstuvwxyz']

/**
 * Counts which questions were answered by
 * at least one passenger in the group.
 * Multiple people answering doesn't matter.
 */
const groupChecksumAnyone = (answers) => {
  return alphabet.reduce((sum, ltr) => {
    if (String(answers).includes(ltr)) { sum++ }
    return sum
  }, 0)
}

/**
 * Counts which questions were answered by
 * all passengers in the group.
 */
const groupChecksumEveryone = (answers) => {
  const results = Object.assign({}, ...alphabet.map(key => ({ [key]: 0 })))
  const people = answers.trim().split(/[\n\r]+/)
  people.forEach((person) => {
    alphabet.forEach((ltr) => {
      if (String(person).includes(ltr)) { results[ltr]++ }
    })
  })
  // tally the questions where everyone answered
  return Object.keys(results)
    .filter((res) => results[res] === people.length)
    .length
}

module.exports = {
  groupChecksum: groupChecksumAnyone,
  groupChecksumEveryone
}
