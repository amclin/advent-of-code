const calculateFuel = (mass) => {
  return Math.floor(mass / 3) - 2
}

module.exports = {
  calculateFuel
}
