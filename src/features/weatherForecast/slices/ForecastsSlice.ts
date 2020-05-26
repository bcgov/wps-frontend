import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Forecast, getForecasts, ForecastWxValue } from 'api/forecastAPI'
import { AppThunk } from 'app/store'
import { isNoonInPST } from 'utils/date'

interface State {
  loading: boolean
  error: string | null
  forecastsByStation: Record<number, ForecastWxValue[] | undefined>
  noonForecastsByStation: Record<number, ForecastWxValue[] | undefined>
  forecasts: Forecast[]
}

const initialState: State = {
  loading: false,
  error: null,
  forecastsByStation: {},
  noonForecastsByStation: {},
  forecasts: []
}

const forecasts = createSlice({
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
          state.forecastsByStation[code] = forecast.values
          state.noonForecastsByStation[code] = forecast.values.filter(v =>
            isNoonInPST(v.datetime)
          )
        }
      })
    }
  }
})

export const {
  getForecastsStart,
  getForecastsFailed,
  getForecastsSuccess
} = forecasts.actions

export default forecasts.reducer

export const fetchForecasts = (stationCodes: number[]): AppThunk => async dispatch => {
  try {
    dispatch(getForecastsStart())
    const forecasts = await getForecasts(stationCodes)
    dispatch(getForecastsSuccess(forecasts))
  } catch (err) {
    dispatch(getForecastsFailed(err))
  }
}
