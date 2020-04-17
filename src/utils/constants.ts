export const WEATHER_STATION_MAP_LINK =
  'https://governmentofbc.maps.arcgis.com/apps/webappviewer/index.html?id=c36baf74b74a46978cf517579a9ee332'

export const FWI_VALUES_DECIMAL_POINT = 2

export const HIDE_DISCLAIMER = process.env.REACT_APP_HIDE_DISCLAIMER

export const KEYCLOAK_AUTH_URL =
  process.env.REACT_APP_KEYCLOAK_AUTH_URL || '{{.Env.REACT_APP_KEYCLOAK_AUTH_URL}}'
export const KEYCLOAK_REALM =
  process.env.REACT_APP_KEYCLOAK_REALM || '{{.Env.REACT_APP_KEYCLOAK_REALM}}'
export const KEYCLOAK_CLIENT =
  process.env.REACT_APP_KEYCLOAK_CLIENT || '{{.Env.REACT_APP_KEYCLOAK_CLIENT}}'
