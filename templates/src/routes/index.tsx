import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Home from 'pages/Home'
import Todo from 'pages/Todo'


export default class IndexRouter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/todo" component={Todo} />
          <Redirect to="/" />
        </Switch>
      </Router>
    )
  }
}