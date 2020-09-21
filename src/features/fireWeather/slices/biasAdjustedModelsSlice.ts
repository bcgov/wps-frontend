import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  ModelValue,
  getBiasAdjustedModelPredictions,
  BiasAdjustedModelsForStation
} from 'api/modelAPI'
import { AppThunk } from 'app/store'
import { logError } from 'utils/error'

interface State {
  loading: boolean
  error: string | null
  biasAdjustedModelsByStation: Record<number, ModelValue[] | undefined>
}

const initialState: State = {
  loading: false,
  error: null,
  biasAdjustedModelsByStation: {}
}

const biasAdjustedModelsSlice = createSlice({
  name: 'biasAdjustedModels',
  initialState,
  reducers: {
    getBiasAdjustedModelsStart(state: State) {
      state.error = null
      state.loading = true
    },
    getBiasAdjustedModelsFailed(state: State, action: PayloadAction<string>) {
      state.error = action.payload
      state.loading = false
    },
    getBiasAdjustedModelsSuccess(
      state: State,
      action: PayloadAction<BiasAdjustedModelsForStation[]>
    ) {
      state.error = null
      action.payload.forEach(bias_adjusted_model => {
        if (bias_adjusted_model.station) {
          const code = bias_adjusted_model.station.code
          if (state.biasAdjustedModelsByStation[code]) {
            state.biasAdjustedModelsByStation[code]?.push(bias_adjusted_model.values[0])
          } else {
            state.biasAdjustedModelsByStation[code] = [bias_adjusted_model.values[0]]
          }
        }
      })

      state.loading = false
    }
  }
})

export const {
  getBiasAdjustedModelsStart,
  getBiasAdjustedModelsFailed,
  getBiasAdjustedModelsSuccess
} = biasAdjustedModelsSlice.actions

export default biasAdjustedModelsSlice.reducer

export const fetchBiasAdjustedModels = (
  stationCodes: number[]
): AppThunk => async dispatch => {
  try {
    dispatch(getBiasAdjustedModelsStart())
    const biasAdjustedModelPredictions = await getBiasAdjustedModelPredictions(
      stationCodes,
      'GDPS'
    )
    dispatch(getBiasAdjustedModelsSuccess(biasAdjustedModelPredictions))
  } catch (err) {
    dispatch(getBiasAdjustedModelsFailed(err.toString()))
    logError(err)
  }
}