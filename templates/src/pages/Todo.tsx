import React from 'react'
import { inject } from 'store/index'
import { Props as TodoStoreProps } from 'store/todo'

@inject('todo')
export default class Todo extends React.Component<TodoStoreProps> {
  state = {
    todo: ''
  }

  handleAdd = () => {
    const todo = this.state.todo
    todo && this.props.todoActions.add(todo)
  }

  handleClear = () => {
    this.props.todoActions.clear()
  }

  handleChange = e => {
    this.setState({ todo: e.target.value })
  }

  render() {
    const { todoState } = this.props
    const { todo } = this.state

    return <div>
      <ul>
        {todoState.todos.map((item, index) => <li key={index}>{item}</li>)}
      </ul>

      <input type="text" value={todo} onChange={this.handleChange} />
      <button onClick={this.handleAdd}>add</button>
      <button onClick={this.handleClear}>clear</button>
    </div>
  }
}