import React, { Component } from 'react'
import './Signin.css'
import { loginUser } from '../services/auth' 

export default class Signin extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      usernameInput: '',
      passwordInput: '',
      msg: ''
    }
  }

  handleChange = (e, whichState) => {
    this.setState({
      [whichState]: e.target.value 
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const loginData = {
      username: this.state.usernameInput,
      password: this.state.passwordInput
    }
    try {
      const response = await loginUser(loginData)
      console.log(response)
      this.props.setUser(response.username, response.id)
    } catch (er) {
      console.log(er)
      this.setState({
        msg: er.message
      })
    }
  }

  render() {
    return (
      <div className="signin">
        <h1>Log in</h1>
        {
          this.state.msg ? <p className="error"> &nbsp; {this.state.msg}</p> : null
        }
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={e => this.handleChange(e, 'usernameInput')}
            value={this.state.usernameInput}>
          </input>

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={e => this.handleChange(e, 'passwordInput')}
            value={this.state.passwordInput}>  
          </input>

          <button>Submit</button>
        </form>

      </div>
    )
  }
}
