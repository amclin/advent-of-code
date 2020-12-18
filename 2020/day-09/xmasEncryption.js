const findInvalid = (data, preambleSize) => {
  let match = true
  let counter = preambleSize

  while (match === true && counter < data.length) {
    console.debug(`Looking for mismatch ${data[counter]} in:`)
    console.debug(data.slice(counter - preambleSize, counter))
    console.debug('-----------------------------------------')
    match = isValid(
      data[counter],
      data.slice(counter - preambleSize, counter)
    )
    if (!match) {
      console.debug(`${data[counter]} doesn't match.`)
      return data[counter]
    }
    counter++
  }

  throw new Error('No invalid values found')
}

const isValid = (value, preamble) => {
  let valid = false

  // Search for a combination of 2 entries that add up to `value`
  preamble.forEach((outer) => {
    preamble.forEach((inner) => {
      // match cannot use the same number twice
      if (outer !== inner && outer + inner === value) {
        console.debug(`Found matches ${outer} + ${inner} = ${value}`)
        valid = true
      }
    })
  })

  return valid
}

module.exports = {
  findInvalid,
  isValid
}
