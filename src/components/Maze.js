import React from 'react'
import ReactSVG from 'react-svg'
import Fish from '../../public/graphics/fish.svg'
import Brick from '../../public/graphics/brick-wall.svg'
import Water from '../../public/graphics/flood.svg'

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
