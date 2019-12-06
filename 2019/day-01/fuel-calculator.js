const calculateFuel = (mass) => {
  return Math.max(
    0,
    Math.floor(mass / 3) - 2
  )
}

const sumMassWithFuel = (mass) => {
  const fuel = calculateFuel(mass)
  if (fuel <= 0) {
    return mass
  }

  return mass + sumMassWithFuel(fuel)
}

const calculateFuelRecursively = (mass) => {
  // For fuel calcs, exclude initial mass
  return sumMassWithFuel(mass) - mass
}

module.exports = {
  calculateFuel,
  calculateFuelRecursively
}
