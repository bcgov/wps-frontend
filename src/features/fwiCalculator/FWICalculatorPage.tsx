import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Station } from 'api/stationAPI'
import {
  selectAuthenticationReducer as selectAuthReducer,
  selectWxPredictionReducer as selectWxPredReducer
} from 'app/rootReducer'
import { PageHeader } from 'components/PageHeader'
import { PageTitle } from 'components/PageTitle'
import { Container } from 'components/Container'
import { authenticate } from 'features/auth/slices/authenticationSlice'
import { fetchWeatherStations } from 'features/wxStations/slices/stationsSlice'
import { WxStationDropdown } from 'features/wxStations/components/WxStationDropdown'
import { fetchWxPredictions } from 'features/fwiCalculator/slices/WxPredictionsSlice'
import { WxPredictionsDisplay } from 'features/fwiCalculator/components/WxPredictionsDisplay'

const useStyles = makeStyles({
  btn: {
    marginTop: 10
  }
})

export const FWICalculatorPage = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [selectedStations, setStations] = useState<Station[]>([])

  const { isAuthenticated, authenticating, error } = useSelector(selectAuthReducer)
  const { isLoading: wxDataLoading } = useSelector(selectWxPredReducer)

  useEffect(() => {
    dispatch(authenticate())
    dispatch(fetchWeatherStations())
  }, [dispatch])

  const onStationsChange = (s: Station[]) => {
    setStations(s)
  }
  const onSubmitClick = () => {
    const stationCodes = selectedStations.map(s => s.code)
    dispatch(fetchWxPredictions(stationCodes))
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
    <div data-testid="fwi-calculator-page">
      <PageHeader title="Predictive Services Unit" />
      <PageTitle title="Daily Weather Forecast" />
      <Container>
        <WxStationDropdown
          stations={selectedStations}
          onStationsChange={onStationsChange}
        />
        <Button
          className={classes.btn}
          onClick={onSubmitClick}
          disabled={isBtnDisabled}
          variant="contained"
          color="primary"
        >
          Get Weather Data
        </Button>
        <WxPredictionsDisplay />
      </Container>
    </div>
  )
}
