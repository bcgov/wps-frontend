import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { waitForElement, cleanup, fireEvent } from '@testing-library/react'

import axios from 'api/axios'
import { selectStationsReducer } from 'app/rootReducer'
import { renderWithRedux } from 'utils/testUtils'
import { WEATHER_STATION_MAP_LINK } from 'utils/constants'
import { FWICalculatorPage } from 'features/fwiCalculator/FWICalculatorPage'
import { PercentilesResponse } from 'api/percentileAPI'

const mockAxios = new MockAdapter(axios)
const mockStations = [
  { code: 1, name: 'Station 1' },
  { code: 2, name: 'Station 2' }
]
const mockPercentilesResponse: PercentilesResponse = {
  stations: {
    '1': {
      FFMC: 94.95859222412109,
      ISI: 15.589389991760253,
      BUI: 157.5261016845703,
      season: { start_month: 5, start_day: 1, end_month: 8, end_day: 31 },
      years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
      station_name: 'Station 1'
    },
    '2': {
      FFMC: 90.95859222412109,
      ISI: 10.589389991760253,
      BUI: 159.5261016845703,
      season: { start_month: 5, start_day: 1, end_month: 8, end_day: 31 },
      years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
      station_name: 'Station 2'
    }
  },
  mean_values: {
    FFMC: 93.95859222412109,
    ISI: 12.589389991760253,
    BUI: 158.5261016845703
  },
  year_range: { start: 2010, end: 2019 },
  percentile: 90
}

afterEach(() => {
  mockAxios.reset()
  cleanup()
})

it('renders FWI calculator page', async () => {
  const { getByText, getByTestId, store } = renderWithRedux(
    <FWICalculatorPage />
  )
  const pageTitle = getByText(/FWI calculator/i)
  expect(pageTitle).toBeInTheDocument()
  expect(selectStationsReducer(store.getState()).stations).toEqual([])

  expect(getByTestId('weather-station-dropdown')).toBeInTheDocument()
  expect(getByTestId('time-range-textfield')).toBeInTheDocument()
  expect(getByTestId('percentile-textfield')).toBeInTheDocument()

  // Map icon tests
  expect(getByTestId('map-icon')).toBeInTheDocument()
  window.open = jest.fn()
  fireEvent.click(getByTestId('map-icon'))
  expect(window.open).toBeCalledWith(WEATHER_STATION_MAP_LINK, '_blank')
})

it('renders weather stations dropdown with data', async () => {
  mockAxios.onGet('/stations').reply(200, { weather_stations: mockStations })
  const { getByText, getByTestId, store } = renderWithRedux(
    <FWICalculatorPage />
  )

  expect(selectStationsReducer(store.getState()).stations).toEqual([])
  fireEvent.click(getByTestId('weather-station-dropdown'))

  await waitForElement(() => [
    getByText(`${mockStations[0].name} (${mockStations[0].code})`),
    getByText(`${mockStations[1].name} (${mockStations[1].code})`)
  ])
  expect(selectStationsReducer(store.getState()).stations).toEqual(mockStations)
})

it('renders error message when fetching stations failed', async () => {
  mockAxios.onGet('/stations').reply(404)

  const { getByText, queryByText, store } = renderWithRedux(
    <FWICalculatorPage />
  )

  expect(queryByText(/404/i)).not.toBeInTheDocument()
  expect(selectStationsReducer(store.getState()).error).toBeNull()

  await waitForElement(() => getByText(/404/i))
  expect(selectStationsReducer(store.getState()).error).toBeTruthy()
})

it('renders percentiles result when clicking on the calculate button', async () => {
  mockAxios.onGet('/stations').reply(200, { weather_stations: mockStations })
  mockAxios.onPost('/percentiles').reply(200, mockPercentilesResponse)

  const { getByText, getByTestId, store } = renderWithRedux(
    <FWICalculatorPage />
  )

  fireEvent.click(getByTestId('weather-station-dropdown'))
  const station1 = await waitForElement(() =>
    getByText(`${mockStations[0].name} (${mockStations[0].code})`)
  )
  fireEvent.click(station1)
  fireEvent.click(getByTestId('calculate-percentiles-button'))

  expect(store.getState().percentiles.result).toBeNull()

  // Wait until the calculation is fetched
  await waitForElement(() => getByTestId('percentile-result-tables'))

  // See if mean values are rendered
  expect(store.getState().percentiles.result).toEqual(mockPercentilesResponse)
  getByText(mockPercentilesResponse.mean_values.FFMC.toFixed(1).toString())
  getByText(mockPercentilesResponse.mean_values.BUI.toFixed(1).toString())
  getByText(mockPercentilesResponse.mean_values.ISI.toFixed(1).toString())
})
