import React, { Component } from 'react'
import CreateUserForm from '../CreateUserForm/CreateUserForm'
import './UserLogin.css'

class UserLogin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputName: "",
      email: "",
      password: "",
      notFound: false,
      showCreateForm: false,
      loggedIn: false
    }
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {email, password} = this.state
    fetch('https://rails-todo-auth-backend.herokuapp.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .catch(error => console.error('Error:', error))
      .then(response => response.json())
      .then(response => this.checkUser(response))
    }

    checkUser = (response) => {
      response.auth_token ?
      this.invokeLogIn(response.auth_token) :
      this.setState({notFound: !this.state.notFound})
    }

    invokeLogIn = (auth_token) => {
      localStorage.setItem('token', auth_token)
      this.props.fetchTodos()
    }

    toggleCreateForm = () => {
      this.setState({showCreateForm: !this.state.showCreateForm})
    }

  render () {
    const {notFound, showCreateForm, email, password} = this.state
    const {fetchTodos} = this.props
    return (
      <div>
        <div className="user-search">
          <p className="instructions">To get started, please log in or create an account.</p>
          <div id="form">
            <form onSubmit={this.handleSubmit}>
              <input className="email-input" name="email" placeholder="Enter your email" value={email} onChange={this.handleChange} />
              <input className="password-input" type="password" name="password" placeholder="Enter password" value={password} onChange={this.handleChange} />
              <button className="button-login" type="submit">Log In</button>
            </form>
          </div>
          { notFound ? <p id="error">Login failed. Please try again.</p> : null}
        </div>
        <div className="add-user">
          <button onClick={this.toggleCreateForm} className="create-act button">Create Account</button>
          <CreateUserForm showCreateForm={showCreateForm} toggleCreateForm={this.toggleCreateForm} fetchTodos={fetchTodos}/>
        </div>
      </div>
    )
  }
}

export default UserLogin
