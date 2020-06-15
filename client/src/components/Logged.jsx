import React from 'react'
import { withRouter } from 'react-router-dom'
import './Logged.css'

function Logged(props) {
  // we need this page to show up for pages where you are logged in already
  // but the page assumes you aren't 
  // for example if you use a route instead of being redirected 

  const handleLogout = () => {
    // log out and then go to signin page 
    props.logout()
    props.history.push('/signin')
  }

  return (
    <div className="logged">
      <h1>You are logged in.</h1>
        <button onClick={handleLogout}>Log out</button>
  </div>
  )
}

export default withRouter(Logged)
