import React from 'react'
import './styles/Notification.css'

const Notification = ({ message, className }) => (
  <div className={className}>
    <div className="Notification__text">{message}</div>
  </div>
)
export default Notification
