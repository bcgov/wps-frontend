import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'

interface AuthenticationState {
  isAuthenticated: boolean
  error: string | null
}

export const authenticationInitialState: AuthenticationState = {
  isAuthenticated: false,
  error: null
}

const auth = createSlice({
  name: 'authentication',
  initialState: authenticationInitialState,
  reducers: {
    getAuthenticationStart(state: AuthenticationState) {
      state.isAuthenticated = false
    },
    getAuthenticationFailed(
      state: AuthenticationState,
      action: PayloadAction<string>
    ) {
      state.isAuthenticated = false
      state.error = action.payload
    },
    getAuthenticationSuccess(
      state: AuthenticationState,
      action: PayloadAction<boolean>
    ) {
      state.isAuthenticated = action.payload
    }
  }
})

export const {
  getAuthenticationStart,
  getAuthenticationFailed,
  getAuthenticationSuccess
} = auth.actions

export default auth.reducer

export const createAuthentication = (
  authenticated: boolean
): AppThunk => async dispatch => {
  try {
    dispatch(getAuthenticationStart())
    dispatch(getAuthenticationSuccess(authenticated))
  } catch (err) {
    dispatch(getAuthenticationFailed(err.toString()))
  }
}
