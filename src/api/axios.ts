import axios, { AxiosError } from 'axios'
import { API_BASE_URL } from 'utils/constants'

interface ServerError {
  detail?: string
}

export const getErrorMessage = (err: any) => {
  if (err && err.response) {
    const axiosError = err as AxiosError<ServerError>
    if (axiosError.response?.data?.detail) {
      return `Error: ${axiosError.response?.data?.detail}`
    }
  }

  return err.toString()
}

const instance = axios.create({
  baseURL: API_BASE_URL
})

export default instance
