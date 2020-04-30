import { combineReducers } from '@reduxjs/toolkit'

import stationsReducer from 'features/stations/slices/stationsSlice'
import percentilesReducer from 'features/percentileCalculator/slices/percentilesSlice'
import authReducer from 'features/auth/slices/authenticationSlice'
import forecastsReducer from 'features/dailyForecasts/slices/ForecastsSlice'

const rootReducer = combineReducers({
  stations: stationsReducer,
  percentiles: percentilesReducer,
  authentication: authReducer,
  forecasts: forecastsReducer
})

// Infer whatever gets returned from rootReducer and use it as the type of the root state
export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

export const selectStationsReducer = (state: RootState) => state.stations
export const selectPercentilesReducer = (state: RootState) => state.percentiles
export const selectAuthReducer = (state: RootState) => state.authentication
export const selectForecastsReducer = (state: RootState) => state.forecasts
