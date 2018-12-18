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
 * Steps through the provided dependency tree, tallying up the total time to execute the instructions
 * @param {*} tree Dependency tree
 * @param {*} workers Number of workers available for parallel tasks
 * @param {*} minDuration Minimum time it takes for each step A = min+1, B = min+2, etc.
 */
const executeInstructions = (tree, workers, minDuration) => {
  tree = JSON.parse(JSON.stringify(tree)) // deep copy
  // Tracker for state of workers and when they're available
  let workerStates = []
  for (let x = 0; x < workers; x++) {
    workerStates.push({
      state: 'free',
      availableIn: 0
    })
  }

  // Helper methods
  const isFree = (w) => w.state === 'free'
  const isActive = (w) => w.state !== 'free'
  const getAssignedTasks = () => workerStates.filter(isActive).map((w) => w.state)

  let elapsed = 0 // Timer
  let pending = _instructionIds // Tasks not started or incomplete
  let completed = [] // Tasks completed
  let assigned = getAssignedTasks() // Tasks currently being processed
  while (pending.length > 0 || assigned.length > 0) { // Loop through until tree is exhausted and all workers done
    // Free up any workers from the last cycle
    workerStates = workerStates.map((w) => {
      // subtract a second from the time until next available. Don't go negative
      w.availableIn = Math.max(w.availableIn - 1, 0)
      // Process any completed tasks
      if (isActive(w) && w.availableIn === 0) {
        completed.push(w.state)
        pending.splice(pending.indexOf(w.state), 1)
        delete tree[w.state]
        w.state = 'free'
      }
      return w
    })
    assigned = getAssignedTasks()

    const areAssigned = (startable, assignments) => {
      startable = (typeof startable === 'object') ? startable : [startable]

      if (!assignments || assignments.length < 1) {
        return false // no assignments
      }
      if (assignments.length < startable.length) {
        return false // not all startables are assigned
      }
      let assigned = true
      startable.forEach((el) => {
        assigned = (assignments.indexOf(el) < 0) ? false : assigned
      })
      return assigned
    }

    let startable = findHasNoDependencies(tree, pending)
    let activeWorkers = workerStates.filter(isActive).length
    let workersAreAvailable = (activeWorkers < workers)
    let tasksAreAssigned = areAssigned(startable, assigned)
    while (startable.length > 0 && workersAreAvailable && !tasksAreAssigned) { // Allow multiple tasks assigned at once
      if (areAssigned([startable[0]], assigned)) {
        // task is already assigned to a worker
        startable.shift()
      } else {
        // Assign the task to the first available worker
        let id = workerStates.indexOf(workerStates.find(isFree))
        workerStates[id].state = startable.shift()
        workerStates[id].availableIn = minDuration + workerStates[id].state.charCodeAt(0) - 64 // A is ASCII 65
      }

      assigned = getAssignedTasks()
      activeWorkers = workerStates.filter(isActive).length
      workersAreAvailable = (activeWorkers < workers)
      tasksAreAssigned = areAssigned(startable, assigned)
    }

    // Something is wrong with the second, debug
    if (activeWorkers < workers && startable.length > assigned.length) {
      console.log('.................................')
      console.log(`second: ${elapsed}`)
      console.log(`steps pending: ${pending}`)
      console.log(`steps assigned: ${assigned}`)
      console.log(`steps startable: ${startable}`)
      console.log(`active workers: ${activeWorkers}`)
      console.log(`completed: ${completed.join('')}`)
      console.log('.................................')
    }

    // Advance to the next second
    elapsed++
  }

  return elapsed - 1 // drop last second because complete
}

/**
 * Sorts through a dependency tree to find any IDs with no dependencies
 * @param {Object} dependencies structured dependency tree
 * @param {Array} pending list of known pending tasks (optional, uses _instructionIds when not provided)
 * @returns {Array} An alphabetically sorted list of IDs with no dependencies
 */
const findHasNoDependencies = (dependencies, pending) => {
  pending = pending || _instructionIds
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
  let startable = pending.filter((id) => ids.indexOf(id) < 0)

  // console.log(`${startable} have no dependencies so are safe to start`)

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
  executeInstructions,
  findHasNoDependencies,
  flushStates,
  getDependencies,
  getInstructionIds,
  parseEntry,
  sortInstructions,
  storeData
}
