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
        <img id="Success__fish" src={Fish} width="75" alt="" />
        <strong>{this.props.message}</strong>
        <table id="Success__table">
          <tbody>
            <tr className="Success__row">
              <td className="Success__col">Points: </td>
              <td>{this.props.points}</td>
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
