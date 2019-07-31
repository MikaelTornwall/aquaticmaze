import React from 'react'

// Graphics
import Brick from './graphics/Brick'
import Water from './graphics/Water'
import Sushi from './graphics/Sushi'
import Pipe from './graphics/Pipe'
import Fish from './graphics/Fish'
import Grass from './graphics/Grass'
import Tile from './graphics/Tile'
import Tree from './graphics/Tree'
import Saw from './graphics/Saw'
import Hole from './graphics/Hole'

const isOk = (board, i, j, collected, maximum) => {
  if (board[i][j] === "x") {
    return false
  } else if (board[i][j] === "p" && collected !== maximum) {
    return false
  }
  return true
}

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
  return Math.round(((10000 * food) * (seconds / 10)) / strokes)
}


const renderGraphics = (col, direction, theme) => {
  if (col === 'x') {
    if (theme === 'brick') return <Brick />
    if (theme === 'forest') return <Tree />
    if (theme === 'grass') return <Grass />
    return <Brick />
  } else if (col === 'o') {
    return <Fish direction={direction} />
  } else if (col === ' ') {
    return <Water />
  } else if (col === 's') {
    return <Sushi />
  } else if (col === 'p') {
    if (theme === 'brick') return <Pipe />
    return <Hole />
  } else if (col === 'saw') {
    return <Saw />
  }
}

module.exports = { isOk, checkType, seconds, time, stroke, finished, points, renderGraphics }
