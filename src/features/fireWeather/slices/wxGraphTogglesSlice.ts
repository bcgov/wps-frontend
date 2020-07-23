import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  showReadings: boolean
  showModels: boolean
  showHistoricModels: boolean
}

const initialState: State = {
  showReadings: false,
  showModels: false,
  showHistoricModels: false
}

const wxGraphTogglesSlice = createSlice({
  name: 'wxDataGraphToggles',
  initialState,
  reducers: {
    setShowReadings(state: State, action: PayloadAction<boolean>) {
      state.showReadings = action.payload
    },
    setShowModels(state: State, action: PayloadAction<boolean>) {
      state.showModels = action.payload
    },
    setShowHistoricModels(state: State, action: PayloadAction<boolean>) {
      state.showHistoricModels = action.payload
    }
  }
})

export const {
  setShowReadings,
  setShowModels,
  setShowHistoricModels
} = wxGraphTogglesSlice.actions

export default wxGraphTogglesSlice.reducer
