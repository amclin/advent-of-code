const helpers = require('./helpers')

const findLaziestGuards = (data) => {
  let guards = []
  return guards
}

const sortActivities = (data) => {
  return data.sort(helpers.dynamicSortMultiple('date', 'hour', 'minute'))
}

module.exports = {
  findLaziestGuards,
  sortActivities
}
