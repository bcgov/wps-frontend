import axios from 'api/axios'
import { Station } from 'api/stationAPI'

interface WeatherValue {
  datetime: string
  temperature: number
  dew_point: number
  relative_humidity: number
  wind_speed: number
  wind_direction: number
  total_precipitation: number
  accumulated_rain: number
  accumulated_snow: number
  accumulated_freezing_rain: number
  accumulated_ice_pellets: number
  cloud_cover: number
  sea_level_pressure: number
  wind_speed_40m: number
  wind_direction_40m: number
  wind_direction_80m: number
  wind_speed_120m: number
  wind_direction_120m: number
  wind_speed_925mb: number
  wind_direction_925mb: number
  wind_speed_850mb: number
  wind_direction_850m: number
}

export interface WeatherPrediction {
  station: Station
  predicted_values: WeatherValue[]
}

interface WeatherPredictionResponse {
  predictions: WeatherPrediction[]
}

export async function getWeatherPrediction(
  stationCodes: number[]
): Promise<WeatherPrediction[]> {
  const url = '/predictions/'

  try {
    const { data } = await axios.post<WeatherPredictionResponse>(url, {
      stations: stationCodes
    })
    return data.predictions
  } catch (err) {
    throw err.toString()
  }
}
