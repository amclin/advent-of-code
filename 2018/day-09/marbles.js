let players = []
let currentPlayer = -1

class Circle {
  /**
   * Initialize a circle
   * @param {*} marble
   */
  constructor (marble) {
    this.head = null
    this.tail = null
    this.length = 0
    this.addFirst(marble)
  }

  addFirst (marble) {
    const newMarble = { marble }
    newMarble.value = marble
    newMarble.next = newMarble
    newMarble.prev = newMarble
    this.head = newMarble
    this.tail = newMarble
    this.length++
    return this
  }

  /**
   * Add a marble to the circle
   * @param {*} marble
   */
  addMarble (marble) {
    const newMarble = { marble }
    const oldHead = this.head
    newMarble.value = marble
    // Link the new marble to the head and tail
    newMarble.next = oldHead
    newMarble.prev = this.tail
    // update head and tail to point to the new marble (will be new head)
    this.tail.next = newMarble
    oldHead.prev = newMarble
    // Finish the insert making the new marble the new head
    this.head = newMarble
    this.length++
    return this // support chaining
  }

  /**
   * Removes a marble from the circle
   */
  removeHeadMarble () {
    const value = this.head.value
    this.head = this.head.next
    this.tail.next = this.head
    this.head.prev = this.tail
    // Once unlinked, garbage collection should cleanup memory
    this.length--
    return value
  }

  /**
   * Visual representation
   */
  display () {
    let output = ''
    const start = this.find(0)
    let thisNode = start.next
    while (thisNode.value !== start.value) {
      output = output + thisNode.value + ' '
      thisNode = thisNode.next
    }
    return `0 ${output}.....${this.head.value}`
  }

  /**
   * Find a node in the circle based on its distance from head
   * @param {*} delta
   */
  locateNode (delta) {
    let iterator = 0
    let thisNode = this.head
    while (iterator !== delta) {
      if (delta > 0) {
        thisNode = thisNode.next
        iterator++
      }
      if (delta < 0) {
        thisNode = thisNode.prev
        iterator--
      }
    }
    return thisNode
  }

  /**
   * Find a node in the circle based on its value
   * @param {*} val
   */
  find (val) {
    if (this.head.value === val) {
      return this.head
    }
    let thisNode = this.head.next
    while (thisNode !== this.head) {
      if (thisNode.value === val) {
        break
      }
      thisNode = thisNode.next
    }
    return thisNode
  }

  /**
   * Change the head to a different node that is <delta> steps along the circle
   * @param {*} delta
   */
  moveHead (delta) {
    const newHead = this.locateNode(delta)
    const newTail = newHead.prev

    this.head = newHead
    this.tail = newTail

    return this // support chaining
  }
}

const nextPlayer = () => {
  currentPlayer = (currentPlayer + 1 >= players.length) ? 0 : currentPlayer + 1
  return currentPlayer
}

/**
 * Play the game with the designated high marble and number of players
 * @param {Number} playerCount Number of players
 * @param {NUmber} highMarble Last marble (we ignore the marble spent for position 0)
 */
const playGame = (playerCount, highMarble, showBoard) => {
  resetGame(playerCount)
  const game = new Circle(0)

  // Go through the game
  for (let marble = 1; marble <= highMarble; marble++) {
    const player = nextPlayer()

    if (marble % 23 === 0) {
      // Player keeps marble divisble by 23
      players[player] += marble
      // Player picks up marble from circle
      const score = game.moveHead(-7).removeHeadMarble()
      players[player] += score
      // console.log(`player ${player} scored ${marble} + ${score}`)
    } else {
      game.moveHead(2).addMarble(marble)
    }

    if (showBoard) {
      console.log(`[${player}] ${game.display()}`)
    }
  }

  // tally the results
  const results = {
    players: players,
    highScore: players.sort((a, b) => b - a)[0]
  }

  return results
}

/**
 * Resets the game for the designated number of players
 * @param {Number} count who will be playing
 */
const resetGame = (count) => {
  players = Array(count).fill(0)
  currentPlayer = -1
}

module.exports = {
  playGame
}
