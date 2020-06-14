import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'
import QLogo from './QLogo'

export default class Nav extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // use a state to store the interval that keeps 
      // changing coordinates of the about element 
      aboutMoveInterval: null,
      aboutTop: '0',
      aboutLeft: '0',
    }
  }

  componentDidMount() {
    // interval in milliseconds 
    const intMS = 1000
    // create a setInterval 
    const newInterval = setInterval(() => {
      // choose a percent between 0 and max 
      // max must be between 0 and 100 
      const maxTop = 50
      const maxLeft = 50

      const aboutTop = `${Math.round(Math.random() * maxTop)}%`
      const aboutLeft = `${Math.round(Math.random() * maxLeft)}%`

      this.setState({
        aboutTop,
        aboutLeft
      })

    }, intMS)
    this.setState({
      aboutMoveInterval: newInterval 
    })
  }
    
  bannerMouseEnter = (e) => {
    try {
      e.target.children[1].style = "display: block"
    } catch (er) {
      console.log(er)
    }
  }

  bannerMouseLeave = (e) => {
    try {
      e.target.children[1].style = "display: none"
    } catch (er) {
      console.log(er)
    }
  }

  render() {
    const user = this.props.user 
    const navButtons = user ? (<div className="navButtons">
    
      <Link to="/">
        <button>Browse</button>
      </Link>

      <Link to="/home">
        <button>Your Dashboard</button>
      </Link>
      
      <button onClick={this.props.logout}>Log out</button>
      
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
          <Link to="/about">
              <h1 className="navBannerTitle"
                onMouseEnter={this.bannerMouseEnter}
                onMouseLeave={this.bannerMouseLeave}
              >
              
                <QLogo />uizmon
                <h4
                  className="navBannerAbout"
                  style={{ top: this.state.aboutTop, left: this.state.aboutLeft }}
                >
                  About
                </h4>

              </h1>
          </Link>
        </div>

        {navButtons}

        <div className="navLogged">
          {user ? <p>You are logged in as {user.username}.</p> : <p>You are not logged in.</p>}
        </div>
      </nav>
    )
  }
}
