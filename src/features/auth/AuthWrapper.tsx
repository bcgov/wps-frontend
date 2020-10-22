import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectAuthentication } from 'app/rootReducer'
import { authenticate } from 'features/auth/slices/authenticationSlice'

interface Props {
  children: React.ReactElement
}

// TODO: Turn this into High order function later
const AuthWrapper = ({ children }: Props) => {
  const dispatch = useDispatch()
  const { isAuthenticated, authenticating, error } = useSelector(selectAuthentication)

  useEffect(() => {
    dispatch(authenticate())
  }, [dispatch])

  if (error) {
    return <div>{error}</div>
  }

  if (authenticating) {
    return <div>Signing in...</div>
  }

  if (!isAuthenticated) {
    return <div>You are not authenticated!</div>
  }

  return children
}

export default React.memo(AuthWrapper)
