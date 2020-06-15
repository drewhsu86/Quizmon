import React from 'react'
import { Link } from 'react-router-dom'
import './Logged.css'

export default function NotLogged() {
  // we need this page to show up for pages where you need to be logged in but aren't 
  // for example if you use a route instead of being redirected 
  return (
    <div className="logged">
      <h1>You are not logged in.</h1>
      <Link to="/signin">
        <button>Log in</button>
      </Link>
  </div>
  )
}
