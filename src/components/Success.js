import React from 'react'
import './styles/success.css'
import Fish from './../../public/graphics/fish.svg'
class Success extends React.Component {

  render() {

    const button = () => (
      <button id="Success__button" onClick={this.props.onClick}>Next level</button>
    )

    const renderButton = () => this.props.timeIsUp ? null : button()

    return (
      <div id="Success__container">
        <img id="Success__fish" src={Fish} width="100" alt="" />
        <strong id="Success__level">Level {this.props.level}</strong>
        <strong id="Success__finishedMessage">{this.props.finishedMessage}</strong>
        <strong>{this.props.message}</strong>
        <div id="Success__points">{this.props.points} points!</div>
        <table id="Success__table">
          <tbody>
            <tr className="Success__row">
              <td className="Success__col">Food: </td>
              <td>{this.props.energy}</td>
            </tr>
            <tr>
              <td>Strokes: </td>
              <td>{this.props.strokes}</td>
            </tr>
            <tr>
              <td>Time left: </td>
              <td>{this.props.time}</td>
            </tr>
          </tbody>
        </table>
        {renderButton()}
      </div>
    )
  }
}

export default Success
