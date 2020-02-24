import axios from 'axios'

const isBundled = process.env.NODE_ENV === 'production'
const prod = 'https://wps-api-dev-6-secure-auzhsi.pathfinder.gov.bc.ca'
const local = 'http://localhost:8080' // 'https://wps-api-dev-6-secure-auzhsi.pathfinder.gov.bc.ca'
// const baseURL = isBundled ? '{{.Env.API_BASE_URL}}' : local
const baseURL = isBundled ? prod : local

const instance = axios.create({ baseURL })

// instance.interceptors.response.use(
//   response => response,
//   error => {
//     return Promise.reject(error && error.response)
//   }
// )

export default instance
