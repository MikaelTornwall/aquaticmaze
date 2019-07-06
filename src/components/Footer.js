import React from 'react'
import Credits from './Credits'
import './styles/footer.css'

class Footer extends React.Component {

  render() {

    const renderCredits = () => (
      <Credits />
    )

    const credits = () => this.props.credits ? renderCredits() : null  

    return (
      <div id="Footer">
        <a id="Footer__link" onClick={this.props.onClick} href="#Footer">Credits</a>
        {credits()}
      </div>
    )
  }
}

export default Footer
