/**
 * Parses the input file into an array
 * @param {String} input data to parse
 */
function inputToArray (input) {
  // convert list into an array of strings split by whitepsace characters or commas
  let list = input.split(/[\s,]+/)
  // drop the empty entries created by extraneous whitespace
  list = list.filter((item) => item !== '')
  return list
}

/**
 * Takes an input string and parses it into an array of integers
 * list can be newline or comma delineated
 * @param {String} input list of values
 */
function parseData (input) {
  // convert into an array of integers
  let list = inputToArray(input)
    .map((item) => {
      return parseInt(item)
    })
  // drop the entries created by whitespace
  list = list.filter((item) => !isNaN(item))
  return list
}

module.exports = {
  inputToArray,
  parseData
}
