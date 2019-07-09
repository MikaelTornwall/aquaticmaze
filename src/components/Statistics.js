import React from 'react'
import Clock from './Clock'
import './styles/statistics.css'

const Statistics = ({ level, energy, strokes, time }) => (

  <div className="Statistics">
    <span className="Statistics__stat">Level: {level}</span>
    <span className="Statistics__stat">Strokes: {strokes}</span>
    <span className="Statistics__stat">Food: {energy}</span>
    <Clock
      time={time}
    />
  </div>
)

export default Statistics
