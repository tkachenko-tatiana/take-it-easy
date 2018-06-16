import { createAction, handleActions } from 'redux-actions'

export const authSuccess = createAction('AUTH_SUCCESS')
export const authFailure = createAction('AUTH_FAILURE')
export const authLogout = createAction('AUTH_LOGOUT')

const initialState = {
  identity: null,
  error: '',
  token: '',
  refreshToken: ''
}

export default handleActions({
  [authSuccess]: (state, { payload: { user, token, refreshToken } }) => ({
    ...state,
    identity: user,
    token,
    refreshToken
  }),

  [authFailure]: (state, { payload }) => ({
    ...state,
    error: payload
  }),

  [authLogout]: (state) => ({
    ...initialState
  })
}, initialState)
