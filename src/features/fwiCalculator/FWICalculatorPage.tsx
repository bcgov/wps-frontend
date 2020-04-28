import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Station } from 'api/stationAPI'
import { selectAuthenticationReducer } from 'app/rootReducer'
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
  },
  display: {
    marginTop: 10
  }
})

export const FWICalculatorPage = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

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

  return (
    <div data-testid="fwi-calculator-page">
      <PageHeader title="Predictive Services Unit" />
      <PageTitle title="Fire Weather Index Calculator" />
      <Container>
        <WxStationDropdown
          stations={selectedStations}
          onStationsChange={onStationsChange}
        />
        <Button
          className={classes.btn}
          variant="contained"
          onClick={onSubmitClick}
          disabled={selectedStations.length === 0}
        >
          Get GDPS Model
        </Button>
        <div className={classes.display}>
          <WxPredictionsDisplay />
        </div>
      </Container>
    </div>
  )
}
