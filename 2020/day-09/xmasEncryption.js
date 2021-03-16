const arrSum = arr => arr.reduce((a, b) => a + b, 0)

const findWeaknessRange = (data, target) => {
  let counter = 0
  while (counter < data.length) {
    const range = []
    let rangeCounter = counter
    // Tally up the next set of values trying to hit target
    while (arrSum(range) < target && rangeCounter < data.length) {
      range.push(data[rangeCounter])

      if (arrSum(range) === target) {
        console.debug(`Found range totally ${target}`, range)
        return range
      }
      rangeCounter++
    }
    counter++
  }

  throw new Error('No range found matching target')
}

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

  // TODO: Speed this up by breaking out of while() loops instead
  // of forEach
  //
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
  findWeaknessRange,
  isValid
}
