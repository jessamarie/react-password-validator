import React, { Component } from 'react'
import './Validator.css'

class Validator extends Component {

  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      passwordsMatch: this.password === this.confirmPassword,
      messages: []
    }

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleEmailChange (e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordChange (e) {
    this.setState({
      password: e.target.value,
      passwordsMatch: e.target.value === this.state.confirmPassword
    })
  }

  handleConfirmPasswordChange (e) {
    this.setState({
      confirmPassword: e.target.value,
      passwordsMatch: this.state.password === e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    // Notify the user of whether or not their submission was valid
    var messages = []
    if (this.state.password !== this.state.confirmPassword || this.state.email.indexOf('@') === -1) {
      if (this.state.password !== this.state.confirmPassword) {
        messages.push('Passwords do not match')
      }

      if (this.state.email.indexOf('@') === -1) {
        messages.push('Please enter a valid email with an @ sign.')
      }

      this.setState({ messages: messages })
    } else {
      messages.push('You successfuly signed up!')
      this.setState({
        email: '',
        password: '',
        confirmPassword: '',
        passwordsMatch: this.password === this.confirmPassword,
        messages: messages
      })
    }
  }

  render () {
    var messages = this.state.messages.map((message, index) => {
      return (
        <p key={index}>{message}</p>
      )
    })

    console.log(this.state)

    return (
      <div>
        <h1>Sign Up</h1>
        <form className='form' onSubmit={this.handleSubmit}>
          <input className='email' type='text' placeholder='email' value={this.state.email} onChange={this.handleEmailChange} />
          <input className={this.state.passwordsMatch === true ? 'valid' : 'invalid'} type='password' placeholder='password' value={this.state.password} onChange={this.handlePasswordChange} />
          <input className={this.state.passwordsMatch === true ? 'valid' : 'invalid'} type='password' placeholder='confirm password' value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} />
          <div>{messages}</div>
          <input type='submit' value='Submit' />
        </form>
      </div>
    )
  }
}

export default Validator
