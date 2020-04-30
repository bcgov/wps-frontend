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

import { selectForecastsReducer } from 'app/rootReducer'
import { ErrorMessage } from 'components/ErrorMessage'

const useStyles = makeStyles({
  loading: {
    marginTop: 15
  },
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
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 8,
    fontSize: '1rem'
  }
})

export const DailyForecastsDisplay = () => {
  const classes = useStyles()
  const { error, forecasts } = useSelector(selectForecastsReducer)

  if (error) {
    return <ErrorMessage context="while fetching weather forecast data" marginTop={5} />
  }

  if (forecasts.length === 0) {
    return null
  }

  return (
    <div className={classes.display}>
      {forecasts.map(({ station, values }) => (
        <Paper className={classes.forecast} key={station.code}>
          <div className={classes.station}>
            Weather Station: {`${station.name} (${station.code})`}
          </div>
          <TableContainer>
            <Table className={classes.table} size="small" aria-label="weather data table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Temperature (°C)</TableCell>
                  <TableCell align="left">RH</TableCell>
                  <TableCell align="left">Wind Direction</TableCell>
                  <TableCell align="left">Wind Speed (km/h)</TableCell>
                  <TableCell align="left">Precipitation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values.map(value => (
                  <TableRow key={value.datetime}>
                    <TableCell align="left">{value.datetime}</TableCell>
                    <TableCell align="left">{value.temperature}</TableCell>
                    <TableCell align="left">{value.relative_humidity}</TableCell>
                    <TableCell align="left">{value.wind_direction}</TableCell>
                    <TableCell align="left">{value.wind_speed}</TableCell>
                    <TableCell align="left">{value.total_precipitation}</TableCell>
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
