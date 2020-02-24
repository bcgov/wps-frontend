import React from 'react'
import { waitForElement, cleanup, fireEvent } from '@testing-library/react'

import App from 'app/App'
import { getStations } from 'api/stationAPI'
import { renderWithRedux } from 'utils/testUtils'

jest.mock('api/stationAPI')

afterEach(() => {
  cleanup()
  jest.mock('api/stationAPI').resetAllMocks()
})

it('renders FWI calculator page', async () => {
  const stations = [
    { code: 1, name: 'Station 1' },
    { code: 2, name: 'Station 2' }
  ]
  getStations.mockResolvedValueOnce(stations)
  const { getByText, getByLabelText } = renderWithRedux(<App />)

  const pageTitle = getByText(/FWI calculator/i)
  expect(pageTitle).toBeInTheDocument()

  fireEvent.click(getByLabelText('Weather Stations'))
  const [station1] = await waitForElement(() => [
    getByText('Station 1(1)'),
    getByText('Station 2(2)')
  ])
  fireEvent.click(station1)
})

it('renders error message when fetching stations failed', async () => {
  getStations.mockRejectedValueOnce(new Error('Network error'))

  const { getByText, queryByText } = renderWithRedux(<App />)
  expect(queryByText(/Network error/i)).not.toBeInTheDocument()

  expect(getStations).toHaveBeenCalledTimes(1)
  expect(getStations).toHaveBeenCalledWith()

  await waitForElement(() => getByText(/Network error/i))
})
