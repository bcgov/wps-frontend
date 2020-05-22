import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ActualWx, ActualWxValue, getActuals } from 'api/actualsAPI'
import { AppThunk } from 'app/store'

interface State {
  loading: boolean
  error: string | null
  actualsByStation: Record<number, ActualWxValue[] | undefined>
  actuals: ActualWx[]
}

const initialState: State = {
  loading: false,
  error: null,
  actualsByStation: {},
  actuals: []
}

const actuals = createSlice({
  name: 'actuals',
  initialState,
  reducers: {
    getActualsStart(state: State) {
      state.loading = true
    },
    getActualsFailed(state: State, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    getActualsSuccess(state: State, action: PayloadAction<ActualWx[]>) {
      state.loading = false
      state.error = null
      state.actuals = action.payload
      action.payload.forEach(actual => {
        if (actual.station) {
          state.actualsByStation[actual.station.code] = actual.values
        }
      })
    }
  }
})

export const { getActualsStart, getActualsFailed, getActualsSuccess } = actuals.actions

export default actuals.reducer

export const fetchActuals = (stationCodes: number[]): AppThunk => async dispatch => {
  try {
    dispatch(getActualsStart())
    const hourlies = await getActuals(stationCodes)
    dispatch(getActualsSuccess(hourlies))
  } catch (err) {
    dispatch(getActualsFailed(err))
  }
}
