import { constants } from './actions'

export interface State {
  tests: string[]
}

const initState: State = {
  tests: []
}

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case constants.TEST:
      return { ...state, demos: state.tests.concat(action.value) }
    default:
      return state
  }
}


