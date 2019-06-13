export const constants = {
  TEST: 'TEST'
}

export interface Actions {
  test: Function
}

export const actions: Actions = {
  test() {
    return { type: constants.TEST }
  },
}