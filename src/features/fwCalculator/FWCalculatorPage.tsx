import React from 'react'
import Keycloak from 'keycloak-js'
import { initOptions } from 'utils/keycloak.json'

export const FWCalculatorPage = () => {
  const [isAuthenciated, setAuthenciation] = React.useState(false)
  React.useEffect(() => {
    const keycloak = Keycloak(initOptions)
    keycloak
      .init({ onLoad: 'login-required', checkLoginIframe: false })
      .then(authenticated => {
        if (!authenticated) {
          window.location.reload()
        } else {
          setAuthenciation(authenticated)
        }
        setTimeout(() => {
          keycloak.updateToken(60)
        }, 60000)
      })
  }, [])

  if (isAuthenciated) return <header>Hello World!!!</header>
  else return <div />
}
