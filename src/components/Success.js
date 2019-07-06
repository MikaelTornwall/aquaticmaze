import React from 'react'

const Success = ({ message, points, strokes, onClick }) => (
  <div>
    <strong>{message}</strong>
    <p>You got {points} points and took {strokes} strokes!</p>
    <button onClick={onClick}>Next level</button>
  </div>
)

export default Success
