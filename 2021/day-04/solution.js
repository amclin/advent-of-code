const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { linesToArray, parseData } = require('../../2018/inputParser')
const { markBoard, checkWinner, scoreBoard } = require('./bingo')

fs.readFile(filePath, { encoding: 'utf8' }, (err, initData) => {
  if (err) throw err

  initData = linesToArray(initData.trim())

  const resetInput = () => {
    // Deep copy to ensure we aren't mutating the original data
    const data = JSON.parse(JSON.stringify(initData))

    // split up data
    const draws = parseData(data.shift())
    const boards = []
    for (let x = 0; x < data.length; x = x + 5) {
      boards.push(
        data.slice(x, x + 5).map(parseData)
      )
    }

    return {
      boards,
      draws
    }
  }

  const part1 = () => {
    const data = resetInput()

    let winner = false
    let draw = -1
    while (winner === false && draw < data.draws.length) {
      // next draw
      draw++

      // Mark each board that has the number
      console.debug(`Checking draw ${data.draws[draw]}`)
      data.boards = data.boards.map((board) => {
        return markBoard(board, data.draws[draw])
      })

      // Check for a winner
      data.boards.forEach((board, idx) => {
        if (checkWinner(board) === 'winner') {
          console.debug(`Board ${idx} is the winner`)
          console.debug(data.boards[idx])
          winner = idx
        }
      })
    }

    // winner found
    console.debug(`Score is ${scoreBoard(data.boards[winner])}`)
    return scoreBoard(data.boards[winner]) * data.draws[draw]
  }

  const part2 = () => {
    const data = resetInput()

    let draw = -1
    let lastWin = []
    let lastDraw = 0

    while (data.boards.length >= 1 && draw < data.draws.length) {
      // next draw
      draw++

      // Mark each board that has the number
      console.debug(`Checking draw ${data.draws[draw]}`)
      data.boards = data.boards.map((board) => {
        return markBoard(board, data.draws[draw])
      })

      // Filter out any winners
      data.boards = data.boards.filter((board) => {
        if (checkWinner(board) === 'winner') {
          lastWin = board
          lastDraw = data.draws[draw]
          return false
        } else {
          return true
        }
      })
    }

    // last winner found
    console.debug(`Score is ${scoreBoard(lastWin)} on draw ${lastDraw}`)
    return scoreBoard(lastWin) * lastDraw
  }
  const answers = []
  answers.push(part1())
  answers.push(part2())

  answers.forEach((ans, idx) => {
    console.info(`-- Part ${idx + 1} --`)
    console.info(`Answer: ${ans}`)
  })
})
