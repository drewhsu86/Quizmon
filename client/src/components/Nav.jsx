import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'

export default function Nav(props) {
  if (props.user) { 
    return (
      <nav>
      
        <h1>You are logged in as {props.user.username}.</h1>

        <Link to="/">
          <button>Browse</button>
        </Link>

        <Link to="/home">
          <button>Home</button>
        </Link>
      
        <button onClick={props.logout}>Log out</button>
      
      </nav>
    )
  } else {
    return (
      <nav>
      
        <h1>You are not logged in.</h1> 

        <Link to="/">
          <button>Browse</button>
        </Link>

        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      
        <Link to="/signin">
            <button>Log in</button>
        </Link>
      
      </nav>
    )
  }
}
