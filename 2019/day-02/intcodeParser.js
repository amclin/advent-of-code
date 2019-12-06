
const add = ({ posIn1, posIn2, posOut, data }) => {
  data[posOut] = data[posIn1] + data[posIn2]
  return true
}

const multiply = ({ posIn1, posIn2, posOut, data }) => {
  data[posOut] = data[posIn1] * data[posIn2]
  return true
}

const terminate = ({ position }) => {
  console.log(`Reached terminator at position ${position}. Stopping.`)
  return false
}

const step = ({ position, data }) => {
  const opCodesMap = {
    1: add,
    2: multiply,
    99: terminate
  }
  const segment = data.slice(position, position + 4)
  // Run the correct opcode for the specified step
  return opCodesMap[data[position]]({
    posIn1: segment[1],
    posIn2: segment[2],
    posOut: segment[3],
    data,
    position
  })
}

const runProgram = ({ data }) => {
  let position = 0
  let running = true
  while (running === true && position <= data.length) {
    running = step({ position, data })
    position += 4
  }
}

module.exports = {
  step,
  runProgram
}
