import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ModelValue, getModelsWithBiasAdjusted, ModelsForStation } from 'api/modelAPI'
import { AppThunk } from 'app/store'
import { logError } from 'utils/error'

interface State {
  loading: boolean
  error: string | null
  highResModelsByStation: Record<number, ModelValue[] | undefined>
}

const initialState: State = {
  loading: false,
  error: null,
  highResModelsByStation: {}
}

const highResModelsSlice = createSlice({
  name: 'highResModels',
  initialState,
  reducers: {
    getHighResModelsStart(state: State) {
      state.error = null
      state.loading = true
    },
    getHighResModelsFailed(state: State, action: PayloadAction<string>) {
      state.error = action.payload
      state.loading = false
    },
    getHighResModelsSuccess(state: State, action: PayloadAction<ModelsForStation[]>) {
      state.error = null
      action.payload.forEach(({ station, model_runs }) => {
        if (station && model_runs) {
          const code = station.code
          state.highResModelsByStation[code] = model_runs.reduce(
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
  getHighResModelsStart,
  getHighResModelsFailed,
  getHighResModelsSuccess
} = highResModelsSlice.actions

export default highResModelsSlice.reducer

export const fetchHighResModels = (codes: number[]): AppThunk => async dispatch => {
  try {
    dispatch(getHighResModelsStart())
    const modelsForStations = await getModelsWithBiasAdjusted(codes, 'HRDPS')
    dispatch(getHighResModelsSuccess(modelsForStations))
  } catch (err) {
    dispatch(getHighResModelsFailed(err.toString()))
    logError(err)
  }
}
