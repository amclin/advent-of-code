const { loadInput } = require('./helpers')
const display = require('./display')
const {
  Beacon
} = require('./beacons')

const init = (data) => {
  let beaconTracker = new Beacon(data)
  for (let x = 0; x < 5; x++) {
    display.show(beaconTracker.getFrame(x), [22, 16], [-6, -4])
  }

  // data = parseData(data)
  // const answer = sumMetadata(data)
  // const answer2 = data.value
  // console.log(`-- Part 1 --`)
  // console.log(`Answer: ${answer}`)
  // console.log(`-- Part 2 --`)
  // console.log(`Answer: ${answer2}`)
}

loadInput(init)
