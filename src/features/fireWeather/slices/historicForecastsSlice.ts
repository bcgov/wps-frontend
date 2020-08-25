import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  HistoricForecast,
  HistoricForecastSummary,
  getHistoricForecasts
} from 'api/forecastAPI'
import { AppThunk } from 'app/store'

interface State {
  loading: boolean
  error: string | null
  historicForecastsByStation: Record<number, HistoricForecast[] | undefined>
}

const initialState: State = {
  loading: false,
  error: null,
  historicForecastsByStation: {}
}

const historicForecastsSlice = createSlice({
  name: 'historicForecasts',
  initialState,
  reducers: {
    getHistoricForecastsStart(state: State) {
      state.error = null
      state.loading = true
    },
    getHistoricForecastsFailed(state: State, action: PayloadAction<string>) {
      state.error = action.payload
      state.loading = false
    },
    getHistoricForecastsSuccess(
      state: State,
      action: PayloadAction<HistoricForecastSummary[]>
    ) {
      state.error = null
      action.payload.forEach(summary => {
        if (summary.station) {
          const code = summary.station.code
          state.historicForecastsByStation[code] = summary.values
        }
      })
      state.loading = false
    }
  }
})

export const {
  getHistoricForecastsStart,
  getHistoricForecastsFailed,
  getHistoricForecastsSuccess
} = historicForecastsSlice.actions

export default historicForecastsSlice.reducer

export const fetchHistoricForecasts = (
  stationCodes: number[]
): AppThunk => async dispatch => {
  try {
    dispatch(getHistoricForecastsStart())
    const historicForecasts = await getHistoricForecasts(stationCodes)
    dispatch(getHistoricForecastsSuccess(historicForecasts))
  } catch (err) {
    dispatch(getHistoricForecastsFailed(err))
  }
}
