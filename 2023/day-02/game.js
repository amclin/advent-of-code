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

const validateGame = (game, limit) => {
  const lim = parseHex(limit)

  const tally = game.draws.reduce((acc, draw) => {
    const drawData = parseHex(draw)
    return {
      r: acc.r + drawData.r,
      g: acc.g + drawData.g,
      b: acc.b + drawData.b
    }
  }, { r: 0, g: 0, b: 0 })

  return (tally.r <= lim.r && tally.g <= lim.g && tally.b <= lim.b)
}

module.exports = {
  parseGame,
  validateGame
}
