const _dependencies = {} // Data store for structured dependency tree

/**
 * Adds an entry to the dependency tree
 * @param {Object} rule Instruction dependency rule
 */
const addDependency = (rule) => {
  if (!_dependencies[rule.dep]) {
    _dependencies[rule.dep] = {
      ids: [rule.id]
    }
  } else {
    _dependencies[rule.dep].ids.push(rule.id)
    _dependencies[rule.dep].ids = _dependencies[rule.dep].ids.sort() // Alphabetical for tie-breaking rule
  }

  return _dependencies
}

/**
 * Get the stored dependency object
 */
const getDependencies = () => {
  return _dependencies
}

/**
 * Parse the string into addressable data. Suitable for use in Array.prototype.map()
 * @param {String} line from log file
 * @param {Number} idx index of line in array
 * @param {Array} arr read-only array provided by .map()
 * @returns {Object} structured data
 */
const parseEntry = (line, idx, arr) => {
  let data = line.split(' ')
  return {
    id: data[7],
    dep: data[1]
  }
}

/**
 * Calculates the necessary order of entries based on their hierarchy
 * @param {Array} entries List of instructions
 * @returns {Array} sorted list
 */
const sortInstructions = (entries) => {
  let sorted = ''

  entries.forEach((rule) => {
    addDependency(rule)
    // The first will be a letter with no dependencies
    // find it by populating a list of unique dependencies
    // if(instructions.indexOf(rule.dep))
  })

  console.log(_dependencies)

  return sorted
}

module.exports = {
  getDependencies,
  parseEntry,
  sortInstructions
}
