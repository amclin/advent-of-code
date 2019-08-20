const { loadInput } = require('./helpers')
const { dynamicSort } = require('../day-04/helpers')
const {
  blankGrid,
  // distance,
  distanceToAllPoints,
  findClosestPoint,
  getArea,
  isUnbounded,
  setAbsolutes
} = require('./coordinates')

const init = (data) => {
  setAbsolutes(data)
  let grid = blankGrid()

  grid = grid.map((row) => {
    return row.map((point) => {
      point.closest = findClosestPoint(point, data) // find the closest registered point for each coordinate
      point.totalDistance = distanceToAllPoints(point, data) // Total the distance to all registered points
      return point
    })
  })

  // grid.forEach((x) => {
  //   let col = ''
  //   x.forEach((y) => {
  //     col = col + y.closest.toString(10)
  //   })
  //   console.log(col)
  // })

  // Calculate the areas for each point
  data = data.map((point, idx) => {
    if (isUnbounded(String.fromCharCode(idx), grid)) {
      point.area = 'unbounded'
    } else {
      point.area = getArea(String.fromCharCode(idx), grid)
    }
    return point
  })
  console.log(grid[200][200])

  // The largest area
  const answer = data.filter((point) => point.area !== 'unbounded').sort(dynamicSort('-area'))[0].area

  // Area with total distance to all registered points < 10000
  const answer2 = grid.reduce((acc, xpoint) => {
    return acc + xpoint.filter((ypoint) => ypoint.totalDistance < 10000).length
  }, 0)

  // Determine the distance between every point
  // data = data.map((point) => {
  //   point.distances = data.map((p2) => {
  //     return distance(point, p2)
  //   })
  //   return point
  // })

  // console.log(data)
  console.log('-- Part 1 --')
  console.log(`Answer: ${answer}`)
  console.log('-- Part 2 --')
  console.log(`Answer: ${answer2}`)
}

loadInput(init)
