import React, { Component } from 'react';

// Components
import Maze from './components/Maze'
import Restart from './components/Restart'
import Success from './components/Success'
import Statistics from './components/Statistics'

// Graphics
import Fish from '../public/graphics/fish.svg'
import Brick from '../public/graphics/brick-wall.svg'
import Water from '../public/graphics/flood.svg'
import Sushi from '../public/graphics/sushi.svg'
import Pipe from '../public/graphics/pipes.svg'

// Helpers
import ReactTimeout from 'react-timeout'
import KeyboardEventHandler from 'react-keyboard-event-handler'

// Maps
const Board = require('../public/maps/levelone.js')

// Styles
import './App.css';

class App extends Component {
  state = {
    board: null,
    i: null,
    j: null,
    direction: 90,
    message: "",
    points: 0,
    strokes: 0,
    finished: false
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
    await this.setState({
      board: this.generateBoardCopy(),
      points: 0,
      strokes: 0,
      finished: false
    })
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

  isOk = (di, dj) => this.state.board[this.state.i + di][this.state.j + dj] !== "x" ? true : false

  finish = (di, dj) => this.state.board[this.state.i + di][this.state.j + dj] === "p" ? true : false

  food = (di, dj) => this.state.board[this.state.i + di][this.state.j + dj] === "s" ? true : false

  move = (di, dj) => {

    if (this.finish(di, dj)) {
      this.setState({
        message: "Well done!",
        finished: true
      })
    }

    if (this.food(di, dj)) this.setState({ points: this.state.points + 1 })

    if (this.isOk(di, dj)) {
      let newBoard = this.state.board.map(row => [...row])
      newBoard[this.state.i][this.state.j] = " "
      newBoard[this.state.i + di][this.state.j + dj] = "o"
      this.setState({
        board: newBoard,
        i: this.state.i + di,
        j: this.state.j + dj,
        strokes: this.state.strokes + 1
       })
    }
  }

  render() {

    const renderGraphics = (col) => {
      if (col === 'x') {
        return <img src={Brick} width="25" />
      } else if (col === 'o') {
        return <img style={{transform: `rotate(${this.state.direction}deg)`}} src={Fish} width="25" />
      } else if (col === ' ') {
        return <img src={Water} width="25" />
      } else if (col === 's') {
        return <img src={Sushi} width="25" />
      } else if (col === 'p') {
        return <img src={Pipe} width="25" />
      }
    }

    const renderRow = (row, index) => row.map((col, j) => <td key={index + "," + j} id={index + "," + j}>{renderGraphics(col)}</td>)
    const renderBoard = () => this.state.board.map((row, index) => <tr key={index}>{renderRow(row, index)}</tr>)


    const finished = () => {
      if (this.state.finished) {
        return renderFinished()
      } else {
        return renderGame()
      }
    }

    const renderFinished = () => (
      <Success
        message={this.state.message}
        points={this.state.points}
        strokes={this.state.strokes}
      />
    )

    const renderGame = () => (
      <div>
      <Statistics
        points={this.state.points}
        strokes={this.state.strokes}
      />
      <Maze
        renderBoard={renderBoard()}
      />
      <KeyboardEventHandler
        handleKeys={['up', 'down', 'left', 'right']}
        onKeyEvent={(key, e) => this.handleKeyPress(key)}
      />
      </div>
    )


    return (
      <div className="Container">
        {finished()}
        <Restart
          onClick={this.restart}
        />
      </div>

    )
  }
}

export default App
