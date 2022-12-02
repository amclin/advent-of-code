/**
 * Takes the provided list of items and breaks
 * it up into the list of individual elves with
 * the items they carry
 * @param {string} data List of items split by lines
 * @returns array List of elves' payloads
 */
const parseCalorieData = (data) => {
  const pattern = /\r?\n/g
  let results = data.replace(pattern, ',') // switch to commas to avoid OS newline character discrepancies
  results = results.split(',,') // double commas indicate where one elf stops and the next starts
  const parseElf = (elfData) => {
    return elfData.split(',') // each elf can carry a varying number of items
      .map((cal) => parseInt(cal)) // make sure we're working with numbers
  }
  return results.map(parseElf)
}

const findElfWithMost = (data) => {
  return sortElvesByCalories(data)[0] // Sort for the elf with the most calories
}

const sortElvesByCalories = (data) => {
  const sum = (a, b) => { return a + b }
  const compare = (a, b) => {
    // compare sums of array values for sum-based sorting
    return b.reduce(
      sum, 0
    ) - a.reduce(
      sum, 0
    )
  }
  data.sort(compare)
  return data
}

module.exports = {
  findElfWithMost,
  parseCalorieData,
  sortElvesByCalories
}
