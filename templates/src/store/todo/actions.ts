export const constants = {
  ADD: 'ADD',
  CLEAR: 'CLEAR'
}

export interface Actions {
  add: Function
  clear: Function
}

export const actions: Actions = {
  add(todo) {
    return { type: constants.ADD, value: todo }
  },
  clear() {
    return { type: constants.CLEAR }
  }
}