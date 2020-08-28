import axios from 'api/axios'
import { Station } from 'api/stationAPI'

export interface NoonForecastValue {
  datetime: string
  temperature: number
  relative_humidity: number
  wind_direction: number
  wind_speed: number
  total_precipitation: number
  gc: number
  ffmc: number
  dmc: number
  dc: number
  isi: number
  bui: number
  fwi: number
  danger_rating: number
  created_at: string
}

export interface Forecast {
  station_code: number
  values: NoonForecastValue[]
}

export interface ForecastResponse {
  noon_forecasts: Forecast[]
}

export async function getNoonForecasts(stationCodes: number[]): Promise<Forecast[]> {
  const url = '/noon_forecasts/'

  try {
    const { data } = await axios.post<ForecastResponse>(url, {
      stations: stationCodes
    })
    return data.noon_forecasts
  } catch (err) {
    throw err.toString()
  }
}

export interface HistoricForecast {
  datetime: string
  tmp_min: number
  tmp_max: number
  rh_min: number
  rh_max: number
}

export interface HistoricForecastSummary {
  station: Station
  values: HistoricForecast[]
}

export interface HistoricForecastSummariesResponse {
  summaries: HistoricForecastSummary[]
}

export async function getHistoricForecasts(
  stationCodes: number[]
): Promise<HistoricForecastSummary[]> {
  const url = `/noon_forecasts/summaries/`
  try {
    const { data } = await axios.post<HistoricForecastSummariesResponse>(url, {
      stations: stationCodes
    })

    return data.summaries
  } catch (err) {
    throw err.toString()
  }
}
