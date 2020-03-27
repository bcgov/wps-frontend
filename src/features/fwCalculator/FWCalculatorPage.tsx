import React from 'react'
import Keycloak from 'keycloak-js'
import { initOptions } from 'utils/keycloak.json'

export const FWCalculatorPage = () => {
  const keycloak = Keycloak(initOptions)

  keycloak.init({ onLoad: 'login-required' }).success(authenticated => {
    if (!authenticated) {
      window.location.reload()
    } else {
      console.info('Authenticated')
    }
    const keycloakToken: string = keycloak.token ? keycloak.token : ''
    const keycloakRefreshToken: string = keycloak.refreshToken
      ? keycloak.refreshToken
      : ''

    localStorage.setItem('react-token', keycloakToken)
    localStorage.setItem('react-refresh-token', keycloakRefreshToken)

    setTimeout(() => {
      keycloak.updateToken(60)
    }, 60000)
  })
  return <header>Hello World!!!</header>
}
