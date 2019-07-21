import React, { Component } from 'react'

// Components
import Maze from './components/Maze'
import Restart from './components/Restart'
import Success from './components/Success'
import Statistics from './components/Statistics'
import Notification from './components/Notification'
import Footer from './components/Footer'

// Graphics
import Brick from './graphics/Brick'
import Water from './graphics/Water'
import Sushi from './graphics/Sushi'
import Pipe from './graphics/Pipe'
import Fish from './graphics/Fish'

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
    message: '',
    notificationClass: '',
    energy: 0,
    strokes: 0,
    seconds: 0,
    points: 0,
    maximum: 0,
    finished: false,
    finishedMessage: '',
    timeIsUp: false,
    credits: false,
    timer: 'pending'
  }

  componentWillMount() {
    this.setState({ board: this.generateBoardCopy() })
  }

  componentDidMount() {
    this.initState()
  }

  generateBoardCopy = () => Levels[this.state.level - 1].board.map(row => [...row])

  initState = () => {
    let max = 0
    this.state.board.map((row, i) =>
      row.map((col, j) => {
        if (this.state.board[i][j] === 'o') {
          this.setState({ i: i, j: j })
        } else if (this.state.board[i][j] === 's') {
          max++
        }
      })
    )
    this.setState({
      seconds: Levels[this.state.level - 1].maxTime,
      maximum: max
     })
  }

  restart = async () => {
    await this.setState({
      board: this.generateBoardCopy(),
      strokes: 0,
      seconds: 0,
      energy: 0,
      points: 0,
      minutes: 0,
      finished: false,
      finishedMessage: '',
      timeIsUp: false,
      timer: 'pending',
      message: ''
    })
    this.initState()
  }

  toggleCredits = () => this.state.credits ? this.setState({ credits: false }) : this.setState({ credits: true })

  nextLevel = async () => {
    await this.setState({
      level: this.state.level + 1
    })
    this.restart()
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
  if (seconds === 0) {
    this.setState({
      finished: true,
      timeIsUp: true,
      message: 'You were too slow!'
    })
  }
}

  timer = () => {
    let interval = setInterval(() => {
      if (this.state.timer === 'pending' || this.state.finished) {
        clearInterval(interval)
        return
      }
      this.setState({ seconds: Helper.seconds(this.state.seconds) })
      this.timeIsUp(this.state.seconds)
    }, 1000)
  }

  ready = (timerState) => {
    if (timerState === 'pending') this.setState({ timer: 'go' })
  }

  setTimer = (timerState) => {
    if (timerState === 'go') {
      this.setState({ timer: 'on' })
      this.timer()
    }
  }

  isOk = (board, i, j, di, dj, collected, maximum) => {
    if (Helper.isOk(board, i + di, j + dj, collected, maximum)) {
      this.setState({
        board: Helper.stroke(board, i, j, di, dj),
        i: i + di,
        j: j + dj,
        strokes: this.state.strokes + 1
       })
    }
  }

  checkType = (board, i, j, di, dj, collected, maximum) => {
    if (Helper.checkType(board, i + di, j + dj, "p")) {
      if (collected === maximum) {
        this.setState({
          message: "Well done! You got ",
          finished: true,
          points: Helper.points(this.state.energy, this.state.strokes, this.state.seconds)
        })
      } else {
        this.setState({ message: 'Remember to collect all the food!', notificationClass: 'Notification__container' })
        setTimeout(() => {
          this.setState({ message: '', notificationClass: '' })
        }, 2000)
      }

      if (this.state.level === Levels.length) {
        this.setState({
          finishedMessage: "You have successfully finished the game!",
          timeIsUp: true
        })
      }
    }
    if (Helper.checkType(board, i + di, j + dj, "s")) this.setState({ energy: this.state.energy + 1, seconds: this.state.seconds + 1 })
  }

  move = (di, dj) => {
    this.ready(this.state.timer)
    this.setTimer(this.state.timer)
    this.checkType(this.state.board, this.state.i, this.state.j, di, dj, this.state.energy, this.state.maximum)
    this.isOk(this.state.board, this.state.i, this.state.j, di, dj, this.state.energy, this.state.maximum)
  }

  render() {

    const renderGraphics = (col) => {
      if (col === 'x') {
        return <Brick />
      } else if (col === 'o') {
        return <Fish direction={this.state.direction} />
      } else if (col === ' ') {
        return <Water />
      } else if (col === 's') {
        return <Sushi />
      } else if (col === 'p') {
        return <Pipe />
      }
    }

    const renderFinished = () => (
      <Success
        finishedMessage={this.state.finishedMessage}
        level={this.state.level}
        message={this.state.message}
        points={this.state.points}
        energy={this.state.energy}
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
          level={this.state.level}
          energy={this.state.energy}
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
        <Notification
          message={this.state.message}
          className={this.state.notificationClass}
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
