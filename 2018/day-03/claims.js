var _conflicts = []
var _claims = []
var _cloth = []

/**
 * Generates an empty matrix of X columns and Y rows
 */
const emptyMatrix = (x, y) => {
  return Array(x).fill().map(() => Array(y).fill())
}

const resetState = () => {
  _cloth = emptyMatrix(1000, 1000)
  _conflicts = []
  _claims = []
}

/**
 * Iterates through the cloth and tallies the conflicing points
 */
const countConflicts = () => {
  let conflicts = 0
  for (let x = 0; x < _cloth.length; x++) {
    for (let y = 0; y < _cloth[x].length; y++) {
      if (isConflict(x, y)) {
        conflicts += 1
      }
    }
  }
  return conflicts
}

/**
 * Checks a point in the cloth to see if it's already claimed
 * @param {number} x point x value
 * @param {number} y point y value
 * @returns {Boolean}
 */
const isClaimed = (x, y) => {
  return (typeof _cloth[x][y] === 'object' && _cloth[x][y].length > 0)
}

const isConflict = (x, y) => {
  return (isClaimed(x, y) && _cloth[x][y].length > 1)
}

const claimPoint = (x, y, id) => {
  // Point doesn't have a claim yet
  if (typeof _cloth[x][y] === 'undefined') {
    _cloth[x][y] = [id]
    return
  }
  // Point has claims already
  if (typeof _cloth[x][y] === 'object') {
    _cloth[x][y].push(id)
    return
  }
  throw new Error('Tried to set a point with an unknown type')
}

const findNonOverlappingClaim = () => {
  let claim = 0
  return claim
}

/**
 * Marks claimed points on the cloth
 * @param {Object} claim
 */
const makeClaim = (claim) => {
  for (let x = claim.x; x < claim.x + claim.width; x++) {
    for (let y = claim.y; y < claim.y + claim.height; y++) {
      claimPoint(x, y, claim.id)
    }
  }

  // Log claim
  _claims.push(claim.id)

  return _cloth
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

const getClaimedList = () => { return _claims }

resetState()

module.exports = {
  _conflicts,
  _cloth,
  countConflicts,
  findNonOverlappingClaim,
  getClaimedList,
  isClaimed,
  makeClaim,
  parseClaim,
  resetState
}
