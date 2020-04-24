import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from 'app/store'
import { getKCInstance, kcInitOption } from 'features/auth/keycloak'

interface AuthState {
  authenticating: boolean
  isAuthenticated: boolean
  error: string | null
}

export const authInitialState: AuthState = {
  authenticating: false,
  isAuthenticated: false,
  error: null
}

const auth = createSlice({
  name: 'authentication',
  initialState: authInitialState,
  reducers: {
    authenticationStart(state: AuthState) {
      state.authenticating = true
    },
    authenticationFinished(state: AuthState, action: PayloadAction<boolean>) {
      state.authenticating = false
      state.isAuthenticated = action.payload
    },
    authenticationError(state: AuthState, action: PayloadAction<string>) {
      state.authenticating = false
      state.isAuthenticated = false
      state.error = action.payload
    },
    resetAuthentication(state: AuthState) {
      state.isAuthenticated = false
    }
  }
})

export const {
  authenticationStart,
  authenticationFinished,
  authenticationError,
  resetAuthentication
} = auth.actions

export default auth.reducer

export const authenticate = (): AppThunk => dispatch => {
  dispatch(authenticationStart())
  const instance = getKCInstance()
  instance
    .init(kcInitOption)
    .then(isAuthenticated => {
      dispatch(authenticationFinished(isAuthenticated))
    })
    .catch(err => {
      console.error(err)
      dispatch(authenticationError('Failed to authenticate.'))
    })
}
