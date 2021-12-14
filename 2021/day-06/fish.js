
let _fishes = []
const NewFishAge = 8 // age of newly spawned fish
const FishSpawnAge = 0 // age when the fish spawns
const ResetFishAge = 6 // age of the original fish after spawning

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

module.exports = {
  school,
  ageFish,
  spawn
}
