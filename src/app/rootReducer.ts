import { combineReducers } from '@reduxjs/toolkit'
import stationsReducer from 'features/fwiCalculator/stationsSlice'

const rootReducer = combineReducers({
  stations: stationsReducer
})

// infer whatever gets returned from rootReducer and use it as the type of the root state
export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
