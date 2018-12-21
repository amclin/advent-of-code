const {
  Track
} = require('./tracks')

const data = `/->-\\
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/   `

const track = new Track(data)
while (track.collision === false) {
  track.advance()
}

console.error(`Reached a collision at ${track.collision.x},${track.collision.y} on frame ${track.frame}`)
console.log(`Track state:`)
console.log(track.display())
