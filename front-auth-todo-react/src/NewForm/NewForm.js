import React, {Component} from 'react'

class NewForm extends Component {
  state={
    title: '',
    content: '',
    complete: false
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {addItem, toggleNew} = this.props
    addItem("todos", this.state)
    toggleNew()
    this.setState({title: '', content: ''})
  }

  render(){
    const {title, content} = this.state
    const {showNew, toggleNew} = this.props
    return(
      <div>
      {showNew ?
            <div className="modal">
              <div className="modal-main">
                <form onSubmit={this.handleSubmit}>
                  <h3>Add New Todo</h3>
                  <label className="modal-label">Title:</label>
                  <input className="modal-input" name="title" onChange={this.handleChange} value={title} required />
                  <label className="modal-label">Content:</label>
                  <input className="modal-input" name="content" onChange={this.handleChange} value={content} />
                  <button className="button modal-button" type="submit">Add</button>
                  <button className="button modal-button" onClick={toggleNew}>Close</button>
                </form>
              </div>
            </div> :
            null}
      </div>
    )
  }
}

export default NewForm
