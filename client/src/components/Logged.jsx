import React from 'react'
import { withRouter } from 'react-router-dom'

function Logged(props) {
  const handleLogout = () => {
    // log out and then go to signin page 
    props.logout()
    props.history.push('/signin')
  }

  return (
    <div className="notLogged">
      <h1>You are logged in.</h1>
        <button onClick={handleLogout}>Log out</button>
  </div>
  )
}

export default withRouter(Logged)