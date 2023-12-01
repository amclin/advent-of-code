let _fishes = []
const NewFishAge = 8 // age of newly spawned fish
const FishSpawnAge = 0 // age when the fish spawns
const ResetFishAge = 6 // age of the original fish after spawning

// allocate an empty big school
const _newBigSchool = () => [...new Array(NewFishAge + 1)].map(() => 0)
let _bigSchool = _newBigSchool()

const ageFish = (age) => {
  if (age > NewFishAge) { throw new Error('Fish is too young') }
  if (age < FishSpawnAge) { throw new Error('Fish is too old') }
  if (age === FishSpawnAge) { return ResetFishAge }
  return age - 1
}

const spawn = (qty) => {
  console.debug(`spawning ${qty} fish`)
  const newFishes = [...new Array(qty)].map(() => NewFishAge)
  _fishes.push(...newFishes)
}

const efficientSpawn = (qty) => {
  console.debug(`spawning ${qty} fish`)
  _bigSchool[NewFishAge] = qty
}

const school = {
  get state () {
    return _fishes
  },
  set state (state) {
    _fishes = state
  },

  advance: () => {
    // Calculate how many will spawn
    const toSpawn = _fishes.filter((x) => x === FishSpawnAge).length
    // Iterate each fish
    _fishes = _fishes.map(ageFish)
    // Spawn the new fish
    spawn(toSpawn)
  }
}

/**
 * The efficient school doesn't track the position of the fish.
 * It only cares about the total number of fish of each age
 */
const efficientSchool = {
  get state () {
    return _bigSchool
  },
  set state (state) {
    _bigSchool = _newBigSchool()
    state.forEach((fish) => { _bigSchool[fish]++ })
  },
  advance: () => {
    // Calculate how many will spawn (age 0) and shift the age groups in one quick step
    const toSpawn = _bigSchool.shift()
    // Iterate old fish back to young since they're spawning
    _bigSchool[ResetFishAge] += toSpawn
    // Spawn the new fish
    efficientSpawn(toSpawn)
  }
}

module.exports = {
  school,
  efficientSchool,
  ageFish,
  spawn,
  efficientSpawn
}
