import React from 'react'
import { useSelector } from 'react-redux'
import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { DailyForecastsDisplay } from 'features/weatherForecast/components/DailyForecastsDisplay'
import { HourlyActualsDisplay } from 'features/weatherForecast/components/HourlyActualsDisplay'
import { Station } from 'api/stationAPI'
import { selectActuals, selectForecasts } from 'app/rootReducer'
import { ErrorMessage } from 'components'

const useStyles = makeStyles({
  paper: {
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 16,
    marginBottom: 16
  },
  station: {
    paddingTop: 8,
    paddingBottom: 8
  }
})

interface Props {
  stations: Station[]
}

export const WxDataDisplays = ({ stations }: Props) => {
  const classes = useStyles()
  const { error: errorFetchingActuals, actualsByStation } = useSelector(selectActuals)
  const { error: errorFetchingForecasts, forecastsByStation } = useSelector(
    selectForecasts
  )

  return (
    <>
      {errorFetchingForecasts && (
        <ErrorMessage
          error={errorFetchingForecasts}
          context="while fetching weather forecast data"
          marginTop={5}
        />
      )}

      {errorFetchingActuals && (
        <ErrorMessage
          error={errorFetchingActuals}
          context="while fetching hourly readings"
          marginTop={5}
        />
      )}

      <div>
        {stations.map(s => {
          const actualWxValues = actualsByStation[s.code]
          const forecastWxValues = forecastsByStation[s.code]

          if (!actualWxValues && !forecastWxValues) {
            return null
          }

          return (
            <Paper key={s.code} className={classes.paper} elevation={3}>
              <Typography className={classes.station} variant="subtitle1" component="div">
                Weather station: {`${s.name} (${s.code})`}
              </Typography>
              <HourlyActualsDisplay values={actualWxValues} />
              <DailyForecastsDisplay values={forecastWxValues} />
            </Paper>
          )
        })}
      </div>
    </>
  )
}
