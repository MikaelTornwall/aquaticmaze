import React from 'react'
import Credits from './Credits'

class Footer extends React.Component {

  render() {

    const credits = () => this.props.credits ? renderCredits() : null
    const renderCredits = () => (
      <Credits />
    )

    return (
      <div>
        <a onClick={this.props.onClick} href="#Footer">Credits</a>
        {credits()}
      </div>
    )
  }
}

export default Footer
