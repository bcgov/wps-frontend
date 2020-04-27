import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'

import { Station } from 'api/stationAPI'
import { selectAuthenticationReducer } from 'app/rootReducer'
import { PageHeader } from 'components/PageHeader'
import { PageTitle } from 'components/PageTitle'
import { Container } from 'components/Container'
import { authenticate } from 'features/auth/slices/authenticationSlice'
import { fetchWeatherStations } from 'features/weatherStations/slices/stationsSlice'
import { WeatherStationDropdown } from 'features/weatherStations/components/WeatherStationDropdown'
import { fetchWeatherPredictions } from 'features/fwiCalculator/slices/WeatherPredictionsSlice'

export const FWICalculatorPage = () => {
  const dispatch = useDispatch()

  const [selectedStations, setStations] = useState<Station[]>([])

  const { isAuthenticated, authenticating, error } = useSelector(
    selectAuthenticationReducer
  )

  useEffect(() => {
    dispatch(authenticate())
    dispatch(fetchWeatherStations())
  }, [dispatch])

  const onStationsChange = (s: Station[]) => {
    setStations(s)
  }
  const onSubmitClick = () => {
    dispatch(fetchWeatherPredictions(selectedStations))
  }

  if (error) {
    return <div>{error}</div>
  }

  if (authenticating) {
    return <div>Signing in...</div>
  }

  if (!isAuthenticated) {
    return <div>You are not authenticated!</div>
  }

  return (
    <div data-testid="fwi-calculator-page">
      <PageHeader title="Predictive Services Unit" />
      <PageTitle title="Fire Weather Index Calculator" />
      <Container>
        <WeatherStationDropdown
          stations={selectedStations}
          onStationsChange={onStationsChange}
        />
        <Button variant="contained" onClick={onSubmitClick}>
          Submit
        </Button>
      </Container>
    </div>
  )
}
