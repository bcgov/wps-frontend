import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  Model,
  getMostRecentHistoricModelPredictions,
  ModelsResponse
} from 'api/modelAPI'
import { AppThunk } from 'app/store'

interface State {
  loading: boolean
  error: string | null
  mostRecentHistoricModelsByStation: Record<number, Model[] | undefined>
}

const initialState: State = {
  loading: false,
  error: null,
  mostRecentHistoricModelsByStation: {}
}

const mostRecentHistoricModelsSlice = createSlice({
  name: 'mostRecentHistoricModels',
  initialState,
  reducers: {
    getMostRecentHistoricModelsStart(state: State) {
      state.error = null
      state.loading = true
    },
    getMostRecentHistoricModelsFailed(state: State, action: PayloadAction<string>) {
      state.error = action.payload
      state.loading = false
    },
    getMostRecentHistoricModelsSuccess(
      state: State,
      action: PayloadAction<ModelsResponse>
    ) {
      state.error = null
      console.log(action.payload)

      state.loading = false
    }
  }
})

export const {
  getMostRecentHistoricModelsStart,
  getMostRecentHistoricModelsFailed,
  getMostRecentHistoricModelsSuccess
} = mostRecentHistoricModelsSlice.actions

export default mostRecentHistoricModelsSlice.reducer

export const fetchMostRecentHistoricModels = (
  stationCodes: number[]
): AppThunk => async dispatch => {
  try {
    dispatch(getMostRecentHistoricModelsStart())
    const mostRecentHistoricModels = await getMostRecentHistoricModelPredictions(
      stationCodes,
      'GDPS'
    )
    const mostRecentHistoricModelsResponse = {
      predictions: mostRecentHistoricModels
    }
    dispatch(getMostRecentHistoricModelsSuccess(mostRecentHistoricModelsResponse))
  } catch (err) {
    dispatch(getMostRecentHistoricModelsFailed(err))
  }
}
