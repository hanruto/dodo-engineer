import { State, reducer } from './reducer'
import { Actions, actions } from './actions'

export interface Props {
  storeNameState: State
  storeNameActions: Actions
}

export default {
  reducer,
  actions
}