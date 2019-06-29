import React from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler'

const board = [
  ['x', 'x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x'],
  ['x', 'x', 'x', 'x', ' ', ' ', ' ', ' ', 'x', 'x'],
  ['x', 'x', 'x', 'x', 'x', 'x', 'x', ' ', 'x', 'x'],
  ['x', 'x', 'x', ' ', 'o', ' ', 'x', ' ', 'x', 'x'],
  ['x', 'x', 'x', ' ', ' ', ' ', 'x', ' ', 'x', 'x'],
  ['x', 'x', 'x', 'x', ' ', 'x', 'x', ' ', 'x', 'x'],
  ['x', 'x', 'x', 'x', ' ', 'x', 'x', ' ', 'x', 'x'],
  ['x', 'x', 'x', 'x', ' ', 'x', 'x', ' ', 'x', 'x'],
  ['x', 'x', 'x', 'x', ' ', ' ', ' ', ' ', 'x', 'x'],
  ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],

]

class Maze extends React.Component {

  state = {
    board: board,
    i: null,
    j: null
  }

  componentDidMount() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 'o') {
          this.setState({
            i: i,
            j: j
          })
        }
      }
    }
  }

  handleKeyPress = (key) => {
    if (key === 'up') {
      this.move(-1, 0)
    } else if (key === 'right') {
      this.move(0, 1)
    } else if (key === 'down') {
      this.move(1, 0)
    } else if (key === 'left') {
      this.move(0, -1)
    }
  }

  isOk = (di, dj) => this.state.board[this.state.i + di][this.state.j + dj] === " " ? true : false

  move = (di, dj) => {
    if (this.isOk(di, dj)) {
      let board = this.state.board
      board[this.state.i][this.state.j] = " "
      board[this.state.i + di][this.state.j + dj] = "o"
      this.setState({
        board: board,
        i: this.state.i + di,
        j: this.state.j + dj
       })
    }
  }

  render() {

    const renderRow = (row, index) => row.map((col, j) => <td key={index + "," + j} id={index + "," + j}>{col}</td>)
    const renderBoard = () => this.state.board.map((row, index) => <tr key={index}>{renderRow(row, index)}</tr>)

    return (
      <table>
        <tbody>
          {renderBoard()}
          <KeyboardEventHandler
            handleKeys={['up', 'down', 'left', 'right']}
            onKeyEvent={(key, e) => this.handleKeyPress(key)} />
        </tbody>
      </table>
    )
  }
}

export default Maze
