import { Station } from 'api/stationAPI'

interface Items {
  stations: Station[]
}

type Keys = keyof Items

export const saveDataInLocalStorage = <K extends Keys>(key: K, data: Items[K]): void => {
  const serializedData = typeof data === 'object' ? JSON.stringify(data) : data
  localStorage.setItem(key, serializedData)
}

export const getDataFromLocalStorage = <K extends Keys>(key: K): Items[K] | null => {
  const data = localStorage.getItem(key)

  if (data) {
    try {
      return JSON.parse(data)
    } catch (err) {
      return null
    }
  }

  return null
}

export const clearLocalStorage = (): void => localStorage.clear()
