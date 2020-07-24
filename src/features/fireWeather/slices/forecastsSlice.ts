import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Forecast, getNoonForecasts, NoonForecastValue } from 'api/forecastAPI'
import { AppThunk } from 'app/store'

interface State {
  loading: boolean
  error: string | null
  noonForecastsByStation: Record<number, NoonForecastValue[] | undefined>
  noonForecasts: Record<number, {} | undefined>
}

const initialState: State = {
  loading: false,
  error: null,
  noonForecastsByStation: {},
  noonForecasts: []
}

const forecastsSlice = createSlice({
  name: 'forecasts',
  initialState,
  reducers: {
    getForecastsStart(state: State) {
      state.loading = true
    },
    getForecastsFailed(state: State, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    getForecastsSuccess(state: State, action: PayloadAction<Forecast[]>) {
      state.loading = false
      state.error = null
      action.payload.forEach(forecast => {
        if (forecast.station_code) {
          const code = forecast.station_code
          for (const index in forecast.values) {
            if (state.noonForecastsByStation[code] === undefined) {
              state.noonForecastsByStation[code] = [forecast.values[index]]
            } else if (
              forecast.values[index].datetime !== forecast.values[+index - 1].datetime
            ) {
              state.noonForecastsByStation[code]?.push(forecast.values[index])
            }
          }
        }
      })
      let counter = 0
      for (const key in state.noonForecastsByStation) {
        state.noonForecasts[counter] = {
          station_code: key,
          values: state.noonForecastsByStation[key]
        }
        counter++
      }
    }
  }
})

export const {
  getForecastsStart,
  getForecastsFailed,
  getForecastsSuccess
} = forecastsSlice.actions

export default forecastsSlice.reducer

export const fetchForecasts = (stationCodes: number[]): AppThunk => async dispatch => {
  try {
    dispatch(getForecastsStart())
    const forecasts = await getNoonForecasts(stationCodes)
    dispatch(getForecastsSuccess(forecasts))
  } catch (err) {
    dispatch(getForecastsFailed(err))
  }
}
