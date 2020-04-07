import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initOptions } from 'utils/keycloak.json'
import { selectAuthenticationReducer } from 'app/rootReducer'
import { createAuthentication } from './slices/authenticationSlice'

export const FireWeatherPage = () => {
  const { isAuthenticated } = useSelector(selectAuthenticationReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    const script = document.createElement('script')

    script.src = `${initOptions.url}/js/keycloak.js`
    script.async = true

    const keyCloakScript = document.body.appendChild(script)

    keyCloakScript.onload = () => {
      const keycloak = window.Keycloak(initOptions)
      keycloak
        .init({
          onLoad: 'login-required',
          promiseType: 'native',
          checkLoginIframe: false
        })
        .then(authenticated => {
          if (!authenticated) {
            window.location.reload()
          } else {
            dispatch(createAuthentication(authenticated))
          }
          setTimeout(() => {
            keycloak.updateToken(60)
          }, 6000)
        })
    }
  }, [dispatch])

  if (isAuthenticated) return <header>Hello World!!!</header>
  else return <div />
}
