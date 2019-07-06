import React from 'react'

const Maze = ({ renderBoard }) => (
  <div>
    <table>
      <tbody>
        {renderBoard}
      </tbody>
    </table>
  </div>
)

export default Maze
