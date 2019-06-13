import { State, reducer } from './reducer'
import { Actions, actions } from './actions'

export interface Props {
  testState: State
  testActions: Actions
}

export default {
  reducer,
  actions
}