import React from 'react'
import { Link } from 'react-router-dom'
import './Logged.css'

export default function NotLogged() {
  return (
    <div className="logged">
      <h1>You are not logged in.</h1>
      <Link to="/signin">
        <button>Log in</button>
      </Link>
  </div>
  )
}
