import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { waitForElement, cleanup, fireEvent } from '@testing-library/react'

import { selectStations } from 'app/rootReducer'
import axios from 'api/axios'
import { renderWithRedux } from 'utils/testUtils'
import FireWeatherPage from 'features/fireWeather/pages/FireWeatherPage'
import {
  mockStations,
  mockModelsResponse,
  mockReadingsResponse,
  mockHistoricModelsResponse
} from 'features/fireWeather/pages/FireWeatherPage.mock'

const mockAxios = new MockAdapter(axios)

afterEach(() => {
  mockAxios.reset()
  cleanup()
})

it('renders fire weather page', async () => {
  const { getByText, getByTestId } = renderWithRedux(<FireWeatherPage />)
  // before authenticated
  expect(getByText(/Signing in/i)).toBeInTheDocument()

  // Check if all the components are rendered after authenticated
  await waitForElement(() => getByText(/Predictive Services Unit/i))
  expect(getByText(/MoreCast/i)).toBeInTheDocument()
  expect(getByTestId('weather-station-dropdown')).toBeInTheDocument()
})

it('renders weather stations dropdown with data', async () => {
  mockAxios.onGet('/stations/').replyOnce(200, { weather_stations: mockStations })

  const { getByText, getByTestId, store } = renderWithRedux(<FireWeatherPage />)
  expect(selectStations(store.getState()).stations).toEqual([])

  // wait for authentication
  await waitForElement(() => getByText(/Predictive Services Unit/i))

  fireEvent.click(getByTestId('weather-station-dropdown'))

  const [station1] = await waitForElement(() => [
    getByText(`${mockStations[0].name} (${mockStations[0].code})`),
    getByText(`${mockStations[1].name} (${mockStations[1].code})`)
  ])

  fireEvent.click(station1)
  expect(selectStations(store.getState()).stations).toEqual(mockStations)
})

it('renders daily model and hourly values in response to user inputs', async () => {
  mockAxios.onGet('/stations/').replyOnce(200, { weather_stations: mockStations })
  mockAxios.onPost('/models/GDPS/forecasts/').replyOnce(200, mockModelsResponse)
  mockAxios.onPost('/hourlies/').replyOnce(200, mockReadingsResponse)
  mockAxios
    .onPost('/models/GDPS/forecasts/summaries')
    .replyOnce(200, mockHistoricModelsResponse)

  const { getByText, getByTestId, getAllByTestId } = renderWithRedux(<FireWeatherPage />)

  // wait for authentication
  await waitForElement(() => getByText(/Predictive Services Unit/i))

  // Select a weather station
  fireEvent.click(getByTestId('weather-station-dropdown'))
  const station1 = await waitForElement(() =>
    getByText(`${mockStations[0].name} (${mockStations[0].code})`)
  )
  fireEvent.click(station1)

  // Send the request
  fireEvent.click(getByTestId('get-wx-data-button'))

  // Wait until all the displays show up
  await waitForElement(() => getByTestId('daily-models-display'))
  await waitForElement(() => getByTestId('hourly-readings-display'))
  await waitForElement(() => getByTestId('wx-data-graph'))

  // Test toggle switches
  const readingToggle = getByTestId('wx-data-reading-toggle')
  fireEvent.click(readingToggle)
  const modelToggle = getByTestId('wx-data-model-toggle')
  fireEvent.click(modelToggle)

  // Check to see if some of SVG are rendered in the graph (dots, area, and tooltip)
  getAllByTestId('wx-data-model-temp-dot')
  getAllByTestId('wx-data-reading-temp-dot')
  getByTestId('historic-model-temp-area')
  const graphBg = getByTestId('wx-data-graph-background')
  fireEvent.mouseMove(graphBg)
  fireEvent.mouseLeave(graphBg)

  // There should have been 3 post requests (models, hourly readings, and historic models).
  expect(mockAxios.history.post.length).toBe(3)
  // all post requests should include station codes in the body
  mockAxios.history.post.forEach(post => {
    expect(post.data).toBe(
      JSON.stringify({
        stations: [1]
      })
    )
  })
})
