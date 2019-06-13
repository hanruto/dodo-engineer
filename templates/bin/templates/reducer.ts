import { constants } from './actions'

export interface State {
  storeNames: string[]
}

const initState: State = {
  storeNames: []
}

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case constants.STORE_NAME:
      return { ...state, demos: state.storeNames.concat(action.value) }
    default:
      return state
  }
}


