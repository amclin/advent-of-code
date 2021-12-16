// const renderDigit = (num) => {
//   const topper = `  ${num}:  `
//   const patterns = [
//     'abcefg',
//     'cf',
//     'acdeg',
//     'acdfg',
//     'bcdf',
//     'abdfg',
//     'abdefg',
//     'acf',
//     'abcdefg',
//     'abcdfg'
//   ]
//   const template = `
//  aaaa
// b    c
// b    c
//  dddd
// e    f
// e    f
//  gggg
// `

//   const out = template
//   patterns[8].forEach((segment) => {
//     if(patterns[num].indexOf(segment) >= -1
//   })
//   }


/**
 * Takes a string of scrambled codes and deduces which codes correspond
 * to which bit in a Seven Segment Display. Order of codes is irrelevant, as
 * is order of characters within each code. Resulting order of segments
 * is mapped to the standard order as described in
 * https://en.wikipedia.org/wiki/Seven-segment_display
 */
const descrambleSignal = (data) => {
  console.debug('2021-day-08 descrambleSignal()')

  const scrambledCodes = data.split(' ')
    .map((code) => code.split('').sort()) // Convert each code to alphabetized arrays
  const segmentCodes = Array(7) // For caching the identified segment codes as we find them
  const sortedCodes = Array(10) // For caching the identified number codes as we find them

  const numCached = (num) => {
    return (
      typeof sortedCodes[num] === typeof [] &&
      sortedCodes[num].length >= 1
    )
  }
  const segCached = (num) => {
    return (
      typeof segmentCodes[num] === typeof '' &&
      segmentCodes[num].length === 1
    )
  }

  // #0 is one of 3 6-character numbers
  // Can be found if the other 2 are already identified
  const findNum0 = (number6, number9) => {
    if (numCached(0)) {
      return sortedCodes[0]
    }

    sortedCodes[0] = scrambledCodes
      .filter((code) => code.length === 6) // Find 6-character codes
      .filter((code) => !(JSON.stringify(code) === JSON.stringify(number6))) // remove #5
      .filter((code) => !(JSON.stringify(code) === JSON.stringify(number9)))[0] // remove #9

    console.debug('Found #0')
    return sortedCodes[0]
  }

  // #1 is the only 2-character code
  const findNum1 = () => {
    if (numCached(1)) {
      return sortedCodes[1]
    }

    sortedCodes[1] = scrambledCodes
      .filter((code) => code.length === 2)[0]

    console.debug('Found #1')
    return sortedCodes[1]
  }

  // #2 is one of 3 5-character numbers
  // Can be found if the other two are already identified
  const findNum2 = (number3, number5) => {
    if (numCached(2)) {
      return sortedCodes[2]
    }

    sortedCodes[2] = scrambledCodes
      .filter((code) => code.length === 5) // Find 5-character codes
      .filter((code) => !(JSON.stringify(code) === JSON.stringify(number3))) // remove #3
      .filter((code) => !(JSON.stringify(code) === JSON.stringify(number5)))[0] // remove #5

    console.debug('Found #2')
    return sortedCodes[2]
  }

  // #3 is one of 3 5-character codes
  // It is the only one that contains BOTH segments of #1
  const findNum3 = (number1) => {
    if (numCached(3)) {
      return sortedCodes[3]
    }

    sortedCodes[3] = scrambledCodes
      .filter((code) => code.length === 5) // Find 5-character codes
      .filter((code) => {
        // Remove codes that don't include both segments of #1
        return code.filter((letter) => !number1.includes(letter)).length === 0
      })[0]

    console.debug('Found #3')
    return sortedCodes[3]
  }

  // #4 is the only 4-character code
  const findNum4 = () => {
    if (numCached(4)) {
      return sortedCodes[4]
    }

    sortedCodes[4] = scrambledCodes
      .filter((code) => code.length === 4)[0]

    console.debug('Found #4')
    return sortedCodes[4]
  }

  // #5 is one of 3 5-character codes
  // It is the only one that does not contain Segment 1
  const findNum5 = (segment1) => {
    if (numCached(5)) {
      return sortedCodes[5]
    }

    sortedCodes[5] = scrambledCodes
      .filter((code) => code.length === 5) // Find 5-character codes
      .filter((code) => !code.includes(segment1))[0] // Filter out codes containing Seg1

    console.debug('Found #5')
    return sortedCodes[5]
  }

  // #6 is one of 3 6-character codes
  // It is the only one that does NOT contain both segments of #1
  const findNum6 = (number1) => {
    if (numCached(6)) {
      return sortedCodes[6]
    }

    sortedCodes[6] = scrambledCodes
      .filter((code) => code.length === 6) // Find 6-character codes
      .filter((code) => {
        // Remove codes that include both segments of #1
        return !(
          code.includes(number1[0]) &&
          code.includes(number1[1])
        )
        // return (
        //   code.filter((letter) => !number1.includes(letter)).length > 0
        // )
      })[0]

    console.debug('Found #6')
    return sortedCodes[6]
  }

  // #7 is the only three-character code
  const findNum7 = () => {
    if (numCached(7)) {
      return sortedCodes[7]
    }

    sortedCodes[7] = scrambledCodes
      .filter((code) => code.length === 3)[0]

    console.debug('Found #7')
    return sortedCodes[7]
  }

  // #8 is the only 7-character code
  const findNum8 = () => {
    if (numCached(8)) {
      return sortedCodes[8]
    }

    sortedCodes[8] = scrambledCodes
      .filter((code) => code.length === 7)[0]

    console.debug('Found #8')
    return sortedCodes[8]
  }

  // #9 is one of 3 6-segment numbers
  // It is the only one that does not contain segment 4
  const findNum9 = (segment4) => {
    if (numCached(9)) {
      return sortedCodes[9]
    }

    sortedCodes[9] = scrambledCodes
      .filter((code) => code.length === 6) // Find 6-character codes
      .filter((code) => !code.includes(segment4))[0] // Filter out codes containing Seg4

    console.debug('Found #9')
    return sortedCodes[9]
  }

  // Segment 0 is the letter in #7 but not #1
  const findSeg0 = (number1, number7) => {
    if (!segCached(0)) {
      segmentCodes[0] = number7.filter((letter) => !number1.includes(letter))[0]
      console.debug('Found segment 0')
    }

    return segmentCodes[0]
  }

  // Segment 1 is the letter in #1 that is not in #6
  const findSeg1 = (number1, number6) => {
    if (!segCached(1)) {
      segmentCodes[1] = number1.filter((letter) => !number6.includes(letter))[0]
      console.debug('Found segment 1')
    }

    return segmentCodes[1]
  }

  // Segment 2 is the letter in #1 that is not segment 1
  const findSeg2 = (number1, segment1) => {
    if (!segCached(2)) {
      segmentCodes[2] = number1.filter((letter) => letter !== segment1)[0]
      console.debug('Found segment 2')
    }

    return segmentCodes[2]
  }

  // Segment 3 is the letter remaining if all other segments are removed from #8
  // WARNING - only works if all 6 other segments are present
  const findSeg3 = (number8, segmentCodes) => {
    if (segCached(3)) {
      return segmentCodes[3]
    }

    // validate other segments are present
    for (let x = 0; x < 7; x++) {
      if (x !== 3 && segmentCodes[x].length !== 1) {
        throw new Error(`segmentCodes[${x}] appears to be invalid: ${segmentCodes[x]}`)
      }
    }

    segmentCodes[3] = number8
      .filter((letter) => !segmentCodes.includes(letter))[0] // remove existing segments
    console.debug('Found segment 3')

    return segmentCodes[3]
  }

  // Segment 4 is the letter remaining if #5 and #1 are removed from #8
  const findSeg4 = (number1, number5, number8) => {
    if (!segCached(4)) {
      segmentCodes[4] = number8
        .filter((letter) => !number5.includes(letter)) // remove #5
        .filter((letter) => !number1.includes(letter))[0] // remove #1
      console.debug('Found segment 4')
    }

    return segmentCodes[4]
  }

  // Segment 5 is the letter remaining if #2 and #1 are removed from #8
  const findSeg5 = (number1, number2, number8) => {
    if (!segCached(5)) {
      segmentCodes[5] = number8
        .filter((letter) => !number2.includes(letter)) // remove #2
        .filter((letter) => !number1.includes(letter))[0] // remove #1
      console.debug('Found segment 5')
    }

    return segmentCodes[5]
  }

  // Segement 6 is the letter remaining if #0 is removed from #8
  const findSeg6 = (number0, number8) => {
    if (!segCached(6)) {
      segmentCodes[6] = number8
        .filter((letter) => !number0.includes(letter))[0] // remove #0
      console.debug('Found segment 6')
    }

    return segmentCodes[6]
  }

  // Descramble the codes to identify each number. Order matters because of dependencies
  // findNum0() deferred after 9
  // findNum1()
  // // findNum2() deferred after #3, #5, and Seg6
  // findNum3(
  //   findNum1()
  // )
  // findNum4()
  // findNum5(
  //   findSeg1()
  // )

  // findNum6(
  //   findNum1()
  // )
  // findNum7()
  // findNum8()
  // findNum9(
  //   findSeg4(
  //     findNum1(),
  //     findNum5(
  //       findSeg1()
  //     ),
  //     findNum8()
  //   )
  // )
  // findNum0( // #0 out of order
  //   findNum6(
  //     findNum1()
  //   ),
  //   findNum9(
  //     findSeg4(
  //       findNum1(),
  //       findNum5(
  //         findSeg1(
  //           findNum1(),
  //           findNum6(
  //             findNum1()
  //           )
  //         )
  //       ),
  //       findNum8()
  //     )
  //   )
  // )
  // findNum2( // #2 out of order
  //   findNum3(
  //     findNum1()
  //   ),
  //   findNum5(
  //     findSeg1()
  //   )
  // )

  // #4 is the only number we need that doesn't come from identifying segments
  findNum4()

  // Find the codes for each segment
  findSeg0(
    findNum1(),
    findNum7()
  )

  console.debug(segmentCodes)

  findSeg1(
    findNum1(),
    findNum6(
      findNum1()
    )
  )

  console.debug(segmentCodes)

  findSeg2(
    findNum1(),
    findSeg1(
      findNum1(),
      findNum6(
        findNum1()
      )
    )
  )

  console.debug(segmentCodes)

  // findSeg3 is moved to last because it depends on finding all other segments first

  findSeg4(
    findNum1(),
    findNum5(
      findSeg1()
    ),
    findNum8()
  )

  console.debug(segmentCodes)

  findSeg5(
    findNum1(),
    findNum2(
      findNum3(
        findNum1()
      ),
      findNum5(
        findSeg1()
      )
    ),
    findNum8()
  )

  console.debug(segmentCodes)

  findSeg6(
    findNum0(
      findNum6(
        findNum1()
      ),
      findNum9(
        findSeg4(
          findNum1(),
          findNum5(
            findSeg1()
          ),
          findNum8()
        )
      )
    ),
    findNum8()
  )

  console.debug(segmentCodes)

  findSeg3(
    findNum8(),
    segmentCodes
  )

  console.debug(segmentCodes)

  return {
    segmentCodes
  }
}

module.exports = {
  descrambleSignal
}
