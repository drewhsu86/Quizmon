import React, { Component } from 'react'
import './Signin.css'
import { registerUser } from '../services/auth' 

export default class Signin extends Component {
  constructor() {
    super() 
    this.state = {
      usernameInput: '',
      passwordInput: '',
      passwordConfInput: '',
      emailInput: '',
      pwMatch: false,
      msg: ''
    }
  }

  handleChange = async (e, whichState) => {
    await this.setState({
      [whichState]: e.target.value 
    })

    await this.checkPWMatch()
  }

  checkPWMatch = () => {
    const pw1 = this.state.passwordInput
    const pw2 = this.state.passwordConfInput
    this.setState({
      pwMatch: pw1 === pw2 && pw1 && pw2 
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
    try {
      const response = await registerUser(registerData)
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
        <h1>Sign up for an account</h1>
        <p> &nbsp; Passwords must be at least 6 characters</p>
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

          {
            this.state.pwMatch ? <p style={{color: "green"}}>Passwords match</p> : <p style={{color: "red"}}>Passwords don't match</p>
          }

          <button>Submit</button>
        </form>

      </div>
    )
  }
}
