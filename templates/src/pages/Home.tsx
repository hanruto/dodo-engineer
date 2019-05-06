import * as React from 'react'

export default class Home extends React.Component {
  state = {}

  render() {
    return (
      <div>
        <h1>Hello, {{{authorName}}}</h1>
        <p>Your app has been created successfully, have fun.</p>
      </div>
    )
  }
}
