import React from 'react'


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
  board: board
}

  render() {

    const renderRow = (row, index) => row.map((col, j) => <td key={index + "," + j} id={index + "," + j}>{col}</td>)
    const renderBoard = () => this.state.board.map((row, index) => <tr key={index}>{renderRow(row, index)}</tr>)

    const move = (event) => {
      console.log(event.key)
    }

    const currentPosition = () => {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
          if (this.state.board[i][j] === 'o') {
            return i + "," + j
          }
        }
      }
    }

    return (
      <table>
        <tbody>
          {renderBoard()}

        </tbody>
      </table>
    )
  }
}

export default Maze
