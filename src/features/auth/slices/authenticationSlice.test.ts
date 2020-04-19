import reducer, {
  authInitialState,
  authenticationFinished
} from 'features/auth/slices/authenticationSlice'

describe('Authentication Slice', () => {
  it('Should return initial state on first run', () => {
    const result = reducer(undefined, { type: 'someAction' })
    expect(result).toEqual(authInitialState)
  })

  it('Should return new state after authentication is finished', () => {
    const nextState = reducer(authInitialState, authenticationFinished(true))
    expect(nextState).not.toBe(authInitialState) // check referential identity
    expect(nextState.isAuthenticated).toBe(true)
  })
})
