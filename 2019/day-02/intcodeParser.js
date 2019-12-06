const add = ({ posIn1, posIn2, posOut, data }) => {
  console.debug(`Adding ${data[Number(posIn1)]} to ${data[Number(posIn2)]}`)
  data[posOut] = data[Number(posIn1)] + data[Number(posIn2)]
  return true
}

const multiply = ({ posIn1, posIn2, posOut, data }) => {
  console.debug(`Multiplying ${data[Number(posIn1)]} with ${data[Number(posIn2)]}`)
  data[posOut] = data[Number(posIn1)] * data[Number(posIn2)]
  return true
}

const terminate = ({ position }) => {
  console.log(`Reached terminator at position ${position}. Stopping.`)
  return false
}

const step = ({ position, data }) => {
  console.debug(`Step: ${position}`)
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

  // Convert to BigInts because operations will exceed 53bit integers
  // TODO: Standard chokes on this ES2020 feature. Remove eslint-disable
  // once fixed.
  // See https://github.com/standard/standard/issues/1436
  // eslint-disable-next-line no-undef
  data.forEach((key, idx) => { data[idx] = BigInt(key) })

  while (running === true && position <= data.length) {
    running = step({ position, data })
    position += 4
  }
}

module.exports = {
  step,
  runProgram
}
