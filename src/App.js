import React, { Component } from 'react';

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
import ReactTimeout from 'react-timeout'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import Helper from './Helpers'

// Maps
const Levels = require('../public/maps/levels.js')

// Styles
import './App.css';

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
    minutes: 0,
    finished: false,
    credits: false
  }

  componentWillMount() {
    this.setState({ board: this.generateBoardCopy() })
  }

  componentDidMount() {
    this.initState()
  }

  clock = () => {
      setInterval(() => {
        this.setState({
          seconds: Helper.seconds(this.state.seconds),
          minutes: Helper.minutes(this.state.seconds, this.state.minutes)
        })
      }, 1000)
  }

  initState = () => {
    this.state.board.map((row, i) =>
      row.map((col, j) => (this.state.board[i][j] === 'o') ? this.setState({ i: i, j: j }) : null)
    )}

  generateBoardCopy = () => Levels[this.state.level - 1].board.map(row => [...row])

  restart = async () => {
    await this.setState({
      board: this.generateBoardCopy(),
      points: 0,
      strokes: 0,
      seconds: 0,
      minutes: 0,
      finished: false
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

  move = (di, dj) => {
    if (this.state.strokes === 0 && this.state.level === 1) this.clock()

    if (Helper.checkType(this.state.board, this.state.i + di, this.state.j + dj, "p")) {
      this.setState({
        message: "Well done!",
        finished: true
      })
    }

    if (Helper.checkType(this.state.board, this.state.i + di, this.state.j + dj, "s")) this.setState({ points: this.state.points + 1 })

    if (Helper.isOk(this.state.board, this.state.i + di, this.state.j + dj)) {
      this.setState({
        board: Helper.stroke(this.state.board, this.state.i, this.state.j, di, dj),
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
        return <img id="fish" style={{transform: `rotate(${this.state.direction}deg)`}} src={Fish} width="25" />
      } else if (col === ' ') {
        return <img src={Water} width="25" />
      } else if (col === 's') {
        return <img id="sushi" src={Sushi} width="25" />
      } else if (col === 'p') {
        return <img src={Pipe} width="25" />
      }
    }

    const renderRow = (row, index) => row.map((col, j) => <td key={index + "," + j} id={index + "," + j}>{renderGraphics(col)}</td>)
    const renderBoard = () => this.state.board.map((row, index) => <tr key={index}>{renderRow(row, index)}</tr>)
    const finished = () => this.state.finished ? renderFinished() : renderGame()

    const renderFinished = () => (
      <Success
        message={this.state.message}
        points={this.state.points}
        strokes={this.state.strokes}
        onClick={this.nextLevel}
      />
    )

    const renderGame = () => (
      <div>
        <Statistics
          points={this.state.points}
          strokes={this.state.strokes}
          time={Helper.time(this.state.seconds, this.state.minutes)}
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
