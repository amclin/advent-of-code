const console = require('../helpers')

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

const countInner = (rules, color, count = 1) => {
  // const children = {}
  /** checks if rule matches color */
  const matchesColor = ({ outer }) => outer === color
  /** checks if rule has child bags */
  const hasChildren = ({ inner }) => (inner) && inner.length > 0

  const getChildrenBags = ({ inner }, multiplier = 1) => {
    const res = {}
    // Convert into structured list
    inner.forEach(({ color, count }) => {
      res[color] = count * multiplier
    })
    return res
  }
  /** type-safe addition */
  const add = (a, b) => {
    a = (typeof a === 'number') ? a : 0
    b = (typeof b === 'number') ? b : 0
    return a + b
  }
  /** combine two objects using the specified operator method for collsions */
  const combineObjects = (a = {}, b = {}, operator) => {
    const c = {}
    // check for collisions between fields across the objects and run operator() on them
    for (const [key, value] of Object.entries(b)) {
      c[key] = operator(a[key], value)
    }
    return Object.assign({}, a, c) // b not needed because covered in collision resolver
  }

  console.debug('matching', color)

  // Loop through the rules to find first level children
  return rules
    .filter(matchesColor) // find all matches for the color
    .filter(hasChildren) // filter for matches that have children
    .map(rule => getChildrenBags(rule, count)) // get the counts from the children
    .reduce((res, children) => {
      // Add everything back together
      const childrensChildren = Object.entries(children)
        .map(([key, value]) => countInner(rules, key, value))
        .reduce((r, c) => combineObjects(r, c, add), {})

      res = combineObjects(res, children, add)
      res = combineObjects(res, childrensChildren, add)

      return res
    }, {})
}

module.exports = {
  parseRule,
  findAllowedOuter,
  countInner
}
