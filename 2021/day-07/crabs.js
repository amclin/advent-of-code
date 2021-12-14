const sum = (x, y) => x + y

const getFuel = (crabs, destination, exponential = false) => {
  const simpleCalc = (crab) => {
    const distance = Math.abs(crab - destination)
    return distance
  }

  const expoCalc = (crab) => {
    const distance = Math.abs(crab - destination)
    let fuel = 0
    for (let x = 1; x <= distance; x++) {
      fuel += x
    }
    return fuel
  }

  if (exponential) {
    return crabs.map(expoCalc).reduce(sum)
  }
  return crabs.map(simpleCalc).reduce(sum)
}

const getLeastFuel = (crabs, exponential = false) => {
  const positions = JSON.parse(JSON.stringify(crabs)) // Deep copy to ensure we aren't mutating the original data
  let fuel = 100000000 // assume a stupid high fuel count to start
  const highest = positions.sort((a, b) => b - a)[0] // Find the largest position
  for (let x = 0; x <= highest; x++) {
    console.debug(`Checking position ${x}`)
    const proposed = getFuel(crabs, x, exponential)
    console.debug(`Needed fuel would be ${proposed}`)
    fuel = Math.min(fuel, proposed)
  }
  return fuel
}

module.exports = {
  getFuel,
  getLeastFuel
}
