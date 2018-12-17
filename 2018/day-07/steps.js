let _dependencies = {} // Data store for structured dependency tree
let _instructionIds = [] // Data store for list of encountered instruction IDs

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
 * Parses a rule for instruction IDs and adds them to the list
 * @param {Object} rule to parse for IDs
 * @returns {Array} current list of Instruction IDs
 */
const addInstructionId = (rule) => {
  if (_instructionIds.indexOf(rule.id) < 0) {
    _instructionIds.push(rule.id)
  }
  if (_instructionIds.indexOf(rule.dep) < 0) {
    _instructionIds.push(rule.dep)
  }
  _instructionIds = _instructionIds.sort()
  return _instructionIds
}

/**
 * Sorts through a dependency tree to find any IDs with no dependencies
 * @param {Object} dependencies structured dependency tree
 * @returns {Array} An alphabetically sorted list of IDs with no dependencies
 */
const findHasNoDependencies = (dependencies) => {
  // The first instruction will be an ID with no dependencies.
  // find it by comparing the list of unique rule IDs, to the keys in the dependency tree.
  // Any ID that isn't in the top level of the dependency tree is one that can be started
  // because it has no dependencies.
  let ids = []
  // Walk the dependency tree to find all unique IDs that have dependencies (parents)
  Object.keys(dependencies).forEach((key) => {
    ids = ids.concat(
      dependencies[key].ids.filter((id) => ids.indexOf(id) < 0)
    ).sort()
  })

  // Filter to IDs with no dependencies
  let startable = _instructionIds.filter((id) => ids.indexOf(id) < 0)

  console.log(`${startable} have no dependencies so are safe to start`)

  return startable.sort() // Alphabetical sorting per requirements
}

const flushStates = () => {
  _dependencies = {}
  _instructionIds = []
}

/**
 * Get the stored dependency object
 */
const getDependencies = () => {
  return _dependencies
}

/**
 * Get the stored list of instruction IDs
 */
const getInstructionIds = () => {
  return _instructionIds
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

const storeData = (entries) => {
  _dependencies = {}
  _instructionIds = []
  entries.forEach((rule) => {
    // build the dependency tree
    addDependency(rule)
    // build a list of instruction IDs
    addInstructionId(rule)
  })
}

/**
 * Calculates the necessary order of entries based on their hierarchy
 * @param {Array} entries List of instructions
 * @returns {Array} sorted list
 */
const sortInstructions = (entries) => {
  let sorted = []

  storeData(entries)
  let tree = JSON.parse(JSON.stringify(_dependencies))

  while (Object.keys(tree).length > 0) {
    // find next step
    let next = findHasNoDependencies(tree)[0]
    sorted.push(next)
    _instructionIds.splice(_instructionIds.indexOf(next), 1)
    // Go through dependency tree and remove the step that's been cleared
    delete tree[next]
  }

  // Any remaining instructions (usually last)
  sorted = sorted.concat(_instructionIds)

  return sorted
}

module.exports = {
  findHasNoDependencies,
  flushStates,
  getDependencies,
  getInstructionIds,
  parseEntry,
  sortInstructions,
  storeData
}
