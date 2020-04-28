import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { WeatherPrediction, getWeatherPrediction } from 'api/weatherPredictionAPI'
import { AppThunk } from 'app/store'

interface State {
  isLoading: boolean
  error: string | null
  weatherPredictions: WeatherPrediction[]
}

const initialState: State = {
  isLoading: false,
  error: null,
  weatherPredictions: []
}

const weatherPredictions = createSlice({
  name: 'weatherPredictions',
  initialState,
  reducers: {
    getWeatherPredictionStart(state: State) {
      state.isLoading = true
    },
    getWeatherPredictionFailed(state: State, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    getWeatherPredictionSuccess(
      state: State,
      action: PayloadAction<WeatherPrediction[]>
    ) {
      state.isLoading = false
      state.weatherPredictions = action.payload
    }
  }
})

export const {
  getWeatherPredictionStart,
  getWeatherPredictionFailed,
  getWeatherPredictionSuccess
} = weatherPredictions.actions

export default weatherPredictions.reducer

export const fetchWeatherPredictions = (
  stationCodes: number[]
): AppThunk => async dispatch => {
  try {
    dispatch(getWeatherPredictionStart())
    const weatherPredictions = await getWeatherPrediction(stationCodes)
    dispatch(getWeatherPredictionSuccess(weatherPredictions))
  } catch (err) {
    dispatch(getWeatherPredictionFailed(err))
  }
}
