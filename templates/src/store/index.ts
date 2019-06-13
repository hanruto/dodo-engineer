import { createStore, combineReducers, applyMiddleware } from 'redux'
import { connect } from 'react-redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import todo from './todo'
import test from './test'

const reducers = combineReducers({
  todoReducer: todo.reducer,
  testReducer: test.reducer,
})

const actions = {
  todoActions: todo.actions,
  testActions: test.actions,
}

const store = createStore(reducers, applyMiddleware(thunk, promise))


export const inject = (...storeNames: string[]): any => {
  const mapStateToProps = state => {
    const injectedState = {}
    storeNames.forEach(name => injectedState[`${name}State`] = state[`${name}Reducer`])
    return injectedState
  }

  const mapDispatchToProps = dispatch => {
    const injectedActions = {}
    storeNames.forEach(name => {
      injectedActions[`${name}Actions`] = {}
      Object.keys(actions[`${name}Actions`]).forEach(key => {
        injectedActions[`${name}Actions`][key] = (...rest) => dispatch(actions[`${name}Actions`][key](...rest))
      })
    })
    return injectedActions
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )
}

export default store

