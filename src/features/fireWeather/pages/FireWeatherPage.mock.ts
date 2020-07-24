import { ModelsResponse } from 'api/modelAPI'
import { ReadingsResponse } from 'api/readingAPI'
import { ForecastResponse } from 'api/forecastAPI'

export const mockStations = [
  { code: 1, name: 'Station 1', lat: 1, long: 1 },
  { code: 2, name: 'Station 2', lat: 2, long: 2 }
]

export const mockModelsResponse: RecursivePartial<ModelsResponse> = {
  models: [
    {
      station: mockStations[0],
      values: [
        {
          datetime: '2020-04-30T12:00:00',
          temperature: 7.4,
          relative_humidity: 69,
          wind_direction: 230,
          wind_speed: 5,
          total_precipitation: 0
        }
      ]
    }
  ]
}

export const mockReadingsResponse: RecursivePartial<ReadingsResponse> = {
  hourlies: [
    {
      station: mockStations[0],
      values: [
        {
          datetime: '2020-05-15T11:00:00',
          temperature: 16.9,
          relative_humidity: 37.0,
          wind_speed: 9.0,
          wind_direction: 45.0,
          barometric_pressure: 0.0,
          precipitation: 0.0,
          ffmc: undefined,
          isi: undefined,
          fwi: undefined
        }
      ]
    }
  ]
}

export const mockForecastsResponse: RecursivePartial<ForecastResponse> = {
  noon_forecasts: [
    {
      station_code: mockStations[0]['code'],
      values: [
        {
          datetime: '2020-07-23T19:00:00',
          temperature: 21,
          relative_humidity: 38,
          wind_direction: 290,
          wind_speed: 5.5,
          total_precipitation: 0.0,
          gc: undefined,
          ffmc: 87.398,
          dmc: 50.918,
          dc: 550.5439,
          isi: 5.97819,
          bui: 82.7119,
          fwi: 19.99413,
          danger_rating: 2,
          created_at: '2020-07-21T15:30:00'
        }
      ]
    }
  ]
}
