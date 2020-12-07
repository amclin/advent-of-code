const queryPosition = ({ map, position }) => {
  // check vertical position
  const row = map.rows[position[1]]
  // check horizontal which repeats
  return row[(position[0] % row.length)]
}

const positionHasTree = ({ map, position }) => {
  return (queryPosition({ map, position }) === '#')
}

const countTreesOnRoute = ({
  map,
  start = [0, 0],
  slope = [3, 1]
}) => {
  let treeCount = 0
  const position = start
  const advance = () => {
    position[0] += slope[0]
    position[1] += slope[1]
  }
  while (position[1] < map.rows.length) {
    if (positionHasTree({ map, position })) treeCount++
    advance()
  }
  return treeCount
}

module.exports = {
  countTreesOnRoute,
  positionHasTree
}
