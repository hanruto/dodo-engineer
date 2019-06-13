import { State, reducer } from './reducer'
import { Actions, actions } from './actions'

export interface Props {
  todoState: State
  todoActions: Actions
}

export default {
  reducer,
  actions
}