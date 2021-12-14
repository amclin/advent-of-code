const boards = []

const callNumber = (called) => {
  for (let x = 0; x < boards.length; x++) {
    markBoard(x, called)
    if (checkWinner(x) === 'winner') {
      console.debug(`Board ${x} is the winner`)
      return x
    }
  }
}

const markBoard = (board, called) => {
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      if (board[x][y] === called) {
        board[x][y] = 'x'
        // TODO: speed up break the loop, since only one of a number on each board
        // x = 6
        // y = 6
      }
    }
  }
  return board
}

const checkWinner = (board) => {
  // TODO: This can be sped up by doing a check for at least 5 "x" before
  // validating horizontal/vertical explicitly. Another speedup would be to
  // zig-zag check parse through the array and break/resolve when there
  // isn't a match instead of checking all columns then checking all rows

  // Look for a horizontal bingo
  for (let y = 0; y < 5; y++) {
    if (board[y].filter((val) => val === 'x').length === 5) {
      return 'winner'
    }
  }

  // Look for a vertical bingo
  let match = 0
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      if (board[y][x] === 'x') {
        match++

        if (match === 5) {
          return 'winner'
        }
      }
    }
    match = 0 // reset so next row has a clean count
  }

  // No bingo
  return 'no win'
}

const scoreBoard = (board) => {
  return board.reduce((tally, row) => {
    tally += row.reduce((colTally, cell) => {
      if (cell !== 'x') {
        colTally += cell
      }
      return colTally
    }, 0)
    return tally
  }, 0)
}

module.exports = {
  callNumber,
  scoreBoard,
  checkWinner,
  markBoard
}
