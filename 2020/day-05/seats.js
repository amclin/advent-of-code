// Seat codes are basically bitmaps, so convert them
const seatCodeToBitmap = (seatCode) => {
  return seatCode
    .replace(/F/g, 0)
    .replace(/B/g, 1)
    .replace(/L/g, 0)
    .replace(/R/g, 1)
}

const calcSeatId = ({ row, column }) => row * 8 + column

const getSeat = (seatCode) => {
  // Seat codes are basically bitmaps, so convert them
  const seatBitMap = seatCodeToBitmap(seatCode)

  // First octect is row
  const row = parseInt(seatBitMap.slice(0, 7), 2)
  // Last triplet is column
  const column = parseInt(seatBitMap.slice(7), 2)

  return {
    row,
    column,
    id: calcSeatId({ row, column })
  }
}

module.exports = {
  getSeat
}
