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

const validateGame = () => {

}

module.exports = {
  parseGame,
  validateGame
}
