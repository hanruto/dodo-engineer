// app.js
import { hot } from 'react-hot-loader/root'
import * as React from 'react'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'
import stores from './stores'
import HomePage from './pages/Home'
import './styles/index.scss'

function App() {
  return (
    <Provider {...stores}>
      <Router>
        <Route path="/" component={HomePage} />
      </Router>
    </Provider>
  )
}

export default hot(App)
