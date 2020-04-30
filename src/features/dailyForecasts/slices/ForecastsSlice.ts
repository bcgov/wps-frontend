import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Forecast, getForecasts } from 'api/forecastAPI'
import { AppThunk } from 'app/store'

interface State {
  isLoading: boolean
  error: string | null
  forecasts: Forecast[]
}

const initialState: State = {
  isLoading: false,
  error: null,
  forecasts: []
}

const forecasts = createSlice({
  name: 'forecasts',
  initialState,
  reducers: {
    getForecastsStart(state: State) {
      state.isLoading = true
    },
    getForecastsFailed(state: State, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    getForecastsSuccess(state: State, action: PayloadAction<Forecast[]>) {
      state.isLoading = false
      state.forecasts = action.payload
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
