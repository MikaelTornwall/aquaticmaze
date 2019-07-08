import React from 'react'
import Clock from './Clock'
import './styles/statistics.css'

const Statistics = ({ energy, strokes, time }) => (

  <div className="statistics">
    <span className="statistics__stat">Strokes: {strokes}</span>
    <span className="statistics__stat">Food: {energy}</span>
    <Clock
      time={time}
    />
  </div>
)

export default Statistics
