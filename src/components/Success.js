import React from 'react'

const Success = ({ message, points, strokes }) => (
  <div>
    <strong>{message}</strong>
    <p>You got {points} points and took {strokes} strokes!</p>
  </div>
)

export default Success
