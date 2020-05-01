import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { selectForecastsReducer } from 'app/rootReducer'
import { ErrorMessage } from 'components/ErrorMessage'
import { FORECAST_VALUES_DECIMAL } from 'utils/constants'

const useStyles = makeStyles({
  display: {
    marginTop: 15
  },
  forecast: {
    marginBottom: 20
  },
  table: {
    minWidth: 650
  },
  station: {
    paddingTop: 8,
    paddingLeft: 16
  },
  units: {
    paddingRight: 16,
    paddingBottom: 4,
    fontStyle: 'italic'
  }
})

export const DailyForecastsDisplay = () => {
  const classes = useStyles()
  const { error, forecasts } = useSelector(selectForecastsReducer)

  if (error) {
    return (
      <ErrorMessage
        error={error}
        context="while fetching weather forecast data"
        marginTop={5}
      />
    )
  }

  if (forecasts.length === 0) {
    return null
  }

  return (
    <div className={classes.display} data-testid="daily-forecast-displays">
      {forecasts.map(({ station, values }) => (
        <Paper className={classes.forecast} key={station.code}>
          <Typography className={classes.station} variant="subtitle1" component="div">
            Weather Station: {`${station.name} (${station.code})`}
          </Typography>
          <Typography
            className={classes.units}
            variant="subtitle2"
            align="right"
            component="div"
          >
            Temp: °C, Wind Spd: km/h, Precip: mm/cm
          </Typography>
          <TableContainer>
            <Table className={classes.table} size="small" aria-label="weather data table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Temp</TableCell>
                  <TableCell align="left">RH</TableCell>
                  <TableCell align="left">Wind Dir</TableCell>
                  <TableCell align="left">Wind Spd</TableCell>
                  <TableCell align="left">Precip</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values.map(value => (
                  <TableRow key={value.datetime}>
                    <TableCell align="left">{value.datetime.slice(0, 10)}</TableCell>
                    <TableCell align="left">
                      {value.temperature.toFixed(FORECAST_VALUES_DECIMAL)}
                    </TableCell>
                    <TableCell align="left">
                      {value.relative_humidity.toFixed(FORECAST_VALUES_DECIMAL)}
                    </TableCell>
                    <TableCell align="left">{Math.round(value.wind_direction)}</TableCell>
                    <TableCell align="left">
                      {value.wind_speed.toFixed(FORECAST_VALUES_DECIMAL)}
                    </TableCell>
                    <TableCell align="left">
                      {value.total_precipitation.toFixed(FORECAST_VALUES_DECIMAL)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ))}
    </div>
  )
}
