import React, { Component } from 'react'

class EditForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: props.title,
      content: props.content,
      id: props.id
    }
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {editItem, toggleEdit} = this.props
    editItem("todos", this.state)
    toggleEdit()
  }

  render () {
    const {title, content} = this.state
    const {showEdit, toggleEdit} = this.props
    return (
      <div>
        {showEdit ?
        <div className="modal">
          <div className="modal-main">
            <form onSubmit={this.handleSubmit}>
              <h3>Edit Todo</h3>
              <label className="modal-label">Title:</label>
              <input className="modal-input" name="title" onChange={this.handleChange} value={title} />
              <label className="modal-label">Content:</label>
              <input className="modal-input" name="content" onChange={this.handleChange} value={content} />
              <button className="button modal-button" type="submit">Edit</button>
              <button className="button modal-button" onClick={toggleEdit}>Close</button>
            </form>
          </div>
        </div>:
        null}
      </div>
    )
  }
}
export default EditForm
