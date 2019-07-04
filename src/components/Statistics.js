import React from 'react'
import Clock from './Clock'
import './styles/statistics.css'

const Statistics = ({ points, strokes, time }) => (

  <div className="statistics">
    <span className="statistics__stat">Strokes: {strokes}</span>
    <span className="statistics__stat">Points: {points}</span>
    <Clock
      time={time}
    />
  </div>
)

export default Statistics
