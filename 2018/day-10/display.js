/**
 * Renders a frame to page
 * @param {Object} frame to render
 * @param {Number} dim [w,h] dimensions of display
  * @param {Array} origin [x,y] coordinates of origin
 */
const show = (frame, dim, origin) => {
  let buffer = ''
  for (let row = origin[1]; row <= origin[1] + dim[1]; row++) {
    for (let col = origin[0]; col <= origin[0] + dim[0]; col++) {
      const point = frame.contents.find((pt) => (col === pt.x && row === pt.y))
      buffer += (typeof point !== 'undefined') ? '#' : '.'
    }
    buffer += '\n'
  }
  buffer = buffer.trim() // Remove exces whitespace
  console.log(Array(dim[0]).fill('-').join('')) // border line
  console.log(buffer)
  console.log(Array(dim[0]).fill('-').join('')) // border line
  console.log(`Focus ratio: ${frame.meta.focus}`) // Metadata
  return buffer
}

module.exports = {
  show
}
