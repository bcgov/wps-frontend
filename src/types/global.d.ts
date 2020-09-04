// top-level declaration for *.pdf
declare module '*.pdf'

// Utility type that makes all properties, including nested ones, optional
declare type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

// use TypeScript's interface declaration merging
interface Window {
  env: {
    REACT_APP_KEYCLOAK_AUTH_URL: string
    REACT_APP_KEYCLOAK_REALM: string
    REACT_APP_KEYCLOAK_CLIENT: string
    REACT_APP_FIDER_LINK: string
  }
}
