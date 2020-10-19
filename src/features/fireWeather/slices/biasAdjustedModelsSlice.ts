import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ModelValue, getModelsWithBiasAdjusted, ModelsForStation } from 'api/modelAPI'
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
      action: PayloadAction<ModelsForStation[]>
    ) {
      state.error = null
      action.payload.forEach(({ station, model_runs }) => {
        if (station && model_runs) {
          const code = station.code
          state.biasAdjustedModelsByStation[code] = model_runs.reduce(
            (modelValues: ModelValue[], modelRun) => modelValues.concat(modelRun.values),
            []
          )
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

export const fetchMostRecentModelsWithBiasAdjusted = (
  codes: number[]
): AppThunk => async dispatch => {
  try {
    dispatch(getBiasAdjustedModelsStart())
    const modelsForStations = await getModelsWithBiasAdjusted(codes, 'GDPS')
    dispatch(getBiasAdjustedModelsSuccess(modelsForStations))
  } catch (err) {
    dispatch(getBiasAdjustedModelsFailed(err.toString()))
    logError(err)
  }
}
