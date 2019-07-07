import React from 'react'
import './styles/maze.css'

const Maze = ({ renderBoard }) => (
  <div>
    <table id="Maze__table" cellspacing="0" cellpadding="0">
      <tbody>
        {renderBoard}
      </tbody>
    </table>
  </div>
)

export default Maze
