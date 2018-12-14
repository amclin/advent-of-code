var _conflicts = []

/**
 * Logs a conflict about multiple claims for a singel point
 * @param {number} x
 * @param {number} y
 * @param {Array} claims list of claim IDs
 */
const logConflict = (x, y, claims) => {
  let existing = _conflicts.find((c) => c.x === x && c.y === y)
  if (existing) {
    // Append new claims to existing list for this coordiante
    existing.claims = existing.claims.concat(claims)
  } else {
    // Record a new claim conflict
    _conflicts.push({ x: x, y: y, claims: claims })
  }
}

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
  _conflicts,
  logConflict,
  parseClaim
}
