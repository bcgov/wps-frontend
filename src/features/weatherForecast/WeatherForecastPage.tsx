import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import { Station } from 'api/stationAPI'
import { selectAuthentication, selectForecasts, selectActuals } from 'app/rootReducer'
import { PageHeader, PageTitle, Container, Button } from 'components'
import {
  authenticate,
  setAxiosRequestInterceptors
} from 'features/auth/slices/authenticationSlice'
import { fetchWxStations } from 'features/stations/slices/stationsSlice'
import { WxStationDropdown } from 'features/stations/components/WxStationDropdown'
import { fetchForecasts } from 'features/weatherForecast/slices/ForecastsSlice'
import { fetchActuals } from 'features/weatherForecast/slices/ActualsSlice'
import { WxDisplaysByStations } from 'features/weatherForecast/components/WxDisplaysByStations'

const useStyles = makeStyles({
  stationDropdown: {
    marginBottom: 10
  }
})

// TODO: Separate authentication part from this later
export const WeatherForecastPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [selectedStations, setStations] = useState<Station[]>([])
  const [requestedStations, setRequestedStations] = useState<Station[]>([])
  const { isAuthenticated, authenticating, error } = useSelector(selectAuthentication)
  const { loading: loadingForecasts } = useSelector(selectForecasts)
  const { loading: loadingActuals } = useSelector(selectActuals)

  useEffect(() => {
    dispatch(authenticate())
    dispatch(setAxiosRequestInterceptors())
    dispatch(fetchWxStations())
  }, [dispatch])

  if (error) {
    return <div>{error}</div>
  }

  if (authenticating) {
    return <div>Signing in...</div>
  }

  if (!isAuthenticated) {
    return <div>You are not authenticated!</div>
  }

  const onStationsChange = (s: Station[]) => {
    setStations(s)
  }
  const onSubmitClick = () => {
    const stationCodes = selectedStations.map(s => s.code)
    setRequestedStations(selectedStations)
    dispatch(fetchForecasts(stationCodes))
    dispatch(fetchActuals(stationCodes))
  }

  const wxDataLoading = loadingForecasts || loadingActuals
  const isBtnDisabled = selectedStations.length === 0

  return (
    <div data-testid="daily-forecasts-page">
      <PageHeader title="Predictive Services Unit" />
      <PageTitle title="Daily Weather Forecast" />
      <Container>
        <WxStationDropdown
          className={classes.stationDropdown}
          stations={selectedStations}
          onStationsChange={onStationsChange}
        />
        <Button
          data-testid="get-wx-data-button"
          onClick={onSubmitClick}
          disabled={isBtnDisabled}
          loading={wxDataLoading}
          variant="contained"
          color="primary"
        >
          Get Historic Readings and Forecasted Global Model Data
        </Button>
        <WxDisplaysByStations stations={requestedStations} />
      </Container>
    </div>
  )
}
