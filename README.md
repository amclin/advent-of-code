[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Build Status](https://github.com/amclin/advent-of-code/actions/workflows/release.yml/badge.svg)](https://github.com/amclin/advent-of-code/actions/workflows/release.yml)
[![codecov](https://codecov.io/gh/amclin/advent-of-code/branch/master/graph/badge.svg)](https://codecov.io/gh/amclin/advent-of-code)

## Status

### 2020
![](https://img.shields.io/badge/day%20📅-24-blue)
![](https://img.shields.io/badge/stars%20⭐-24-yellow)
![](https://img.shields.io/badge/days%20completed-11-red)

## Start a boilerplate for a new day
`npm run new`
### Special Instructions
Run by modifying `index.js` to point to the puzzle you want to execute.
#### 2019:Day 02
Day 2 requires the use of BigInt which is added to Javascript in ES2020 and I didn't include a polyfill.
This limits the solution to [Javascript engines with BigInt support](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility)

#### 2018:Day 14
Day 14 is fast but needs more memory to complete. Run node with 4GB of heap space:
`node --max_old_space_size=4096 index.js`
