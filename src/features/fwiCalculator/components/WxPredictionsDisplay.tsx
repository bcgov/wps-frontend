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

import { selectWxPredictionReducer } from 'app/rootReducer'
import { ErrorMessage } from 'components/ErrorMessage'

const useStyles = makeStyles({
  loading: {
    marginTop: 15
  },
  display: {
    marginTop: 15
  },
  prediction: {
    marginBottom: 20
  },
  table: {
    minWidth: 650
  },
  station: {
    paddingTop: 12,
    paddingLeft: 16,
    paddingBottom: 8,
    fontSize: '1rem',
    fontStyle: 'italic'
  }
})

export const WxPredictionsDisplay = () => {
  const classes = useStyles()
  const { error, wxPredictions } = useSelector(selectWxPredictionReducer)

  if (error) {
    return <ErrorMessage context="while fetching weather forecast data" marginTop={5} />
  }

  if (wxPredictions.length === 0) {
    return null
  }

  return (
    <div className={classes.display}>
      {wxPredictions.map(({ station, predicted_values }) => (
        <Paper className={classes.prediction} key={station.code}>
          <div className={classes.station}>
            Weather Station: {`${station.name} (${station.code})`}
          </div>
          <TableContainer>
            <Table className={classes.table} size="small" aria-label="weather data table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="center">Temperature (°C)</TableCell>
                  <TableCell align="center">RH</TableCell>
                  <TableCell align="center">Wind Direction</TableCell>
                  <TableCell align="center">Wind Speed (km/h)</TableCell>
                  <TableCell align="center">Precipitation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {predicted_values.map(value => (
                  <TableRow key={value.datetime}>
                    <TableCell align="left">{value.datetime}</TableCell>
                    <TableCell align="center">{value.temperature}</TableCell>
                    <TableCell align="center">{value.relative_humidity}</TableCell>
                    <TableCell align="center">{value.wind_direction}</TableCell>
                    <TableCell align="center">{value.wind_speed}</TableCell>
                    <TableCell align="center">{value.total_precipitation}</TableCell>
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
