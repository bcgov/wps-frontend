import React, { useEffect } from 'react'
import { initOptions } from 'utils/keycloak.json'

export const FWCalculatorPage = () => {
  const [isAuthenciated, setAuthenciation] = React.useState(false)
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
            setAuthenciation(authenticated)
          }
          setTimeout(() => {
            keycloak.updateToken(60)
          }, 6000)
        })
    }
  }, [])

  if (isAuthenciated) return <header>Hello World!!!</header>
  else return <div />
}
