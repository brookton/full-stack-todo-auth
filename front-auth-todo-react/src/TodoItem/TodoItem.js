import React, {Component} from 'react'
import EditForm from '../EditForm/EditForm'

class TodoItem extends Component {
  state={
    showEdit: false,
    checked: false
  }

  toggleEdit = () => {
    this.setState({showEdit: !this.state.showEdit})
  }

  handleChange = (event) => {
    this.props.markComplete("todos", this.props.id)
  }

  render(){
    const {title, deleteItem, id, content, complete} = this.props
    const {showEdit} = this.state
    return(
      <div>
        <div className="todo-card">
          <h4 className="todo-title">
            <input type="checkbox" className="checkbox" checked={complete} onChange={this.handleChange}/>
            {title}
          </h4>
          <p className="todo-content">{content}</p>
          <button className="button-edit" onClick={this.toggleEdit}>Edit</button>
          <button className="button-delete" onClick={() => deleteItem("todos", id)}>Delete</button>
          <EditForm {...this.props} toggleEdit={this.toggleEdit} showEdit={showEdit}/>
        </div>
      </div>
    )
  }
}
export default TodoItem
