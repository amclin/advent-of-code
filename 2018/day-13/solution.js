const { loadInput } = require('./helpers')
const { Track } = require('./tracks')

const init = (data) => {
  const track = new Track(data)
  while (track.collision === false) {
    try {
      track.advance()
    } catch (err) {
      console.error(`Reached a collision at ${track.collision.x},${track.collision.y} on frame ${track.frame}`)
    }
  }
  const answer = [track.collision.x, track.collision.y]
  // console.log(`Track state:`)
  // console.log(track.display())
  const answer2 = ''
  console.log(`-- Part 1 --`)
  console.log(`Answer: ${answer}`)
  console.log(`-- Part 2 --`)
  console.log(`Answer: ${answer2}`)
}

loadInput(init)
