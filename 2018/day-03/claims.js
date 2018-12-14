var _conflicts = []
var _claims = []

/**
 * Check if a value is within the designated range (inclusive)
 * @param {number} s1 start of first range
 * @param {number} e1 end of first range
 * @param {number} s2 start of first range
 * @param {number} e2 end of first range
 */
const _isOverlap = (s1, e1, s2, e2) => {
  return Math.max(s1, e1) <= Math.min(s2, e2)
}

/**
 * Compares claims to see if they overlap
 * @param {Object} c1 claim to compare
 * @param {Object*} c2 claim to compare
 */
const _isOverlappingClaim = (c1, c2) => {
  // x range overlaps
  const x = _isOverlap(
    c1.x,
    c1.x + c1.width,
    c2.x,
    c2.x + c2.width
  )
  // y range overlaps
  const y = _isOverlap(
    c1.y,
    c1.y + c1.height,
    c2.y,
    c2.y + c2.height
  )
  return (x && y)
}

/**
 * Iterates through the list of claims and checks to see if any cover the specified point
 * @param {number} x point x value
 * @param {number} y point y value
 * @returns {Boolean}
 */
const isClaimed = (x, y) => {
  const matches = _claims.filter((claim) =>
    x >= claim.x &&
    x <= claim.x + claim.width &&
    y >= claim.y &&
    y <= claim.y + claim.height
  )
  return (matches.length > 0)
}

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

const makeClaim = (claim) => {
  // Check if there's any overlap with an exisiting claim
  const overlaps = _claims.filter((existing) => _isOverlappingClaim(existing, claim))
  if (overlaps.length > 0) {
    console.log(`Claim ${claim.id} overlaps ${overlaps.length} already existing claims.`)
    // step through individual points to log conflicts
    for (let x = claim.x; x < claim.x + claim.width; x++) {
      for (let y = claim.y; y < claim.y + claim.height; y++) {
        if (isClaimed(x, y)) {
          logConflict(x, y, [claim.id])
        }
      }
    }
  }
  _claims.push(claim)
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
  _claims,
  isClaimed,
  logConflict,
  makeClaim,
  parseClaim
}
