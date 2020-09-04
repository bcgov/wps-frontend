import { KC_AUTH_URL, KC_REALM, KC_CLIENT } from 'utils/constants'
import { KeycloakInitOptions } from 'types/keycloak'

export const kcInitOption: KeycloakInitOptions = {
  onLoad: 'login-required',
  promiseType: 'native',
  checkLoginIframe: false
}

let instance: Keycloak.KeycloakInstance<'native'> | undefined
if (window.Keycloak && KC_AUTH_URL && KC_REALM && KC_CLIENT) {
  // Let Typescript know we are using the 'native' promise type
  instance = window.Keycloak<'native'>({
    url: KC_AUTH_URL,
    realm: KC_REALM,
    clientId: KC_CLIENT
  })
}

export default instance
