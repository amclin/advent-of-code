const sum = (x, y) => x + y

const getFuel = (crabs, destination) => {
  return crabs.map((crab) => Math.abs(crab - destination))
    .reduce(sum)
}

const getLeastFuel = (crabs) => {
  const positions = crabs
  let fuel = crabs.length * crabs.length // assume a cluster of crabs super far away is the initial worst case
  positions.forEach((position) => {
    fuel = Math.min(fuel, getFuel(crabs, position))
  })
  return fuel
}

module.exports = {
  getFuel,
  getLeastFuel
}
