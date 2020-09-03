import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Forecast, getNoonForecasts, NoonForecastValue } from 'api/forecastAPI'
import { AppThunk } from 'app/store'

interface State {
  loading: boolean
  error: string | null
  allNoonForecastsByStation: Record<number, NoonForecastValue[] | undefined>
  pastNoonForecastsByStation: Record<number, NoonForecastValue[] | undefined>
  noonForecastsByStation: Record<number, NoonForecastValue[] | undefined>
}

const initialState: State = {
  loading: false,
  error: null,
  allNoonForecastsByStation: {},
  pastNoonForecastsByStation: {},
  noonForecastsByStation: {}
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
      action.payload.forEach(forecast => {
        const code = forecast.station_code
        if (code) {
          const allForecasts: NoonForecastValue[] = []

          const currDate = new Date()
          const pastForecasts: NoonForecastValue[] = []

          // only add the most recent forecast for the station and datetime
          // (query returns forecasts in order for each datetime, from most recently
          // issued down to first issued)
          let prevDatetime: string
          const mostRecentForecasts: NoonForecastValue[] = []
          forecast.values.forEach(value => {
            const isDifferentDatetime = prevDatetime !== value.datetime
            if (isDifferentDatetime) {
              if (new Date(value.datetime) >= currDate) {
                mostRecentForecasts.push(value)
              } else {
                pastForecasts.push(value)
              }
              allForecasts.push(value)
              prevDatetime = value.datetime
            }
          })
          state.allNoonForecastsByStation[code] = allForecasts
          state.pastNoonForecastsByStation[code] = pastForecasts
          state.noonForecastsByStation[code] = mostRecentForecasts
        }
      })
      state.loading = false
      state.error = null
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
