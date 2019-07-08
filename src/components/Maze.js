import React from 'react'
import './styles/maze.css'

const Maze = ({ renderBoard }) => (
  <div>
    <table id="Maze__table" cellSpacing="0" cellPadding="0">
      <tbody>
        {renderBoard}
      </tbody>
    </table>
  </div>
)

export default Maze
