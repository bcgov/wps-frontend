import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Forecast, getNoonForecasts, NoonForecastValue } from 'api/forecastAPI'
import { AppThunk } from 'app/store'

interface State {
  loading: boolean
  error: string | null
  noonForecastsByStation: Record<number, NoonForecastValue[] | undefined>
  forecasts: Forecast[]
}

const initialState: State = {
  loading: false,
  error: null,
  noonForecastsByStation: {},
  forecasts: []
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
      state.forecasts = action.payload
      action.payload.forEach(forecast => {
        if (forecast.station) {
          const code = forecast.station.code
          state.noonForecastsByStation[code] = forecast.values
        }
      })
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
