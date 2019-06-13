export const constants = {
  STORE_NAME: 'STORE_NAME'
}

export interface Actions {
  storeName: Function
}

export const actions: Actions = {
  storeName() {
    return { type: constants.STORE_NAME }
  },
}