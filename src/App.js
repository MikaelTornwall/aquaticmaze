import React, { Component } from 'react'

// Components
import Maze from './components/Maze'
import Restart from './components/Restart'
import Success from './components/Success'
import Statistics from './components/Statistics'
import Footer from './components/Footer'

// Graphics
import Fish from '../public/graphics/fish.svg'
import Brick from '../public/graphics/brick-wall.svg'
import Water from '../public/graphics/flood.svg'
import Sushi from '../public/graphics/sushi.svg'
import Pipe from '../public/graphics/pipes.svg'

// Helpers
import KeyboardEventHandler from 'react-keyboard-event-handler'
import Helper from './Helpers'

// Maps
const Levels = require('../public/maps/levels.js')

// Styles
import './App.css'

class App extends Component {
  state = {
    board: null,
    level: 1,
    i: null,
    j: null,
    direction: 90,
    message: "",
    points: 0,
    strokes: 0,
    seconds: 0,
    finished: false,
    timeIsUp: false,
    credits: false,
    timer: "pending"
  }

  componentWillMount() {
    this.setState({ board: this.generateBoardCopy() })
  }

  componentDidMount() {
    this.initState()
  }

  initState = () => {
    this.state.board.map((row, i) =>
      row.map((col, j) => (this.state.board[i][j] === 'o') ? this.setState({ i: i, j: j }) : null)
    )
    this.setState({ seconds: Levels[this.state.level - 1].maxTime })
  }

  generateBoardCopy = () => Levels[this.state.level - 1].board.map(row => [...row])

  restart = async () => {
    await this.setState({
      board: this.generateBoardCopy(),
      points: 0,
      strokes: 0,
      seconds: 0,
      minutes: 0,
      finished: false,
      timeIsUp: false,
      timer: "pending",
      message: ""
    })
    this.initState()
  }

  toggleCredits = () => this.state.credits ? this.setState({ credits: false }) : this.setState({ credits: true })

  nextLevel = async () => {
    if (this.state.level === Levels.length) {
      this.setState({
        message: "You have successfully finished the game!"
      })
    } else {
      await this.setState({
        level: this.state.level + 1
      })
      this.restart()
    }
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

timeIsUp = (seconds) => {
  if (seconds == 0) {
    this.setState({
      finished: true,
      timeIsUp: true,
      message: "You were too slow!"
    })
  }
}

// Set timer to start from maxTime to 0
  timer = () => {
    let interval = setInterval(() => {
      if (this.state.finished) {
        clearInterval(interval)
        return
      }

      this.setState({ seconds: Helper.seconds(this.state.seconds) })
      this.timeIsUp(this.state.seconds)
    }, 1000)
  }

  ready = (timerState) => {
    if (timerState === "pending") this.setState({ timer: "go" })
  }

  setTimer = (timerState) => {
    if (timerState === "go") {
      this.setState({ timer: "on" })
      this.timer()
    }
  }

  isOk = (board, i, j, di, dj) => {
    if (Helper.isOk(board, i + di, j + dj)) {
      this.setState({
        board: Helper.stroke(board, i, j, di, dj),
        i: i + di,
        j: j + dj,
        strokes: this.state.strokes + 1
       })
    }
  }

  checkType = (board, i, j, di, dj) => {
    if (Helper.checkType(board, i + di, j + dj, "p")) {
      this.setState({
        message: "Well done!",
        finished: true
      })
    }

    if (Helper.checkType(board, i + di, j + dj, "s")) this.setState({ points: this.state.points + 1 })
  }

  move = (di, dj) => {
    this.ready(this.state.timer)
    this.setTimer(this.state.timer)
    this.checkType(this.state.board, this.state.i, this.state.j, di, dj)
    this.isOk(this.state.board, this.state.i, this.state.j, di, dj)
  }

  render() {

    const renderGraphics = (col) => {
      if (col === 'x') {
        return <img src={Brick} width="27" height="28" alt="" />
      } else if (col === 'o') {
        return <img id="fish" style={{transform: `rotate(${this.state.direction}deg)`}} src={Fish} width="25" alt="" />
      } else if (col === ' ') {
        return <img src={Water} width="27" alt="" />
      } else if (col === 's') {
        return <img id="sushi" src={Sushi} width="25" alt="" />
      } else if (col === 'p') {
        return <img src={Pipe} width="25" alt="" />
      }
    }

    const renderFinished = () => (
      <Success
        message={this.state.message}
        points={this.state.points}
        strokes={this.state.strokes}
        onClick={this.nextLevel}
        timeIsUp={this.state.timeIsUp}
        time={Helper.time(this.state.seconds)}
      />
    )

    const renderRow = (row, index) => row.map((col, j) => <td key={index + "," + j} id={index + "," + j}>{renderGraphics(col)}</td>)
    const renderBoard = () => this.state.board.map((row, index) => <tr key={index}>{renderRow(row, index)}</tr>)

    const renderGame = () => (
      <div>
        <Statistics
          points={this.state.points}
          strokes={this.state.strokes}
          time={Helper.time(this.state.seconds)}
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

    const finished = () => Helper.finished(this.state.finished) ? renderFinished() : renderGame()

    return (
      <div className="Container">
        <div className="Container__game">
          {finished()}
          <Restart
            onClick={this.restart}
          />
          </div>
          <Footer
            id="Footer"
            onClick={this.toggleCredits}
            credits={this.state.credits}
          />
      </div>
    )
  }
}

export default App
