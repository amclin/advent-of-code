const parseGame = (gameString) => {
  const data = gameString.split(':')
  const id = parseInt(
    data[0].match(/\d+/)[0] // find the game number
  )
  const draws = data[1].split(';') // split the game into draws
    .map((draw) => {
      const result = ['red', 'green', 'blue']
        .map((color) => { // extract count for each color
          const reg = new RegExp(`\\d+(?= ${color})`)
          console.debug(reg)
          const val = draw.match(reg) || [0]
          console.debug(`${color} ${val}`)
          return parseInt(val).toString(16).padStart(2, '0') // convert to hex
        })

      return result.join('') // combine into a RGB hex color string
    })

  return {
    id,
    draws
  }
}

const parseHex = (hex) => {
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16)
  }
}

const validateDraw = (draw, limit) => {
  const data = parseHex(draw)
  const lim = parseHex(limit)
  return (data.r <= lim.r && data.g <= lim.g && data.b <= lim.b)
}

const validateGame = (game, limit) => {
  // const lim = parseHex(limit)
  // const tally = game.draws.reduce((acc, draw) => {
  //   const drawData = parseHex(draw)
  //   return {
  //     r: acc.r + drawData.r,
  //     g: acc.g + drawData.g,
  //     b: acc.b + drawData.b
  //   }
  // }, { r: 0, g: 0, b: 0 })

  // const result = (tally.r <= lim.r && tally.g <= lim.g && tally.b <= lim.b)
  // console.debug(`Game ${game.id} ${(result) ? 'passes' : 'fails'}`)
  // if (!result) {
  //   console.debug(tally)
  // }

  // If any draw fails, the full game fails
  const result = game.draws.reduce((res, draw) => {
    return (res && validateDraw(draw, limit))
  }, true)
  return result
}

const checksumGameSet = (games, limit) => {
  // tally the IDs of valid games
  return games.reduce((acc, game) => {
    return validateGame(game, limit) ? acc + game.id : acc
  }, 0)
}

const countCubesNeeded = (game) => {
  const max = game.draws.reduce((acc, draw) => {
    const drawData = parseHex(draw)
    return {
      r: Math.max(acc.r, drawData.r),
      g: Math.max(acc.g, drawData.g),
      b: Math.max(acc.b, drawData.b)
    }
  }, { r: 0, g: 0, b: 0 })

  return max
}

const power = (game) => {
  const needed = countCubesNeeded(game)
  return needed.r * needed.g * needed.b
}

module.exports = {
  parseGame,
  validateGame,
  checksumGameSet,
  validateDraw,
  countCubesNeeded,
  power
}
