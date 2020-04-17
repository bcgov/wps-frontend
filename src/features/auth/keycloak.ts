import { KEYCLOAK_AUTH_URL, KEYCLOAK_REALM, KEYCLOAK_CLIENT } from 'utils/constants'

export const keycloakInitOption = {
  onLoad: 'login-required',
  promiseType: 'native',
  checkLoginIframe: false
} as const

export const getKeycloakInstance = () => {
  try {
    const instance = window.Keycloak<'native'>({
      url: KEYCLOAK_AUTH_URL,
      realm: KEYCLOAK_REALM,
      clientId: KEYCLOAK_CLIENT
    })

    return instance
  } catch (err) {
    throw err
  }
}
