import axios from 'axios'
import { API_BASE_URL } from 'utils/constants'
import store from 'app/store'
import { selectToken } from 'app/rootReducer'

const instance = axios.create({
  baseURL: API_BASE_URL
})

// Use axios interceptors to intercept any requests and add authorization headers.
instance.interceptors.request.use(config => {
  const token = selectToken(store.getState())
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default instance
