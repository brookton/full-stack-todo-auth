import React, { Component } from 'react';
import './App.css';
import './Fun.css'
import TodoContainer from './TodoContainer/TodoContainer'
import UserLogin from './UserLogin/UserLogin'

class App extends Component {
    state = {
      loggedIn: false,
      todos: [],
    }

  componentDidMount = () => {
      if (localStorage.getItem('token')){
        this.fetchTodos()
      }
  }

  logIn = () => {
    this.setState({loggedIn: true})
  }

  logOut = () => {
    localStorage.clear()
    window.location.href = "https://fun-react-todo-auth.firebaseapp.com/"
    this.setState({
      loggedIn: false,
      todos: []
    })
  }

  fetchTodos = () => {
    this.logIn()
    fetch(`https://rails-todo-auth-backend.herokuapp.com/todos`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => response.json())
    .then(res => {
      console.log("res", res)
      this.setState({
        todos: res
      })
    })
    .catch(error => console.error('Error:', error))
  }

  addItem = (type, item) => {
    const body = {...item}
    const newState = [...this.state[type], item]
    let url = `https://rails-todo-auth-backend.herokuapp.com/todos`
    fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(body)
      })
      .then(this.setState({[type]: newState}))
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error))
  }

  deleteItem = (type, id) => {
    const body = {id}
    const newState = this.state[type].filter((object) => object.id !== id)
    let url = `https://rails-todo-auth-backend.herokuapp.com/todos/${id}`
    fetch(url, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(body)
      })
      .catch(error => (console.error(error)))
      .then(this.setState({[type]: newState}))
  }

  editItem = (type, item) => {
    const body = {...item}
    const newState = this.state[type].filter((object) => object.id !== item.id)
    let url = `https://rails-todo-auth-backend.herokuapp.com/todos/${item.id}`
    fetch(url, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(body)
      })
      .catch(error => console.error('Error:', error))
      .then(this.setState({[type]: [...newState, item]}))
  }

  markComplete = (type, id) => {
    const newState = this.state[type].filter((object) => object.id !== id)
    let item = this.state[type].filter((object) => object.id === id)
    let itemUpdate = {...item[0], complete: !item[0].complete}
    let url = `https://rails-todo-auth-backend.herokuapp.com/todos/${id}`
    fetch(url, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(itemUpdate)
      })
      // .then(res => res.json())
      // .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error))
      .then(this.setState({[type]: [...newState, itemUpdate]}))
  }

  render () {
    const {loggedIn, todos} = this.state
    return (
      <div>
        <header>
          {loggedIn ?
            <div>
              <button className="button-log-out" onClick={this.logOut}>Log Out</button>
            </div> :
             <h1 className="login-text">Todo List</h1>
              }
        </header>
        { loggedIn ?
          <TodoContainer todos={todos} addItem={this.addItem} deleteItem={this.deleteItem} editItem={this.editItem} markComplete={this.markComplete}/> :
          <div className="content">
            <UserLogin fetchTodos={this.fetchTodos}/>
          </div>}
      </div>
    )
  }
}

export default App;
