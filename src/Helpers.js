const isOk = (board, i, j) => board[i][j] !== "x" ? true : false

const checkType = (board, i, j, type) => board[i][j] === type ? true : false

const seconds = (seconds) => seconds + 1 !== 60 ? seconds + 1 : 0

const minutes = (seconds, minutes) => seconds + 1 !== 60 ? minutes : minutes + 1

const time = (seconds, minutes) => {
  let time = ""
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

module.exports = { isOk, checkType, seconds, minutes, time, stroke }