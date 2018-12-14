/**
 * Parses a claim into a usable object
 * @param {String} str formatted claim
 * @returns {Object} Claim object with named properties
 */
const parseClaim = (str) => {
  let claim = {}
  let vals = str.split(' @ ')
  claim.id = vals[0].replace(/#/g, '')
  vals = vals[1].split(',')
  claim.x = vals[0]
  vals = vals[1].split(': ')
  claim.y = vals[0]
  vals = vals[1].split('x')
  claim.width = vals[0]
  claim.height = vals[1]

  Object.keys(claim).forEach((key) => {
    claim[key] = parseInt(claim[key])
  })

  return claim
}

module.exports = {
  parseClaim
}
