
const add = ({ posIn1, posIn2, posOut, data }) => {
  data[posOut] = data[posIn1] + data[posIn2]
}

const multiply = ({ posIn1, posIn2, posOut, data }) => {
  data[posOut] = data[posIn1] * data[posIn2]
}

const terminate = ({ data }) => {
  console.log('Reached terminator. Stopping.')
}

const step = ({ position, data }) => {
  const opCodesMap = {
    1: add,
    2: multiply,
    99: terminate
  }
  const segment = data.slice(position, position + 4)
  // Run the correct opcode for the specified step
  opCodesMap[data[position]]({
    posIn1: segment[1],
    posIn2: segment[2],
    posOut: segment[3],
    data
  })
}

module.exports = {
  step
}
