import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { WxPrediction, getWxPrediction } from 'api/wxPredictionAPI'
import { AppThunk } from 'app/store'

interface State {
  isLoading: boolean
  error: string | null
  wxPredictions: WxPrediction[]
}

const initialState: State = {
  isLoading: false,
  error: null,
  wxPredictions: []
}

const wxPredictions = createSlice({
  name: 'wxPredictions',
  initialState,
  reducers: {
    getWxPredictionStart(state: State) {
      state.isLoading = true
    },
    getWxPredictionFailed(state: State, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    getWxPredictionSuccess(state: State, action: PayloadAction<WxPrediction[]>) {
      state.isLoading = false
      state.wxPredictions = action.payload
    }
  }
})

export const {
  getWxPredictionStart,
  getWxPredictionFailed,
  getWxPredictionSuccess
} = wxPredictions.actions

export default wxPredictions.reducer

export const fetchWxPredictions = (
  stationCodes: number[]
): AppThunk => async dispatch => {
  try {
    dispatch(getWxPredictionStart())
    const wxPredictions = await getWxPrediction(stationCodes)
    dispatch(getWxPredictionSuccess(wxPredictions))
  } catch (err) {
    dispatch(getWxPredictionFailed(err))
  }
}
