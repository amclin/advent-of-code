const { loadInput } = require('./helpers')
const display = require('./display')
const {
  Beacon
} = require('./beacons')

const init = (data) => {
  const beaconTracker = new Beacon(data)
  const start = 0
  const end = 4

  // Play the animation and interpret the frames
  for (let x = 0; x < 5; x++) {
    display.show(beaconTracker.getFrame(x), [22, 16], [-6, -4])
  }

  // Find the frame with the best focus
  const best = beaconTracker.frameMeta.reduce((acc, curr, idx) => {
    return (curr.focus < acc.focus) ? {
      idx: idx,
      focus: curr.focus
    } : acc
  }, { idx: 0, focus: beaconTracker.frameMeta[0].focus })

  // const answer = sumMetadata(data)
  // const answer2 = data.value
  console.log(`-- Part 1 --`)
  console.log(`Ran animation from frame ${start} to ${end}.`)
  console.log(`The best frame appears to be ${best.idx} with a focus value of ${best.focus}`)
  console.log(`Here's what the frame looks like:`)
  console.log(`---------------------------------`)
  display.show(beaconTracker.getFrame(best.idx), [22, 16], [-6, -4])
  console.log(`---------------------------------`)

  // console.log(`Answer: ${answer}`)
  // console.log(`-- Part 2 --`)
  // console.log(`Answer: ${answer2}`)
}

loadInput(init)
