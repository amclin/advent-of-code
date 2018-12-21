const {
  Track
} = require('./tracks')

/* eslint-disable */
const data = `/->-\\
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/   `
/* eslint-enable */

const mytrack = new Track(data)
const actual = mytrack.display()
console.log(actual)
