import { Station } from 'api/stationAPI'
import axios from 'api/axios'

export interface ActualWxValue {
  datetime: string
  temperature: number
  relative_humidity: number
  wind_speed: number
  wind_direction: number
  barometric_pressure: number
  precipitation: number
  ffmc?: number
  isi?: number
  fwi?: number
}

export interface ActualWx {
  station: Station
  values: ActualWxValue[]
}

export interface ActualWxResponse {
  hourlies: ActualWx[]
}

export async function getActuals(stationCodes: number[]): Promise<ActualWx[]> {
  const url = '/hourlies/'

  try {
    const { data } = await axios.post<ActualWxResponse>(url, {
      stations: stationCodes
    })
    return data.hourlies
  } catch (err) {
    throw err.toString()
  }
}
