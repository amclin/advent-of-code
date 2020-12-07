const alphabet = [...'abcdefghijklmnopqrstuvwxyz']

/**
 * Counts which questions were answered by
 * at least one passenger in the group.
 * Multiple people answering doesn't matter.
 */
const groupChecksum = (answers) => {
  return alphabet.reduce((sum, ltr) => {
    if (String(answers).includes(ltr)) { sum++ }
    return sum
  }, 0)
}

module.exports = {
  groupChecksum
}
