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
  isValid
}
