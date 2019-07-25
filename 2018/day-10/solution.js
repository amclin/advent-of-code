const { loadInput } = require('./helpers')
const display = require('./display')
const {
  Beacon
} = require('./beacons')

const init = (data) => {
  const beaconTracker = new Beacon(data)
  beaconTracker.getFrame(0)

  const start = 0
  const end = 50000

  // Play the animation and interpret the frames
  for (let x = start; x < end; x++) {
    const frame = beaconTracker.getFrame(x)
    console.log(`Analyzing frame ${x}. Focus: ${frame.meta.focus}`)
  }

  // Find the frame with the best focus
  const best = beaconTracker.frameMeta.reduce((acc, curr, idx) => {
    return (curr.focus < acc.focus) ? {
      idx: idx,
      focus: curr.focus,
      dims: curr.dims
    } : acc
  }, { idx: 0, focus: beaconTracker.frameMeta[0].focus, dims: { dim: [0, 0], origin: [0, 0] } })

  // const answer = sumMetadata(data)
  // const answer2 = data.value
  console.log(`-- Part 1 --`)
  console.log(`Ran animation from frame ${start} to ${end}.`)
  console.log(`The best frame appears to be ${best.idx} with a focus value of ${best.focus}`)
  console.log(`Here's what the frame looks like:`)
  console.log(`---------------------------------`)
  display.show(beaconTracker.getFrame(best.idx), best.dims.dim, best.dims.origin)
  console.log(`---------------------------------`)
  console.log(`-- Part 2 --`)
  console.log(`Answer: ${best.idx}`)

  // console.log(`Answer: ${answer}`)
  // console.log(`-- Part 2 --`)
  // console.log(`Answer: ${answer2}`)
}

loadInput(init)
