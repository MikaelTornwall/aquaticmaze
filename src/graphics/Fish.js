import React from 'react'
import ReactSVG from 'react-svg'
import Fish from '../../public/graphics/fish.svg'

import './styles/fish.css'

const FishSVG = ({ direction }) => (
  <img
    src={Fish}
    style={{transform: `rotate(${direction}deg)`}}
    id="fish"
  />
)

export default FishSVG
