import React from 'react'
import { Link } from 'react-router-dom'

export default function NotLogged() {
  return (
    <div className="notLogged">
      <h1>You are not logged in.</h1>
      <Link to="/signin">
        <button>Log in</button>
      </Link>
  </div>
  )
}
