import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Home from 'pages/Home'


export default class IndexRouter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      </Router>
    )
  }
}