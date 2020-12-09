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
  const isAllowed = (rule) => {
    if (!rule.inner) return false
    return (
      rule.inner.filter((child) => {
        return (
          child.color === color
        )
      }).length > 0
    )
  }

  const allowed = {}

  // Loop through the rules, find all colors this bag is allowed within
  rules.filter(isAllowed).forEach((rule) => {
    allowed[rule.outer] = true
  })

  // Take the list of allowed colors, and find out which they are allowed within
  Object.keys(allowed).forEach((color) => {
    const temp = findAllowedOuter(rules, color)
    if (Object.keys(temp).length > 0) {
      Object.assign(allowed, temp)
    }
  })

  return allowed
}

const countInner = (rules, color) => {
  return {
    [color]: 5
  }
}

module.exports = {
  parseRule,
  findAllowedOuter,
  countInner
}
