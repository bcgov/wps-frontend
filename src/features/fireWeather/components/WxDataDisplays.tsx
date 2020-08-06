import React from 'react'
import { useSelector } from 'react-redux'
import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import DailyWeatherDisplay from 'features/fireWeather/components/DailyWeatherDisplay'
import HourlyReadingsDisplay from 'features/fireWeather/components/HourlyReadingsDisplay'
import WxGraphByStation from 'features/fireWeather/components/WxDataGraph'
import { Station } from 'api/stationAPI'
import { selectReadings, selectModels, selectForecasts } from 'app/rootReducer'

const useStyles = makeStyles({
  displays: {
    marginTop: 16
  },
  paper: {
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 20
  },
  station: {
    fontSize: '1.1rem',
    paddingTop: 8,
    paddingBottom: 8
  }
})

interface Props {
  requestedStations: Station[]
}

interface TableMetadata {
  testId: string
  title: string
}

const WxDataDisplays = ({ requestedStations }: Props) => {
  const classes = useStyles()

  const { loading: loadingReadings, readingsByStation } = useSelector(selectReadings)
  const { loading: loadingModels, noonModelsByStation, modelsByStation } = useSelector(
    selectModels
  )
  const { loading: loadingForecasts, noonForecastsByStation } = useSelector(
    selectForecasts
  )

  const wxDataLoading = loadingModels || loadingReadings || loadingForecasts

  const modelsTableMetadata: TableMetadata = {
    testId: 'daily-models-display',
    title: '10 days of interpolated GDPS noon (12pm PST) values:'
  }

  const noonForecastsTableMetadata: TableMetadata = {
    testId: 'noon-forecasts-display',
    title: 'Forecast noon (12pm PST) values:'
  }

  return (
    <div className={classes.displays}>
      {!wxDataLoading &&
        requestedStations.map(s => {
          const readingValues = readingsByStation[s.code]
          const modelValues = modelsByStation[s.code]
          const noonModelValues = noonModelsByStation[s.code]
          const noonForecastValues = noonForecastsByStation[s.code]
          const nothingToDisplay = !readingValues && !modelValues && !noonForecastValues
          const modelTableProps = {
            values: noonModelValues,
            tableMetadata: modelsTableMetadata
          }
          const forecastsTableProps = {
            values: noonForecastValues,
            tableMetadata: noonForecastsTableMetadata
          }

          if (nothingToDisplay) {
            return null
          }

          return (
            <Paper key={s.code} className={classes.paper} elevation={3}>
              <Typography className={classes.station} variant="subtitle1" component="div">
                Weather station: {`${s.name} (${s.code})`}
              </Typography>
              <HourlyReadingsDisplay values={readingValues} />
              <DailyWeatherDisplay
                values={noonModelValues}
                tableMetadata={modelsTableMetadata}
              />
              <DailyWeatherDisplay
                values={noonForecastValues}
                tableMetadata={noonForecastsTableMetadata}
              />
              <WxGraphByStation
                modelValues={modelValues}
                readingValues={readingValues}
                forecastValues={noonForecastValues}
              />
            </Paper>
          )
        })}
    </div>
  )
}

export default React.memo(WxDataDisplays)
