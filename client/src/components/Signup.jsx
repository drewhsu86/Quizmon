import React, { Component } from 'react'
import { registerUser } from '../services/auth' 

export default class Signin extends Component {
  constructor() {
    super() 
    this.state = {
      usernameInput: '',
      passwordInput: '',
      passwordConfInput: '',
      emailInput: ''
    }
  }

  handleChange = (e, whichState) => {
    this.setState({
      [whichState]: e.target.value 
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const registerData = {
      username: this.state.usernameInput,
      password: this.state.passwordInput,
      password_confirmation: this.state.passwordConfInput,
      email: this.state.emailInput
    }
    const response = await registerUser(registerData)
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

          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            onChange={e => this.handleChange(e, 'emailInput')}
            value={this.state.emailInput}>  
          </input>

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={e => this.handleChange(e, 'passwordInput')}
            value={this.state.passwordInput}>  
          </input>

          <label htmlFor="passwordConf">Password Confirmation</label>
          <input
            type="password"
            id="passwordConf"
            onChange={e => this.handleChange(e, 'passwordConfInput')}
            value={this.state.passwordConfInput}>  
          </input>

          <button>Submit</button>
        </form>

      </div>
    )
  }
}
