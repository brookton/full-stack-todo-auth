import React, { Component } from 'react'

class CreateUserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      password: "",
      showError: false
    }
  }

  // componentDidMount = () => {
  //   fetch(`https://rails-todo-auth-backend.herokuapp.com/`)
  //     .then(response => response.json())
  //     .then(houses => this.setState({houses: houses.data}))
  // }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    const {name, email, password} = this.state
    event.preventDefault()
    fetch('https://rails-todo-auth-backend.herokuapp.com/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
          name: name,
          email: email,
          password: password
      })
    })
      .then(response => response.json())
      .then(response => this.checkRegistration(response))
      .catch(error=>console.error(error))
  }

  checkRegistration = (response) => {
    const {toggleCreateForm} = this.props
    console.log(response)
    if (response.auth_token) {
      localStorage.setItem('token', response.auth_token)
      toggleCreateForm()
      this.props.fetchTodos()
    } else {
      this.setState({
        name: "",
        email: "",
        password: "",
        showError: true
      })
    }
  }

  render () {
    const {showCreateForm, toggleCreateForm} = this.props
    const {name, email, password, showError} = this.state
    return (
      <div>
        {showCreateForm ?
          <div className="modal">
            <div className="modal-main">
                <form onSubmit={this.handleSubmit}>
                  <label className="modal-label">Name:</label>
                  <input className="modal-input" name="name" onChange={this.handleChange} value={name} />
                  <label className="modal-label">Email:</label>
                  <input className="modal-input" name="email" onChange={this.handleChange} value={email} />
                  <label className="modal-label">Password:</label>
                  <input className="modal-input" type="password" name="password" onChange={this.handleChange} value={password} />
                  <button className="button modal-button" type="submit">Create Account</button>
                </form>
                {showError ? <p>Invalid username, please try again</p> : null}
                <button className="button modal-button" onClick={toggleCreateForm}>Close</button>
              </div>
            </div> :
          null}
      </div>
    )
  }
}

export default CreateUserForm
