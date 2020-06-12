import React, { Component } from 'react'
import { loginUser } from '../services/auth' 

export default class Signin extends Component {
  constructor() {
    super() 
    this.state = {
      usernameInput: '',
      passwordInput: ''
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
    const response = await loginUser(loginData)
    console.log(response)
  }

  render() {
    return (
      <div className="signin">
        
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
