import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav(props) {
  return (
    <nav>
      
        {
        props.user ? <> <h1>You are logged in as {props.user.username}.</h1> (
          <button onClick={props.logout}>Log out</button>
        ) </> : <> <h1>You are not logged in.</h1> (
          <Link to="/signin">
            <button>Log in</button>
          </Link>
        )</>
        }
      
    </nav>
  )
}
