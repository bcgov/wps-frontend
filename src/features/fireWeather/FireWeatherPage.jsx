import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectAuthenticationReducer } from 'app/rootReducer'
import { authenticate } from 'features/auth/slices/authenticationSlice'

export const FireWeatherPage = () => {
  const { isAuthenticated, authenticating, error } = useSelector(
    selectAuthenticationReducer
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authenticate())
  }, [dispatch])

  if (error) {
    return <div>{error}</div>
  }

  if (authenticating) {
    return <div>Authenticating...</div>
  }

  if (!isAuthenticated) {
    return <div>You are not authenticated!</div>
  }

  return <div>This is fire weather page</div>
}
