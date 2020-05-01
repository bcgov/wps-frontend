import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Station } from 'api/stationAPI'
import { selectAuthReducer, selectForecastsReducer } from 'app/rootReducer'
import { PageHeader } from 'components/PageHeader'
import { PageTitle } from 'components/PageTitle'
import { Container } from 'components/Container'
import { authenticate } from 'features/auth/slices/authenticationSlice'
import { fetchWxStations } from 'features/stations/slices/stationsSlice'
import { WxStationDropdown } from 'features/stations/components/WxStationDropdown'
import { fetchForecasts } from 'features/dailyForecasts/slices/ForecastsSlice'
import { DailyForecastsDisplay } from 'features/dailyForecasts/components/DailyForecastsDisplay'

const useStyles = makeStyles({
  btn: {
    marginTop: 10
  }
})

export const DailyForecastsPage = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [selectedStations, setStations] = useState<Station[]>([])

  const { isAuthenticated, authenticating, error } = useSelector(selectAuthReducer)
  const { isLoading: wxDataLoading } = useSelector(selectForecastsReducer)

  useEffect(() => {
    dispatch(authenticate())
    dispatch(fetchWxStations())
  }, [dispatch])

  const onStationsChange = (s: Station[]) => {
    setStations(s)
  }
  const onSubmitClick = () => {
    const stationCodes = selectedStations.map(s => s.code)
    dispatch(fetchForecasts(stationCodes))
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

  const isBtnDisabled = wxDataLoading || selectedStations.length === 0

  return (
    <div data-testid="daily-forecasts-page">
      <PageHeader title="Predictive Services Unit" />
      <PageTitle title="Daily Weather Forecast" />
      <Container>
        <WxStationDropdown
          stations={selectedStations}
          onStationsChange={onStationsChange}
        />
        <Button
          className={classes.btn}
          data-testid="get-forecast-wx-button"
          onClick={onSubmitClick}
          disabled={isBtnDisabled}
          variant="contained"
          color="primary"
        >
          Get Forecast Wx Data
        </Button>
        <DailyForecastsDisplay />
      </Container>
    </div>
  )
}
