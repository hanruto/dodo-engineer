import { constants } from './actions'

export interface State {
  todos: string[]
}

const initState: State = {
  todos: []
}

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case constants.ADD:
      return { ...state, todos: state.todos.concat(action.value) }
    case constants.CLEAR:
      return { ...state, todos: [] }
    default:
      return state
  }
}


