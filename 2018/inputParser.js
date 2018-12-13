/**
 * Takes an input string and parses it into an array of integers
 * list can be newline or comma delineated
 * @param {String} input list of values
 */
function parseData (input) {
  // convert into an array of integers
  const dataList = input.split(/[\s,]+/)
    .map((item) => {
      return parseInt(item)
    })
  // drop the entries created by whitespace
  const result = dataList.filter((item) => !isNaN(item))
  return result
}

module.exports = { parseData }
