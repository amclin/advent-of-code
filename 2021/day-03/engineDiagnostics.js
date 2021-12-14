/**
 * Find the most common bit at a position
 * @param [str] data
 * @param int position
 */
const getMostCommon = (data, position) => {
  const offs = data.filter((reading) => {
    return reading[position] === '0'
  }).length
  // there can only be 2 values, so easy to check which has more as being 50% or above
  return (offs >= data.length / 2) ? '0' : '1'
}

/**
 * Find the least common bit at a position
 * @param [str] data
 * @param int position
 */
const getLeastCommon = (data, position) => {
  return (getMostCommon(data, position) === '0') ? '1' : '0'
}

/**
 * Calc the gamma value of the data set
 * @param [str] data
 */
const getGamma = (data) => {
  let gamma = ''
  for (let x = 0; x < data[0].length; x++) {
    gamma += getMostCommon(data, x)
  }
  return gamma
}

const getEpsilon = (data) => {
  let epsilon = ''
  for (let x = 0; x < data[0].length; x++) {
    epsilon += getLeastCommon(data, x)
  }
  return epsilon
}

const calcPowerConsumption = (gamma, epsilon) => {
  return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

module.exports = {
  getGamma,
  getEpsilon,
  getMostCommon,
  getLeastCommon,
  calcPowerConsumption
}
