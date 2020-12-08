const parseRule = (rule) => {
  const result = {}
  // Get the color of the outer bag
  const outRemainder = rule.split(' contain ')
  result.outer = outRemainder.shift().replace('bags', 'bag')
  // Get the color and values of inner bags
  if (outRemainder[0] !== 'no other bags.') {
    result.inner = outRemainder[0].split(', ').map((str) => {
      const inRemainder = str.split(' ')
      const count = Number(inRemainder.shift())
      const color = inRemainder.join(' ')
        .replace('.', '')
        .replace('bags', 'bag')
      return {
        count,
        color
      }
    })
  }

  return result
}

const findAllowedOuter = (rules, color) => {
  const allowed = {}

  // Loop through the rules, find all colors this bag is allowed within
  rules.filter((rule) => {
    // console.debug(rule)
    if (!rule.inner) { return false }
    // match when inners contain the color
    return (
      rule.inner &&
      rule.inner.filter((child) => {
        return (child.color === color)
      }).length > 0
    )
  }).forEach((rule) => {
    allowed[rule.outer] = true
  })

  // Take the list of allowed colors, and find out which they are allowed within
  Object.keys(allowed).forEach((color) => {
    // Recursively loop
    Object.assign(allowed, findAllowedOuter(rules, color))
  })

  return allowed
}

module.exports = {
  parseRule,
  findAllowedOuter
}
