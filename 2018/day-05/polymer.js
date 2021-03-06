/**
 * Switches the case of a string
 * @param {String} input Mixed case string to switch
 */
const toggleCase = (input) => {
  if (input.toUpperCase() === input) {
    return input.toLowerCase()
  }
  return input.toUpperCase()
}

/**
 * Recursively removes case-opposite pairs
 * @param {String} input Polymer chain
 */
const reducePolymer = (input) => {
  const polymer = input.trim().split('')

  polymer.forEach((char, idx) => {
    if (toggleCase(char) === polymer[idx - 1]) {
      // console.log(`Removing ${toggleCase(char)}${char}`)
      polymer.splice(idx - 1, 2)
    }
  })

  // Loop recursively until there's no remaining case pairs
  if (polymer.length === input.length) {
    return input
  } else {
    return reducePolymer(polymer.join(''))
  }
}

/**
 * Removes problem character and match from string
 * @param {String} char letter to find and remove
 * @param {String} char polymer to parse
 * @returns {String}
 */
const cleanProblemUnits = (char, polymer) => {
  const pattern = new RegExp('[' + char + ',' + toggleCase(char) + ']', 'g')
  return polymer.replace(pattern, '')
}

module.exports = {
  cleanProblemUnits,
  reducePolymer
}
