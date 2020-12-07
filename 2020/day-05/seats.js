// Seat codes are basically bitmaps, so convert them
const seatCodeToBitmap = (seatCode) => {
  return seatCode
    .replace(/F/g, 0)
    .replace(/B/g, 1)
    .replace(/L/g, 0)
    .replace(/R/g, 1)
}

// This is just binary to int
// const calcSeatId = ({ row, column }) => row * 8 + column

const getSeat = (seatCode) => {
  // Seat codes are basically bitmaps, so convert them
  const seatBitMap = seatCodeToBitmap(seatCode)

  // First septuplet is row
  const row = parseInt(seatBitMap.slice(0, 7), 2)
  // Last triplet is column
  const column = parseInt(seatBitMap.slice(7), 2)

  return {
    row,
    column,
    id: parseInt(seatBitMap, 2)
  }
}

const findAvailableSeat = (seats) => {
  // We could do some complicated logic to loop through a sorted
  // list of seats comparing indexes to find the first one where there's
  // a gap by looking for an off-by-one situation while excluding first
  // and last rows:
  //
  // if (seat.row === 0 || seat.row === 127) return false
  // // Find gap between this seat and previous
  // return (
  //   (seat.id - 1) !== arr[idx - 1].id
  // )
  //
  // Or we can just and a fake first row, and then look for any
  // seat where the ID doesn't match the array index
  //
  const occupied = seats.map(getSeat)
    .sort((a, b) => a.id - b.id)
  // The first seat is not in row 0, so add a bunch of
  // fake rows at the front of the plane
  occupied.unshift(...Array(occupied[0].id))
  // Find the gap, ignoring the fake seats
  return occupied.find((seat, idx, arr) => {
    // !!seat filters out the fake ones since they're undefined
    return !!seat && seat.id !== idx
    // we can ignore rows at the back even if missing
  }).id - 1 // The open seat will be immediately before the mismatched seat
}

module.exports = {
  getSeat,
  findAvailableSeat
}
