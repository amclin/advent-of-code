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

const countInner = (rules, color) => {
  // const children = {}
  /** checks if rule matches color */
  const matchesColor = ({ outer }) => outer === color
  /** checks if an object has keys */
  // const hasKeys = (obj) => (Object.keys(obj).length > 0)
  /** type-safe addition */
  const add = (a, b) => {
    a = (typeof a === 'number') ? a : 0
    b = (typeof b === 'number') ? b : 0
    return a + b
  }
  /** type-safe multiplication */
  const multiply = (a, b) => {
    a = (typeof a === 'number') ? a : 1
    b = (typeof b === 'number') ? b : 1
    return a * b
  }
  /** multiply all keys in an object by a value */
  const multiplyObjKeys = (object, value) => {
    for (const key in object) {
      object[key] = multiply(object[key], value)
    }
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
  const children = rules.filter(matchesColor) // find all matches for the color
    .filter(({ inner }) => (inner) && inner.length > 0) // filter for matches that have children
    .map(({ inner }) => {
      const res = {}
      // Convert into structured list
      inner.forEach(({ color, count }) => {
        res[color] = count
      })
      return res
    })
    .reduce((res, match) => {
      return combineObjects(res, match, add)
    }, {})

  console.debug('First level match found', children)
  console.debug(`check the children of ${Object.keys(children).length} immediate child bags recursively`)
  // Take the list immediate children, and recursively tally the children in each
  const childResults = Object.entries(children)
    .map(([color, count]) => {
      // find the child's children
      const childChildren = countInner(rules, color)
      // multilply each of the child's children by the child amount
      multiplyObjKeys(childChildren, count)
      return childChildren
    })
    // .filter(hasKeys) // Drop empties
    .reduce((res, matches, idx) => {
      console.debug(matches)
      console.debug(
        '----------------------\n',
        `${idx}: child result ${color}:`, '\n',
        combineObjects(res, matches, add), '\n',
        '----------------------\n'
      )
      return combineObjects(res, matches, add)
    }, {})

  console.debug(
    '---------------------\n',
    'results with children\n',
    'children:', children, '\n',
    'childResults:', childResults, '\n',
    'combined:',
    combineObjects(children, childResults, multiply), '\n',
    '---------------------\n\n'
  )

  // Multiply the child results with the current level
  return combineObjects(children, childResults, multiply)
}

module.exports = {
  parseRule,
  findAllowedOuter,
  countInner
}
