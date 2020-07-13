import axios from 'api/axios'
import { Station } from 'api/stationAPI'

export interface NoonForecastValue {
  datetime: string
  temperature: number
  relative_humidity: number
  wind_direction: number
  wind_speed: number
  precipitation: number
  // NOTE: Database also stores values for gc, ffmc, dmc, dc, isi, bui, fwi,
  // and danger_rating. Not pulling these in yet because haven't determined how
  // they'll be used/displayed, but they are available for use.
}

export interface Forecast {
  station: Station
  values: NoonForecastValue[]
}

export interface ForecastResponse {
  forecasts: Forecast[]
}

export async function getNoonForecasts(stationCodes: number[]): Promise<Forecast[]> {
  const url = '/noon_forecasts/'

  try {
    const { data } = await axios.post<ForecastResponse>(url, {
      stations: stationCodes
    })
    return data.forecasts
  } catch (err) {
    throw err.toString()
  }
}
