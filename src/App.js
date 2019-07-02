import React, { Component } from 'react';
import Maze from './components/Maze'
import Restart from './components/Restart'
import Fish from '../public/graphics/fish.svg'
import Brick from '../public/graphics/brick-wall.svg'
import Water from '../public/graphics/flood.svg'
import KeyboardEventHandler from 'react-keyboard-event-handler'
const Board = require('../public/maps/levelone.js')
import './App.css';

class App extends Component {
  state = {
    board: null,
    i: null,
    j: null,
    direction: 90
  }

  componentWillMount() {
    this.setState({ board: this.generateBoardCopy() })
  }

  componentDidMount() {
    this.initState()
  }

  initState = () => {
    this.state.board.map((row, i) =>
      row.map((col, j) => {
        if (this.state.board[i][j] === 'o') this.setState({ i: i, j: j })
      })
    )}

  generateBoardCopy = () => Board.map(row => [...row])

  restart = async () => {
    await this.setState({ board: this.generateBoardCopy() })
    this.initState()
  }

  handleKeyPress = (key) => {
    if (key === 'up') {
      this.setState({ direction: -90 })
      this.move(-1, 0)
    } else if (key === 'right') {
      this.setState({ direction: 0 })
      this.move(0, 1)
    } else if (key === 'down') {
      this.setState({ direction: 90 })
      this.move(1, 0)
    } else if (key === 'left') {
      this.move(0, -1)
      this.setState({ direction: 180 })
    }
  }

  isOk = (di, dj) => this.state.board[this.state.i + di][this.state.j + dj] === " " ? true : false

  move = (di, dj) => {
    if (this.isOk(di, dj)) {
      let newBoard = this.state.board.map(row => [...row])
      newBoard[this.state.i][this.state.j] = " "
      newBoard[this.state.i + di][this.state.j + dj] = "o"
      this.setState({
        board: newBoard,
        i: this.state.i + di,
        j: this.state.j + dj
       })
    }
  }

  render() {

    const renderRow = (row, index) => row.map((col, j) => <td key={index + "," + j} id={index + "," + j}>{renderGraphics(col)}</td>)
    const renderBoard = () => this.state.board.map((row, index) => <tr key={index}>{renderRow(row, index)}</tr>)

    const renderGraphics = (col) => {
      if (col == 'x') {
        return <img src={Brick} width="25" />
      } else if (col === 'o') {
        return <img style={{transform: `rotate(${this.state.direction}deg)`}} src={Fish} width="25" />
      } else if (col === ' ') {
        return <img src={Water} width="25" />
      }
    }

    return (
      <div className="Container">
        <Maze
          renderBoard={renderBoard()}
        />
        <KeyboardEventHandler
          handleKeys={['up', 'down', 'left', 'right']}
          onKeyEvent={(key, e) => this.handleKeyPress(key)}
        />
        <Restart
          onClick={this.restart}
        />
      </div>

    )
  }
}

export default App
