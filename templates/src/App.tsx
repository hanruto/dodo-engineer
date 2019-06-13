import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { Provider } from 'react-redux'
import IndexRouter from './routes'
import store from './store'
import './styles/index.scss'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <IndexRouter />
      </Provider>
    )
  }
}

export default hot(App)
