const isOk = (board, i, j) => board[i][j] !== "x" ? true : false

const checkType = (board, i, j, type) => board[i][j] === type ? true : false

const seconds = (seconds) => seconds - 1

const time = (seconds) => {
  let time = ""
  let minutes = seconds / 60 < 1 ? 0 : Math.floor(seconds / 60)
  seconds = seconds - (minutes * 60)
  minutes < 10 ? time += "0" + minutes + ":" : time += minutes + ":"
  seconds < 10 ? time += "0" + seconds : time += seconds

  return time
}

const stroke = (board, i, j, di, dj) => {
  let newBoard = board.map(row => [...row])
  newBoard[i][j] = " "
  newBoard[i + di][j + dj] = "o"

  return newBoard
}

const finished = (finished) => finished ? true : false

const points = (food, strokes, seconds) => {
  return Math.round((100 * food * (seconds / 5)) / strokes )
}

module.exports = { isOk, checkType, seconds, time, stroke, finished, points }
