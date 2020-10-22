import { mockStations } from 'features/percentileCalculator/pages/PercentileCalculatorPage.mock'
import {
  getDataFromLocalStorage,
  saveDataInLocalStorage,
  deleteDataFromLocalStorage
} from 'utils/localStorage'

beforeEach(() => {
  localStorage.clear()
  saveDataInLocalStorage('stations', mockStations)
})

describe('Local Storage Helper Methods', () => {
  it('getDataInLocalStorage gets data when passed a valid key', () => {
    expect(getDataFromLocalStorage('stations')).toEqual(mockStations)
  })

  it('getDataFromLocalStorage returns undefined when an invalid key is passed in', () => {
    expect(getDataFromLocalStorage('invalidKey' as 'stations')).toBe(null)
  })

  it('deleteDataFromLocalStorage deletes data from storage when key is passed in', () => {
    deleteDataFromLocalStorage('stations')
    expect(getDataFromLocalStorage('stations')).toBe(null)
  })
})
