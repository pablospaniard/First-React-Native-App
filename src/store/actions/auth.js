import * as constants from './constants'

export const tryAuth = authData => {
  return {
    type: constants.TRY_AUTH,
    authData: authData
  }
}
