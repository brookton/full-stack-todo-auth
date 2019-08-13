import React, {Component} from 'react'
import TodoItem from '../TodoItem/TodoItem'
import NewForm from '../NewForm/NewForm'


class TodoContainer extends Component {
    state = {
      showNew: false
    }


  toggleNew = () => {
    this.setState({showNew: !this.state.showNew})
  }

  render(){
    const {showNew} = this.state
    const todoList = this.props.todos.map((todo) => {
      return <TodoItem key={Math.floor(Math.random() * 1000000)} {...todo} deleteItem={this.props.deleteItem} editItem={this.props.editItem} markComplete={this.props.markComplete}/>
    })
    return(
      <div className="todo-container">
        <h1>Todo</h1>
        <button className="button-add" onClick={this.toggleNew}>Add a New Todo</button>
        <NewForm addItem={this.props.addItem} toggleNew={this.toggleNew} showNew={showNew}/>
        <div className="todo-card-list">
        {todoList}
        </div>
      </div>
    )
  }
}

export default TodoContainer
