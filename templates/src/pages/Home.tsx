import * as React from 'react'
import Todos from '../components/Todos'

export default class TodosPage extends React.Component {
  render() {
    return (
      <div className="todo-page">
        <div className="todo-title">
          <h3>todo list</h3>
        </div>
        <Todos />
      </div>
    )
  }
}
