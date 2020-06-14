import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'
import QLogo from './QLogo'

export default function Nav(props) {
  const navButtons = props.user ? (<div className="navButtons">  
    
        <Link to="/">
          <button>Browse</button>
        </Link>

        <Link to="/home">
          <button>Your Dashboard</button>
        </Link>
      
        <button onClick={props.logout}>Log out</button>
      
      </div>) : (<div className="navButtons">

        <Link to="/">
          <button>Browse</button>
        </Link>

        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      
        <Link to="/signin">
            <button>Log in</button>
        </Link>
      
      </div>)
    
  return (
    <nav>
      <div className="navBanner">
        <h1 className="navBannerTitle">
          <QLogo />
        uizmon
        </h1>
      </div>

      {navButtons}

      <div className="navLogged">
        {props.user ? <p>You are logged in as {props.user.username}.</p> : <p>You are not logged in.</p>}
      </div>
    </nav>
  )
}
