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

const terminate = ({ instructionPointer }) => {
  console.log(`Reached terminator at instructionPointer ${instructionPointer}. Stopping.`)
  return false
}

const step = ({ instructionPointer, data }) => {
  console.debug(`Step: ${instructionPointer}`)
  const opCodesMap = {
    1: add,
    2: multiply,
    99: terminate
  }
  const instruction = data.slice(instructionPointer, instructionPointer + 4)
  const opcode = instruction[0]

  // Run the correct opcode for the specified step
  return opCodesMap[opcode]({
    posIn1: instruction[1],
    posIn2: instruction[2],
    posOut: instruction[3],
    data,
    instructionPointer
  })
}

const runProgram = ({ data }) => {
  let instructionPointer = 0
  let running = true

  // Convert to BigInts because operations will exceed 53bit integers
  // TODO: Standard chokes on this ES2020 feature. Remove eslint-disable
  // once fixed.
  // See https://github.com/standard/standard/issues/1436
  // eslint-disable-next-line no-undef
  data.forEach((key, idx) => { data[idx] = BigInt(key) })

  while (running === true && instructionPointer <= data.length) {
    const instructionLength = 4
    running = step({ instructionPointer, data })
    instructionPointer += instructionLength
  }
}

module.exports = {
  step,
  runProgram
}
