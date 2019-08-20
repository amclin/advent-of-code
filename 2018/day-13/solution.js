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

  // Execute again, this time, removing crashed carts instead of stopping
  const track2 = new Track(data, { removeCrashedCarts: true })
  while (track2.carts.length > 1) {
    track2.advance()
  }

  // console.log(track2.display())
  const remaining = track2.carts[0]
  // console.log(`${remaining.length} cart(s) of ${track2.carts.length} remaining at frame ${track2.frame}`)
  // console.log(remaining)
  const answer2 = [remaining.x, remaining.y]

  console.log('-- Part 1 --')
  console.log(`Answer: ${answer}`)
  console.log('-- Part 2 --')
  console.log(`Answer: ${answer2}`)
}

loadInput(init)
