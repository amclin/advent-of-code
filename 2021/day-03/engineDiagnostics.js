/**
 * Find the most common bit at a position
 * @param [str] data
 * @param int position
 */
const getMostCommon = (data, position) => {
  const offs = data.filter((reading) => {
    return reading[position] === '0'
  }).length
  // there can only be 2 values, so easy to check which has more as being above 50%
  return (offs > data.length / 2) ? '0' : '1'
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

const getO2 = (data) => {
  return getAir(data, getMostCommon)
}

const getCO2 = (data) => {
  return getAir(data, getLeastCommon)
}

const getAir = (data, filterMethod) => {
  let dataset = data
  // Loop through each digit, find the most common bit for that digit, and filter
  // out any readings that don't share that digit
  //
  // TODO: Probably faster with bitmap math, but .... ehh... runs fast enough
  for (let x = 0; x < data[0].length; x++) {
    if (dataset.length > 1) {
      const bit = filterMethod(dataset, x)
      dataset = dataset.filter((reading) => {
        return reading[x] === bit
      })
    }
  }

  if (dataset.length > 1) {
    throw new Error(`Found too many results ${dataset}`)
  }

  return dataset[0]
}

const calcPowerConsumption = (gamma, epsilon) => {
  return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

module.exports = {
  getGamma,
  getEpsilon,
  getMostCommon,
  getLeastCommon,
  getO2,
  getCO2,
  calcPowerConsumption,
  calcLifeSupport: calcPowerConsumption
}
