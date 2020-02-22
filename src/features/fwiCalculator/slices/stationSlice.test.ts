/* eslint-disable no-undef */
import reducer, {
  stationsInitialState,
  getStationsSuccess
} from 'features/fwiCalculator/slices/stationsSlice'

describe('Station Slice', () => {
  it('Should return initial state on first run', () => {
    const result = reducer(undefined, { type: '' })

    // Assert
    expect(result).toEqual(stationsInitialState)
  })
  it('Should return new state after fetching stations', () => {
    const data = [
      {
        code: 331,
        name: 'ASHNOLA'
      },
      {
        code: 334,
        name: 'MCCUDDY'
      },
      {
        code: 328,
        name: 'PENTICTON RS'
      }
    ]
    const nextState = reducer(stationsInitialState, getStationsSuccess(data))

    // Assert
    const rootState = { stations: nextState }
    expect(rootState.stations.stations).toEqual(data)
  })
})
