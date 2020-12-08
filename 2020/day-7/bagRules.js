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
      const color = inRemainder.join(' ').replace('s.', '')
      return {
        count,
        color
      }
    })
  }

  return result
}

module.exports = {
  parseRule
}
