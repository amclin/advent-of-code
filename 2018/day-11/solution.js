const { Rack } = require('./fuel-cells')
const serial = 1133 // From puzzle input

let powerBank = new Rack(serial)

console.log(powerBank)
